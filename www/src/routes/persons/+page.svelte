<script lang="ts">
import { getPersons } from "$lib/persons.remote";
import { getUserAvatar } from "$lib/storage";

const _roles = ["Adopter", "Association", "Volunteer"];
const _cities = ["Paris", "Lyon", "Montpellier"];

// Filters
let searchQuery = $state("");
let selectedRole = $state<string>();
let selectedCity = $state<string>();
let sortBy = $state<"firstName" | "lastName">("lastName");

const _users = $derived(
  (await getPersons({ search: searchQuery, sortBy }))
    // TODO remove fake data
    .map((user) => ({
      ...user,
      username: `${user.firstName.charAt(0)}${user.lastName}`,
      photo: getUserAvatar(user),
      role: _roles[user.firstName.length % _roles.length],
      city: _cities[user.lastName.length % _cities.length],
      adoptedAnimals: user.firstName.length % 3,
      age: ((20 * (user.firstName.length + user.lastName.length)) % 33) + 20,
    })),
);

const roles = $derived(new Set(_users.map((user) => user.role)));
const cities = $derived(new Set(_users.map((user) => user.city)));

// TODO use SQL filtering instead of this
const users = $derived(
  _users.filter((user) => {
    const matchRole = !selectedRole || user.role == selectedRole;
    const matchCity = !selectedCity || user.city == selectedCity;
    return matchRole && matchCity;
  }),
);
</script>

<svelte:head>
  <title>Community Members - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-orange-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page title -->
    <div class="text-center mb-8">
      <h2 class="text-4xl md:text-5xl font-bold text-orange-900 mb-4" style="font-family: Georgia, serif;">
        👥 Our Community
      </h2>
      <p class="text-xl text-orange-800">
        Discover Bibi's Farm members: adopters, associations and volunteers
      </p>
    </div>

    <!-- Search filters -->
    <div class="bg-white rounded-2xl shadow-xl p-6 border-3 border-orange-400 mb-8">
      <h3 class="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
        <span>🔍</span>
        Search for a person
      </h3>

      <!-- Search bar -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by first name, last name, username or bio..."
          class="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
        />
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Role -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="role">Role</label>
          <select
            id="role"
            bind:value={selectedRole}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value={undefined}>{"All roles"}</option>
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
          </select>
        </div>

        <!-- City -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="city">City</label>
          <select
            id="city"
            bind:value={selectedCity}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value={undefined}>{"All cities"}</option>
            {#each cities as city}
              <option value={city}>{city}</option>
            {/each}
          </select>
        </div>

        <!-- Sorting -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="sortBy">Sort by</label>
          <select
            id="sortBy"
            bind:value={sortBy}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value="firstName">First name (A-Z)</option>
            <option value="lastName">Last name (A-Z)</option>
            <!-- <option value="city">Ville</option> -->
            <!-- <option value="role">Rôle</option> -->
          </select>
        </div>

        <div></div>
      </div>

      <!-- Results -->
      <div class="mt-4 text-orange-900 font-medium">
        {users.length} {users.length > 1 ? "people found" : "person found"}
      </div>
    </div>

    <!-- Users -->
    {#if users.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-orange-900 mb-2">No people found</h3>
        <p class="text-orange-700">Try changing your search criteria</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each users as user (user.id)}
          <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden border-3 border-orange-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Profile picture -->
            <div class="relative bg-linear-to-br from-orange-200 to-yellow-200 p-6">
              <div class="flex justify-center">
                <div class="relative">
                  <img 
                    src={user.photo} 
                    alt={user.firstName + ' ' + user.lastName}
                    class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                  />
                  {#if user.online}
                    <div class={["bg-green-500", "absolute", "bottom-2", "right-2", "w-6", "h-6", "rounded-full", "border-4", "border-white"]}></div>
                  {/if}
                </div>
              </div>

              <!-- Role badge -->
              <span class="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-white rounded-lg font-bold text-sm shadow-md">
                {user.role}
              </span>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="text-2xl font-bold text-orange-900 mb-1" style="font-family: Georgia, serif;">
                {user.firstName} {user.lastName}
              </h3>
              <p class="text-orange-700 mb-2">@{user.username}</p>

              <div class="flex items-center gap-4 mb-3 text-sm text-orange-800">
                <div class="flex items-center gap-1">
                  <span>📍</span>
                  <span>{user.city}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span>🎂</span>
                  <span>{user.age} years old</span>
                </div>
              </div>

              {#if user.adoptedAnimals > 0}
                <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
                  <span>🐾</span>
                  <span class="font-semibold">{user.adoptedAnimals} {user.adoptedAnimals > 1 ? "adopted pets" : "adopted pet"}</span>
                </div>
              {/if}

              <p class="text-sm text-gray-700 mb-4 line-clamp-2 italic">
                "{user.bio}"
              </p>

              <!-- Buttons -->
              <div class="flex gap-2">
                <a href="./{user.id}" class="text-center flex-1 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
                  👁️ View profile
                </a>
                <button class="flex-1 py-2 bg-white border-2 border-orange-400 text-orange-900 rounded-lg font-bold hover:bg-orange-50 transition-colors">
                  💬 Contact
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
