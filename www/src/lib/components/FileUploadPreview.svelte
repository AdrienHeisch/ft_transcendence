<script lang="ts">
import type { Snippet } from "svelte";
import FileUpload from "$lib/components/FileUpload.svelte";

const {
  fileUpload,
  placeholder,
  class: classes,
}: {
  fileUpload?: FileUpload;
  placeholder?: Snippet;
  class?: string;
} = $props();

const previewUrl = $derived.by(() => {
  const file = fileUpload?.getFile();
  return file ? URL.createObjectURL(file) : "";
});
</script>

{#if fileUpload && fileUpload.hasFile()}
  <div class="{classes} relative aspect-video rounded-xl overflow-hidden border-2 border-[#8B4513]">
    <img
      src={previewUrl}
      alt="Preview"
      class="w-full h-full object-cover"
    />
    <button
      aria-label="Remove image"
      type="button"
      onclick={fileUpload.clearFiles}
      class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
{:else if placeholder}
  {@render placeholder()}
{/if}
