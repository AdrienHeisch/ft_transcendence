<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Dérivation automatique de l'animal depuis data
  let animal = $derived(data.animal);

  // Photos animal (exemple : marguerite ma jolie vache)
  const animalPhotos = [
    "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
    "https://www.lozere-online.com/wp-content/uploads/2013/09/vache-race-aubrac.jpg",
    "https://cdn.canardware.com/2021/05/05044743/10327-vache-1200x627.jpg",
  ];
</script>

<svelte:head>
  <title>Profil de {animal.nom}</title>
</svelte:head>

<div class="min-h-screen bg-[#f5e6d3]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <a href="/animaux" class="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#A0522D] font-bold transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Retour à la liste
    </a>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="space-y-6">
        <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-8 border-4 border-[#8B4513]">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-4xl font-bold text-[#8B4513] mb-2">{animal.nom}</h1>
              <p class="text-xl text-[#A0522D] font-medium">{animal.espece}</p>
            </div>
            {#if animal.adopte}
              <span class="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium">
                Adopté
              </span>
            {:else}
              <span class="px-4 py-2 bg-[#CC5500] text-white rounded-lg font-bold">
                ★ DISPONIBLE ★
              </span>
            {/if}
          </div>

          <!-- Info -->
          <div class="space-y-4 mb-6">
            <div class="flex items-center gap-3 p-4 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513]">
              <span class="text-2xl">🎂</span>
              <div>
                <p class="text-sm text-[#A0522D] font-medium">Âge</p>
                <p class="text-lg text-[#8B4513] font-bold">{animal.age} ans</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513]">
              <span class="text-2xl">📍</span>
              <div>
                <p class="text-sm text-[#A0522D] font-medium">Localisation</p>
                <p class="text-lg text-[#8B4513] font-bold">La Ferme à Bibi</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513]">
              <span class="text-2xl">🏥</span>
              <div>
                <p class="text-sm text-[#A0522D] font-medium">Santé</p>
                <p class="text-lg text-[#8B4513] font-bold">Excellente</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-[#8B4513] mb-3 flex items-center gap-2">
              <span>📝</span>
              Description
            </h2>
            <p class="text-[#8B4513] leading-relaxed bg-[#fef7ed] p-4 rounded-lg border-2 border-[#8B4513]">
              {animal.description}
            </p>
          </div>

          {#if !animal.adopte}
            <button class="w-full py-4 bg-[#CC5500] text-white rounded-lg font-bold text-lg hover:bg-[#A04000] transition-all duration-200 shadow-md hover:shadow-lg">
              🏠 Adopter {animal.nom}
            </button>
          {:else}
            <button disabled class="w-full py-4 bg-gray-400 text-white rounded-lg font-bold text-lg cursor-not-allowed opacity-60">
              Déjà adopté
            </button>
          {/if}
        </div>

        <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513]">
          <h2 class="text-xl font-bold text-[#8B4513] mb-4 flex items-center gap-2">
            <span>⭐</span>
            Caractéristiques
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513] text-center">
              <p class="text-sm text-[#A0522D]">Sociable</p>
              <p class="text-2xl">Oui</p>
            </div>
            <div class="p-3 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513] text-center">
              <p class="text-sm text-[#A0522D]">Calme</p>
              <p class="text-2xl">Oui</p>
            </div>
            <div class="p-3 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513] text-center">
              <p class="text-sm text-[#A0522D]">Affectueux</p>
              <p class="text-2xl">Oui</p>
            </div>
            <div class="p-3 bg-[#fef7ed] rounded-lg border-2 border-[#8B4513] text-center">
              <p class="text-sm text-[#A0522D]">Joueur</p>
              <p class="text-2xl">Non</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Photos à droite -->
      <div class="space-y-6">
        <!-- Photo principale -->
        <div class="bg-[#fef7ed] rounded-2xl shadow-xl overflow-hidden border-4 border-[#8B4513]">
          <img 
            src={animalPhotos[0]} 
            alt={animal.nom}
            class="w-full aspect-video object-cover"
          />
        </div>

        <!-- Galerie de photos -->
        <div class="grid grid-cols-2 gap-4">
          {#each animalPhotos.slice(1) as photo, i}
            <div class="bg-[#fef7ed] rounded-2xl shadow-lg overflow-hidden border-4 border-[#8B4513] hover:shadow-xl transition-all duration-200 cursor-pointer">
              <img 
                src={photo} 
                alt="{animal.nom} - Photo {i + 2}"
                class="w-full aspect-square object-cover"
              />
            </div>
          {/each}
        </div>

        <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513]">
          <h2 class="text-xl font-bold text-[#8B4513] mb-4 flex items-center gap-2">
            <span>📋</span>
            Historique
          </h2>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-[#CC5500] font-bold">•</span>
              <p class="text-[#8B4513]">Arrivé à la ferme en {new Date().getFullYear() - 1}</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-[#CC5500] font-bold">•</span>
              <p class="text-[#8B4513]">Vacciné et en bonne santé</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-[#CC5500] font-bold">•</span>
              <p class="text-[#8B4513]">S'entend bien avec les autres animaux</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
