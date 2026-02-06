<script lang="ts">
import { resolve } from "$app/paths";
import { createPet } from "$lib/pets.remote";

let previewUrl = $state<string>("");
let selectedFile = $state<File | null>(null);
let characteristics = $state<string[]>([]);
let newCharacteristic = $state("");
let additionalInfos = $state<{ label: string; value: string }[]>([
  { label: "Location", value: "Bibi's Farm" },
  { label: "Health", value: "To be determined" },
]);
let newInfoLabel = $state("");
let newInfoValue = $state("");

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    selectedFile = file;
    previewUrl = URL.createObjectURL(file);
  }
}

function addCharacteristic() {
  if (
    newCharacteristic.trim() &&
    !characteristics.includes(newCharacteristic.trim())
  ) {
    characteristics.push(newCharacteristic.trim());
    characteristics = characteristics;
    newCharacteristic = "";
  }
}

function removeCharacteristic(index: number) {
  characteristics.splice(index, 1);
  characteristics = characteristics;
}

function addAdditionalInfo() {
  if (newInfoLabel.trim() && newInfoValue.trim()) {
    additionalInfos.push({
      label: newInfoLabel.trim(),
      value: newInfoValue.trim(),
    });
    additionalInfos = additionalInfos;
    newInfoLabel = "";
    newInfoValue = "";
  }
}

function removeAdditionalInfo(index: number) {
  additionalInfos.splice(index, 1);
  additionalInfos = additionalInfos;
}
</script>

