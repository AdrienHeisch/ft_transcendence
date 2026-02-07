<script lang="ts">
import Post from "$lib/components/Post.svelte";
import { createPost, getPosts } from "$lib/posts.remote";

const { data } = $props();

const posts = $derived(await getPosts({}));

let files = $state<FileList>();
let fileInput = $state<HTMLInputElement>();
let showFileError = $state(false);
let formElement = $state<HTMLFormElement>();

function clearFile() {
  if (fileInput) {
    fileInput.value = "";
  }
  files = undefined;
}

function resetForm() {
  clearFile();
  showFileError = false;
  if (formElement) {
    formElement.reset();
  }
}

function handlePostClick(event: MouseEvent) {
  if (!files || !files.item(0)) {
    event.preventDefault();
    event.stopPropagation();
    showFileError = true;
  } else {
    showFileError = false;
    // Reset after a short delay to allow form submission
    setTimeout(resetForm, 100);
  }
}
</script>

<!-- Zone de contenu principal -->
<main class="flex-1 p-6">
	<div class="max-w-2xl mx-auto">
    <!-- Fil d'actualité -->
		<section class="bg-white rounded-xl shadow-lg border-3 border-orange-400 p-6 mb-6">
			<h2 class="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
				<span>📰</span>
				News Feed
			</h2>

      <!-- Post input -->
      {#if data.currentUser}
        <form bind:this={formElement} enctype="multipart/form-data" {...createPost}>
          <div class="flex flex-col mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
            {#if files && files.item(0)}
              {@const file = files.item(0) as File}
              <div class="relative inline-block mb-2">
                <img class="p-1 rounded-lg" alt="Uploaded" src={`data:image/png;base64,${(await file.bytes()).toBase64()}`} />
                <button
                  type="button"
                  onclick={clearFile}
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            {/if}
            <textarea 
              class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white"
              placeholder="What's new?"
              rows="3"
              {...createPost.fields.content.as("text")}
              required
            ></textarea>
            {#if showFileError}
              <p class="text-red-500 text-sm mt-2 font-medium">⚠️ Please upload an image before posting.</p>
            {/if}
            <div class="flex justify-end mt-2 gap-2">
              <label class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md cursor-pointer">
                Upload file
                <input
                  name="file"
                  type="file"
                  accept="image/png"
                  bind:this={fileInput}
                  bind:files
                  onchange={() => showFileError = false}
                  class="hidden"
                />
              </label>
              <button type="submit" onclick={handlePostClick} class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
                Post
              </button>
            </div>
          </div>
        </form>
      {/if}

      <!-- Posts -->
			<div class="space-y-4">
        {#each posts as post}
          <Post {post} currentUser={data.currentUser} />
        {/each}
			</div>
		</section>

    <!-- Announcements adoptions -->
		<section class="bg-white rounded-xl shadow-lg border-3 border-orange-400 p-6">
			<h2 class="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
				<span>📢</span>
				Announcements & Adoptions
			</h2>
			<div class="p-4 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 text-center">
				<p class="text-gray-600 italic">No announcements at the moment.</p>
			</div>
		</section>
	</div>
</main>
