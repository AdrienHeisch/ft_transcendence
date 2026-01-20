<script lang="ts">
  import type { Pet } from "$lib/server/db/schema";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();

  const getAvatar = (_: Pet) => "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800";

  // Filters
  let searchQuery = $state("");
  let selectedSpecies = $state("all");
  let sortBy = $state("name");

  // Use data from database
  let animals = $derived(await data.pets || []);

  // List of unique species for the filter
  let species = $derived(["all", ...new Set(animals.map(a => a.species))]);

  // Filtering animals
  let filteredAnimals = $derived(animals.filter(animal => {
    const matchSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (animal.breed && animal.breed.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSpecies = selectedSpecies === "all" || animal.species === selectedSpecies;
    
    return matchSearch && matchSpecies;
  }));

  // Sorting animals
  let sortedAnimals = $derived([...filteredAnimals].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "species") {
      return a.species.localeCompare(b.species);
    }
    return 0;
  }));
</script>

<svelte:head>
  <title>Our Animals - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen bg-[#f5e6d3]">
  <!-- Header -->
  <div class="bg-linear-to-r from-[#CC5500] to-[#A04000] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        🐾 Our Residents
      </h1>
      <p class="text-xl text-white/90 text-center max-w-2xl mx-auto">
        Companions waiting for you! Come meet them, or
        chat with people from all over the world on our site!
      </p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search filters -->
    <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513] mb-8">
      <h2 class="text-2xl font-bold text-[#8B4513] mb-6 flex items-center gap-2">
        <span>🔍</span>
        Search for an animal
      </h2>

      <!-- Search bar -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name or description..."
          class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
        />
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Species -->
        <div>
          <label class="block text-sm font-bold text-[#8B4513] mb-2" for="species">Species</label>
          <select
            id="species"
            bind:value={selectedSpecies}
            class="w-full px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
          >
            {#each species as sp}
              <option value={sp}>{sp === "all" ? "All" : sp}</option>
            {/each}
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label class="block text-sm font-bold text-[#8B4513] mb-2" for="sortBy">Sort by</label>
          <select
            id="sortBy"
            bind:value={sortBy}
            class="w-full px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
          >
            <option value="name">Name (A-Z)</option>
            <option value="species">Species</option>
          </select>
        </div>

        <!-- Empty space for alignment -->
        <div></div>
      </div>

      <!-- Results -->
      <div class="mt-4 text-[#8B4513] font-medium">
        {sortedAnimals.length} {sortedAnimals.length > 1 ? "animals" : "animal"} found
      </div>
    </div>

    <!-- Animals grid -->
    {#if sortedAnimals.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-[#8B4513] mb-2">No animals found</h3>
        <p class="text-[#A0522D]">Try adjusting your search criteria</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each sortedAnimals as animal (animal.id)}
          <a
            href="/profil_animaux"
            class="bg-[#fef7ed] rounded-2xl shadow-lg overflow-hidden border-4 border-[#8B4513] hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Animal image -->
            <div class="relative">
              {#if animal.hasAvatar}
                <img 
                  src={getAvatar(animal)} 
                  alt={animal.name}
                  class="w-full h-56 object-cover"
                />
              {:else}
                <div class="w-full h-56 bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <span class="text-6xl">🐾</span>
                </div>
              {/if}
              <span class="absolute top-3 right-3 px-3 py-1 bg-[#CC5500] text-white rounded-lg font-bold text-sm">
                ⭐ AVAILABLE
              </span>
            </div>

            <!-- Information -->
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

              {#if animal.bio}
                <p class="text-sm text-[#8B4513] mb-4 line-clamp-2">
                  {animal.bio}
                </p>
              {/if}

              <!-- Buttons -->
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-[#CC5500] text-white rounded-lg font-bold hover:bg-[#A04000] transition-colors">
                  🏠 Adopt
                </button>
                <button class="flex-1 py-2 bg-white border-2 border-[#8B4513] text-[#8B4513] rounded-lg font-bold hover:bg-[#fef7ed] transition-colors">
                  👁️ View profile
                </button>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
