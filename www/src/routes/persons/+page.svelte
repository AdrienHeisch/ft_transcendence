<script lang="ts">
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

let persons = $derived(
  (await data.persons)
    // TODO remove fake data
    .map((person) => ({
      username: `${person.firstName.charAt(0)}${person.lastName}`,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${person.firstName}`,
      role: _roles[person.firstName.length % _roles.length],
      city: _cities[person.firstName.length % _cities.length],
      adoptedAnimals: person.firstName.length % 3,
      age: ((20 * (person.firstName.length + person.lastName.length)) % 33) + 20,
      ...person,
    }))
    .filter((persons) => {
      const matchSearch =
        persons.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persons.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persons.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persons.bio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole =
        selectedRole === "tous" || persons.role === selectedRole;
      const matchCity =
        selectedCity === "toutes" || persons.city === selectedCity;

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
  <!-- Header -->
  <header class="bg-linear-to-r from-orange-600 to-orange-700 text-white shadow-lg">
    <div class="flex items-center justify-between px-6 py-3">
      <a
        href="/"
        class="flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
      >
        <span class="text-xl">🏠</span>
        <span>Accueil</span>
      </a>

      <div class="flex items-center gap-3">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐄%3C/text%3E%3C/svg%3E" alt="Logo" class="w-10 h-10" />
        <div>
          <h1 class="text-3xl font-bold text-yellow-100" style="font-family: Georgia, serif;">La Ferme à Bibi</h1>
          <p class="text-sm text-yellow-200 italic" style="font-family: Georgia, serif;">Depuis 1887</p>
        </div>
      </div>

      <div class="w-32"></div>
    </div>
  </header>

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
        {persons.length} {persons.length > 1 ? "personnes trouvées" : "personne trouvée"}
      </div>
    </div>

    <!-- Persons -->
    {#if persons.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-orange-900 mb-2">Aucune personne trouvée</h3>
        <p class="text-orange-700">Essayez de modifier vos critères de recherche</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each persons as person (person.id)}
          <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden border-3 border-orange-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Profile picture -->
            <div class="relative bg-linear-to-br from-orange-200 to-yellow-200 p-6">
              <div class="flex justify-center">
                <img 
                  src={person.photo} 
                  alt={person.firstName + ' ' + person.lastName}
                  class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                />
              </div>
              
              <!-- Role badge -->
              <span class="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-white rounded-lg font-bold text-sm shadow-md">
                {person.role}
              </span>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="text-2xl font-bold text-orange-900 mb-1" style="font-family: Georgia, serif;">
                {person.firstName} {person.lastName}
              </h3>
              <p class="text-orange-700 mb-2">@{person.username}</p>

              <div class="flex items-center gap-4 mb-3 text-sm text-orange-800">
                <div class="flex items-center gap-1">
                  <span>📍</span>
                  <span>{person.city}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span>🎂</span>
                  <span>{person.age} ans</span>
                </div>
              </div>

              {#if person.adoptedAnimals > 0}
                <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
                  <span>🐾</span>
                  <span class="font-semibold">{person.adoptedAnimals} {person.adoptedAnimals > 1 ? "animaux adoptés" : "animal adopté"}</span>
                </div>
              {/if}

              <p class="text-sm text-gray-700 mb-4 line-clamp-2 italic">
                "{person.bio}"
              </p>

              <!-- Buttons -->
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
                  👁️ Voir le profil
                </button>
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
