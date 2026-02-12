<script lang="ts">
import Post from "$lib/components/Post.svelte";
import { createPost, getPosts } from "$lib/posts.remote";

const { data } = $props();

const posts = $derived(await getPosts({}));

let files = $state<FileList>();
const previewUrl = $derived.by(() => {
  const file = files?.item(0);
  return file ? URL.createObjectURL(file) : undefined;
});
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
        <form enctype="multipart/form-data" {...createPost}>
          <div class="flex flex-col mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
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
            <div class="flex justify-end mt-2">
              <label>Upload your file
                <input
                  name="file"
                  type="file"
                  accept="image/png"
                  bind:files
                  required
                />
              </label>
              <button type="submit" class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
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
