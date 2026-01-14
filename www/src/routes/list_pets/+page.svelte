<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  // Filtres
  let searchQuery = "";
  let selectedEspece = "tous";
  let sortBy = "nom";

  // Utiliser les données de la base de données
  $: animaux = data.pets || [];

  // Liste des espèces uniques pour le filtre
  $: especes = ["tous", ...new Set(animaux.map(a => a.species))];

  // Filtrage des animaux
  $: animauxFiltres = animaux.filter(animal => {
    const matchSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (animal.breed && animal.breed.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchEspece = selectedEspece === "tous" || animal.species === selectedEspece;
    
    return matchSearch && matchEspece;
  });

  // Tri des animaux
  $: animauxTries = [...animauxFiltres].sort((a, b) => {
    if (sortBy === "nom") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "espece") {
      return a.species.localeCompare(b.species);
    }
    return 0;
  });
</script>

<svelte:head>
  <title>Nos animaux - La Ferme à Bibi</title>
</svelte:head>

<div class="min-h-screen bg-[#f5e6d3]">
  <!-- Header -->
  <div class="bg-gradient-to-r from-[#CC5500] to-[#A04000] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        🐾 Nos Pensionnaires
      </h1>
      <p class="text-xl text-white/90 text-center max-w-2xl mx-auto">
        Des compagnons qui n'attendent que vous ! Venez vite les rencontrer, ou
        parler avec des personnes du monde entier sur notre site!
      </p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Filtres de recherche -->
    <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513] mb-8">
      <h2 class="text-2xl font-bold text-[#8B4513] mb-6 flex items-center gap-2">
        <span>🔍</span>
        Rechercher un animal
      </h2>

      <!-- Barre de recherche -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Rechercher par nom ou description..."
          class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
        />
      </div>

      <!-- Filtres -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Espèce -->
        <div>
          <label class="block text-sm font-bold text-[#8B4513] mb-2">Espèce</label>
          <select
            bind:value={selectedEspece}
            class="w-full px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
          >
            {#each especes as espece}
              <option value={espece}>{espece === "tous" ? "Toutes" : espece}</option>
            {/each}
          </select>
        </div>

        <!-- Tri -->
        <div>
          <label class="block text-sm font-bold text-[#8B4513] mb-2">Trier par</label>
          <select
            bind:value={sortBy}
            class="w-full px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
          >
            <option value="nom">Nom (A-Z)</option>
            <option value="espece">Espèce</option>
          </select>
        </div>

        <!-- Espace vide pour alignement -->
        <div></div>
      </div>

      <!-- Résultats -->
      <div class="mt-4 text-[#8B4513] font-medium">
        {animauxTries.length} {animauxTries.length > 1 ? "animaux" : "animal"} trouvé{animauxTries.length > 1 ? "s" : ""}
      </div>
    </div>

    <!-- Grille d'animaux -->
    {#if animauxTries.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-[#8B4513] mb-2">Aucun animal trouvé</h3>
        <p class="text-[#A0522D]">Essayez de modifier vos critères de recherche</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each animauxTries as animal (animal.id)}
          <a
            href="/profil_animaux"
            class="bg-[#fef7ed] rounded-2xl shadow-lg overflow-hidden border-4 border-[#8B4513] hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Image de l'animal -->
            <div class="relative">
              {#if animal.photo}
                <img 
                  src={animal.photo} 
                  alt={animal.name}
                  class="w-full h-56 object-cover"
                />
              {:else}
                <div class="w-full h-56 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <span class="text-6xl">🐾</span>
                </div>
              {/if}
              <span class="absolute top-3 right-3 px-3 py-1 bg-[#CC5500] text-white rounded-lg font-bold text-sm">
                ⭐ DISPONIBLE
              </span>
            </div>

            <!-- Informations -->
            <div class="p-5">
              <h3 class="text-2xl font-bold text-[#8B4513] mb-2">{animal.name}</h3>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg text-[#A0522D] font-medium">{animal.species}</span>
                {#if animal.breed}
                  <span class="text-[#8B4513]">•</span>
                  <span class="text-[#A0522D]">{animal.breed}</span>
                {/if}
              </div>
              
              {#if animal.age}
                <div class="text-sm text-[#A0522D] mb-2">
                  🎂 {animal.age}
                </div>
              {/if}

              {#if animal.description}
                <p class="text-sm text-[#8B4513] mb-4 line-clamp-2">
                  {animal.description}
                </p>
              {/if}

              <!-- Boutons -->
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-[#CC5500] text-white rounded-lg font-bold hover:bg-[#A04000] transition-colors">
                  🏠 Adopter
                </button>
                <button class="flex-1 py-2 bg-white border-2 border-[#8B4513] text-[#8B4513] rounded-lg font-bold hover:bg-[#fef7ed] transition-colors">
                  👁️ Voir le profil
                </button>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>