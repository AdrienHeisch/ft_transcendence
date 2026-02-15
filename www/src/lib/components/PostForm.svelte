<script lang="ts">
import { getPets } from "$lib/pets.remote";
import { createPost } from "$lib/posts.remote";
import { type User } from "$lib/server/db/schema";

interface Props {
  currentUser: User;
}

const { currentUser }: Props = $props();

let files = $state<FileList>();

const previewUrl = $derived.by(() => {
  const file = files?.item(0);
  return file ? URL.createObjectURL(file) : undefined;
});

const pets = $derived(
  await getPets({ owner: currentUser.id, search: "", sortBy: "species" }),
);
</script>

<form
  class="flex flex-col mb-6 p-4 bg-orange-50 rounded-2xl border-4 border-orange-300 shadow-lg"
  enctype="multipart/form-data" {...createPost}
>
  {#if previewUrl}
    <img class="p-1" alt="Uploaded" src={previewUrl} />
  {/if}
  <textarea 
    class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white"
    placeholder="What's new?"
    rows="3"
    {...createPost.fields.content.as("text")}
    required
  ></textarea>
  <div class="flex justify-end space-x-4 mt-2">
    <label
      class="px-4 py-1 bg-orange-700 text-white rounded-lg font-bold text-center divide-x-2 divide-gray-100"
    >
      <span class="pr-2">Pet</span>
      <select
        class="pl-1 py-1 rounded-lg hover:bg-orange-800 transition-all cursor-pointer"
        {...createPost.fields.pet.as("select")}
      >
        <option value={undefined}></option>
        {#each pets as pet}
          <option value={pet.id}>{pet.name}</option>
        {/each}
      </select>
    </label>
    <label>
      <input
        name="file"
        type="file"
        accept="image/png"
        bind:files
        required
        class="hidden"
      />
      <div class="px-4 py-2 bg-orange-700 text-white rounded-lg font-bold text-center hover:bg-orange-800 transition-all cursor-pointer">
        📷 Upload
      </div>
    </label>
    <button type="submit" class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
      Post
    </button>
  </div>
</form>
