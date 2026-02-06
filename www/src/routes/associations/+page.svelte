<script lang="ts">
import { onMount } from "svelte";
import { getAssociations, getPetsCount } from "$lib/associations.remote";
import type { AssociationType } from "$lib/server/db/schema";

let { data } = $props();

let searchQuery = $state("");
let selectedType = $state<AssociationType | null>(null);
let selectedCity = $state<string | null>(null);
let sortBy = $state<"name" | "type">("name");

const cities = $derived((await data.cities).map((city) => city.name).sort());

const associations = $derived(
  await getAssociations({
    search: searchQuery,
    type: selectedType,
    city: selectedCity,
    sortBy,
  }).then((associations) =>
    associations.map((association) => ({
      ...association,
      logo: "🐄",
    })),
  ),
);

onMount(() => {
  searchQuery = data.filters.search;
  selectedType = data.filters.type;
  selectedCity = data.filters.city;
  sortBy = data.filters.sort;
});
</script>

<svelte:head>
  <title>Associations - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page title -->
    <div class="text-center mb-8">
      <h2 class="text-4xl md:text-5xl font-bold text-orange-900 mb-4" style="font-family: Georgia, serif;">
        🏛️ Animal Associations
      </h2>
      <p class="text-xl text-orange-800">
        Discover associations dedicated to animal welfare
      </p>
    </div>

    <!-- Search filters -->
    <div class="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-400 mb-8">
      <h3 class="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
        <span>🔍</span>
        Find an association
      </h3>

      <!-- Search bar -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name or description..."
          class="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
        />
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Type -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2" for="type">Type</label>
          <select
            id="type"
            bind:value={selectedType}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value={null}>All</option>
            {#each data.associationTypes as type}
              <option value={type}>{type}</option>
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
            <option value={null}>All</option>
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
            <option value="name">Name (A-Z)</option>
            <option value="city">City</option>
            <option value="type">Type</option>
            <option value="animalsCount">Animals count</option>
          </select>
        </div>

        <div></div>
      </div>

      <!-- Results -->
      <div class="mt-4 text-orange-900 font-medium">
        {associations.length} {associations.length > 1 ? "associations found" : "association found"}
      </div>
    </div>

    <!-- Associations -->
    {#if associations.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-orange-900 mb-2">No association found</h3>
        <p class="text-orange-700">Try modifying your search criteria</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each associations as association (association.id)}
          <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-orange-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Logo and type badge -->
            <div class="relative bg-gradient-to-br from-orange-200 to-yellow-200 p-6">
              <div class="flex justify-center">
                <div class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-6xl">
                  {association.logo}
                </div>
              </div>
              
              <!-- Type badge -->
              <span class="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-white rounded-lg font-bold text-sm shadow-md">
                {association.type}
              </span>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="text-xl font-bold text-orange-900 mb-2" style="font-family: Georgia, serif;">
                {association.name}
              </h3>

              <div class="flex items-center gap-4 mb-3 text-sm text-orange-800">
                <div class="flex items-center gap-1">
                  <span>📍</span>
                  <span>{association.city}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span>📅</span>
                  <span>Since {association.foundedAt}</span>
                </div>
              </div>

              <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
                <span>🐾</span>
                <span class="font-semibold">{await getPetsCount(association.id)} animals</span>
              </div>

              <p class="text-sm text-gray-700 mb-4 line-clamp-3 italic">
                "{association.description}"
              </p>

              <!-- Contact info -->
              <div class="mb-4 space-y-1 text-xs text-gray-600">
                <div class="flex items-center gap-2">
                  <span>📧</span>
                  <span class="truncate">{association.email}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>📞</span>
                  <span>{association.phone}</span>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
                  👁️ View profile
                </button>
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
