<script lang="ts">
import { getUserAvatar } from "$lib/storage";

const { data } = $props();

const _roles = ["Adoptant", "Association", "Bénévole"];
const _cities = ["Paris", "Lyon", "Montpellier"];

// Filters
let searchQuery = $state("");
let selectedRole = $state("tous");
let selectedCity = $state("toutes");
let sortBy = $state("lastName");

// Unique roles and cities
let roles = $derived(["tous", ...new Set(_roles)]);
let cities = $derived(["toutes", ...new Set(_cities)]);

// TODO use db queries instead of this
let users = $derived(
  (await data.users)
    // TODO remove fake data
    .map((user) => ({
      username: `${user.firstName.charAt(0)}${user.lastName}`,
      photo: getUserAvatar(user),
      role: _roles[user.firstName.length % _roles.length],
      city: _cities[user.firstName.length % _cities.length],
      adoptedAnimals: user.firstName.length % 3,
      age: ((20 * (user.firstName.length + user.lastName.length)) % 33) + 20,
      ...user,
    }))
    .filter((user) => {
      const matchSearch =
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = selectedRole === "tous" || user.role === selectedRole;
      const matchCity = selectedCity === "toutes" || user.city === selectedCity;

      return matchSearch && matchRole && matchCity;
    })
    .sort((a, b) => {
      if (sortBy === "lastName") {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortBy === "city") {
        return a.city.localeCompare(b.city);
      } else if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      }
      return 0;
    }),
);
</script>

<svelte:head>
  <title>Liste des membres - La Ferme à Bibi</title>
</svelte:head>

<div class="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-orange-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page title -->
    <div class="text-center mb-8">
      <h2 class="text-4xl md:text-5xl font-bold text-orange-900 mb-4" style="font-family: Georgia, serif;">
        👥 Notre Communauté
      </h2>
      <p class="text-xl text-orange-800">
        Découvrez les membres de La Ferme à Bibi : adoptants, associations et bénévoles
      </p>
    </div>

    <!-- Search filters -->
    <div class="bg-white rounded-2xl shadow-xl p-6 border-3 border-orange-400 mb-8">
      <h3 class="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
        <span>🔍</span>
        Rechercher une personne
      </h3>

      <!-- Search bar -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Rechercher par nom, prénom, pseudo ou description..."
          class="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
        />
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Role -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="role">Rôle</label>
          <select
            id="role"
            bind:value={selectedRole}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            {#each roles as role}
              <option value={role}>{role === "tous" ? "Tous les rôles" : role}</option>
            {/each}
          </select>
        </div>

        <!-- City -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="city">Ville</label>
          <select
            id="city"
            bind:value={selectedCity}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            {#each cities as city}
              <option value={city}>{city === "toutes" ? "Toutes les villes" : city}</option>
            {/each}
          </select>
        </div>

        <!-- Sorting -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="sortBy">Trier par</label>
          <select
            id="sortBy"
            bind:value={sortBy}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value="lastName">Nom (A-Z)</option>
            <option value="city">Ville</option>
            <option value="role">Rôle</option>
          </select>
        </div>

        <div></div>
      </div>

      <!-- Results -->
      <div class="mt-4 text-orange-900 font-medium">
        {users.length} {users.length > 1 ? "personnes trouvées" : "personne trouvée"}
      </div>
    </div>

    <!-- Users -->
    {#if users.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-orange-900 mb-2">Aucune personne trouvée</h3>
        <p class="text-orange-700">Essayez de modifier vos critères de recherche</p>
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
                <img 
                  src={user.photo} 
                  alt={user.firstName + ' ' + user.lastName}
                  class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                />
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
                  <span>{user.age} ans</span>
                </div>
              </div>

              {#if user.adoptedAnimals > 0}
                <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
                  <span>🐾</span>
                  <span class="font-semibold">{user.adoptedAnimals} {user.adoptedAnimals > 1 ? "animaux adoptés" : "animal adopté"}</span>
                </div>
              {/if}

              <p class="text-sm text-gray-700 mb-4 line-clamp-2 italic">
                "{user.bio}"
              </p>

              <!-- Buttons -->
              <div class="flex gap-2">
                <a href="./{user.id}" class="text-center flex-1 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
                  👁️ Voir le profil
                </a>
                <button class="flex-1 py-2 bg-white border-2 border-orange-400 text-orange-900 rounded-lg font-bold hover:bg-orange-50 transition-colors">
                  💬 Contacter
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