<svelte:head>
  <title>New Pet - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen bg-[#f5e6d3]">
  <!-- Header -->
  <div class="bg-linear-to-r from-[#CC5500] to-[#A04000] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        🐾 New Pet
      </h1>
      <p class="text-xl text-white/90 text-center max-w-2xl mx-auto">
        Add a new furry friend to our farm family!
      </p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <form {...createPet}>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left column - Form fields -->
        <div class="space-y-6">
          <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-8 border-4 border-[#8B4513]">
            <h2 class="text-2xl font-bold text-[#8B4513] mb-6 flex items-center gap-2">
              <span>📝</span>
              Basic Information
            </h2>

            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-bold text-[#8B4513] mb-2" for="name">
                  Name
                  <input
                    {...createPet.fields.name.as("text")}
                    placeholder="Garfield"
                    required
                    class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                  />
                </label>
              </div>

              <!-- Species -->
              <div>
                <label class="block text-sm font-bold text-[#8B4513] mb-2" for="species">
                  Species
                  <input
                    {...createPet.fields.species.as("text")}
                    placeholder="Cat"
                    required
                    class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                  />
                </label>
              </div>

              <!-- Breed -->
              <div>
                <label class="block text-sm font-bold text-[#8B4513] mb-2" for="breed">
                  Breed
                  <input
                    {...createPet.fields.breed.as("text")}
                    placeholder="Orange Lasagna"
                    required
                    class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                  />
                </label>
              </div>

              <!-- Age -->
              <div>
                <label class="block text-sm font-bold text-[#8B4513] mb-2" for="age">
                  Age
                  <input
                    {...createPet.fields.age.as("number")}
                    placeholder="8"
                    required
                    min="0"
                    class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                  />
                </label>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-bold text-[#8B4513] mb-2" for="bio">
                  Description
                  <textarea
                    id="bio"
                    {...createPet.fields.bio.as("text")}
                    placeholder="A friendly and playful companion..."
                    rows="4"
                    class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium resize-none"
                  ></textarea>
                </label>
              </div>
            </div>
          </div>

          <!-- Characteristics -->
          <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513]">
            <h2 class="text-xl font-bold text-[#8B4513] mb-4 flex items-center gap-2">
              <span>⭐</span>
              Characteristics
            </h2>
            
            <!-- Add characteristic -->
            <div class="mb-4">
              <div class="flex gap-2">
                <input
                  type="text"
                  bind:value={newCharacteristic}
                  placeholder="e.g., Sociable, Calm, Playful..."
                  onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addCharacteristic())}
                  class="flex-1 px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                />
                <button
                  type="button"
                  onclick={addCharacteristic}
                  class="px-4 py-2 bg-[#CC5500] text-white rounded-lg font-bold hover:bg-[#A04000] transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>

            <!-- List of characteristics -->
            {#if characteristics.length > 0}
              <div class="grid grid-cols-2 gap-3">
                {#each characteristics as char, i}
                  <div class="p-3 bg-white rounded-lg border-2 border-[#8B4513] flex items-center justify-between">
                    <span class="text-[#8B4513] font-medium">{char}</span>
                    <button
                      aria-label="Remove"
                      type="button"
                      onclick={() => removeCharacteristic(i)}
                      class="text-red-400 hover:text-red-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-center py-6 bg-[#fef7ed] rounded-lg border-2 border-dashed border-[#8B4513]">
                <p class="text-[#A0522D] text-sm">No characteristics added yet</p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Right column - Photo preview -->
        <div class="space-y-6">
          <!-- Photo upload -->
          <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-8 border-4 border-[#8B4513]">
            <h2 class="text-2xl font-bold text-[#8B4513] mb-6 flex items-center gap-2">
              <span>📸</span>
              Photo
            </h2>

            <!-- Preview or placeholder -->
            <div class="mb-6">
              {#if previewUrl}
                <div class="relative aspect-video rounded-xl overflow-hidden border-2 border-[#8B4513]">
                  <img 
                    src={previewUrl} 
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <button
                    aria-label="Remove image"
                    type="button"
                    onclick={() => {
                      previewUrl = "";
                      selectedFile = null;
                    }}
                    class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              {:else}
                <div class="aspect-video rounded-xl border-2 border-dashed border-[#8B4513] flex items-center justify-center bg-[#fef7ed]">
                  <div class="text-center">
                    <span class="text-6xl mb-4 block">🐾</span>
                    <p class="text-[#8B4513] font-medium">No photo yet</p>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Upload button -->
            <label class="block">
              <input
                type="file"
                accept="image/*"
                onchange={handleFileChange}
                class="hidden"
              />
              <div class="w-full py-3 bg-[#CC5500] text-white rounded-lg font-bold text-center hover:bg-[#A04000] transition-all cursor-pointer">
                📷 {previewUrl ? "Change photo" : "Add photo"}
              </div>
            </label>
          </div>

          <!-- Additional info -->
          <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513]">
            <h2 class="text-xl font-bold text-[#8B4513] mb-4 flex items-center gap-2">
              <span>ℹ️</span>
              Additional Information
            </h2>
            
            <!-- Add info -->
            <div class="mb-4 space-y-2">
              <input
                type="text"
                bind:value={newInfoLabel}
                placeholder="Label (e.g., Location, Health...)"
                class="w-full px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
              <div class="flex gap-2">
                <input
                  type="text"
                  bind:value={newInfoValue}
                  placeholder="Value"
                  onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addAdditionalInfo())}
                  class="flex-1 px-4 py-2 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
                />
                <button
                  type="button"
                  onclick={addAdditionalInfo}
                  class="px-4 py-2 bg-[#CC5500] text-white rounded-lg font-bold hover:bg-[#A04000] transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>

            <!-- List of infos -->
            <div class="space-y-4">
              {#each additionalInfos as info, i}
                <div class="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-[#8B4513] group">
                  <span class="text-2xl">📌</span>
                  <div class="flex-1">
                    <p class="text-sm text-[#A0522D] font-medium">{info.label}</p>
                    <p class="text-lg text-[#8B4513] font-bold">{info.value}</p>
                  </div>
                  <button
                    aria-label="Remove"
                    type="button"
                    onclick={() => removeAdditionalInfo(i)}
                    class="text-red-400 hover:text-red-700 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Submit button -->
          <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-6 border-4 border-[#8B4513]">
            <button
              type="submit"
              class="w-full py-4 bg-linear-to-r from-[#CC5500] to-[#A04000] text-white rounded-lg font-bold text-lg hover:from-[#DD6611] hover:to-[#B05011] transition-all shadow-lg hover:shadow-xl"
            >
              🐾 Create Pet
            </button>

            <div class="text-center mt-4">
              <a
                href={resolve("/pets")}
                class="text-[#8B4513] hover:text-[#CC5500] font-semibold transition-colors"
              >
                ← Cancel and go back
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
