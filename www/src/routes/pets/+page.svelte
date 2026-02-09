<script lang="ts">
import { getPets } from "$lib/pets.remote";
import { getPetAvatar } from "$lib/storage";

const PAGE_SIZE = 12;

// TODO generate this list
const species = ["Cat", "Dog", "Cow", "Fish", "Horse"];

// Filters
let searchQuery = $state("");
let selectedSpecies = $state<string>();
let sortBy = $state<"name" | "species">("name");
let currentPage = $state(0);

const pets = $derived(
  await getPets({
    search: searchQuery,
    species: selectedSpecies,
    sortBy,
    offset: currentPage * PAGE_SIZE,
    limit: PAGE_SIZE,
  }),
);

const petsCount = $derived(pets.at(0)?.count ?? 0);
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
            <option value={undefined}>All</option>
            {#each species as sp}
              <option value={sp}>{sp}</option>
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
        {petsCount} {petsCount ? "animals" : "animal"} found
      </div>
    </div>

    <!-- Animals grid -->
    {#if pets.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-[#8B4513] mb-2">No animals found</h3>
        <p class="text-[#A0522D]">Try adjusting your search criteria</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each pets as pet (pet.id)}
          <a
            href="./{pet.id}"
            class="bg-[#fef7ed] rounded-2xl shadow-lg overflow-hidden border-4 border-[#8B4513] hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Animal image -->
            <div class="relative">
              {#if pet.hasAvatar}
                <img 
                  src={getPetAvatar(pet)} 
                  alt={pet.name}
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
              <h3 class="text-2xl font-bold text-[#8B4513] mb-2">{pet.name}</h3>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg text-[#A0522D] font-medium">{pet.species}</span>
                {#if pet.breed}
                  <span class="text-[#8B4513]">•</span>
                  <span class="text-[#A0522D]">{pet.breed}</span>
                {/if}
              </div>

              <div class="text-sm text-[#A0522D] mb-2">
                🎂 {Math.floor((new Date().getTime() - pet.birth.getTime()) / 1000 / 3600 / 24 / 365)}
              </div>

              <p class="text-sm text-[#8B4513] mb-4 line-clamp-2">
                {pet.bio}
              </p>

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
      <div>
        {#if currentPage > 0}
          <button onclick={() => currentPage--}>←</button>
        {/if}
        {#if petsCount > PAGE_SIZE}
          <span>{currentPage}</span>
        {/if}
        {#if (currentPage + 1) * PAGE_SIZE < petsCount}
          <button onclick={() => currentPage++}>→</button>
        {/if}
      </div>
    {/if}
  </div>
</div>
