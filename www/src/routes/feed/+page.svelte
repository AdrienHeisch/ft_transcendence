<script lang="ts">
import Post from "$lib/components/Post.svelte";
import { getPosts } from "$lib/posts.remote";

const posts = $derived(await getPosts());
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
			<div class="mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
				<textarea 
					class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white"
					placeholder="What's new?"
					rows="3"
				></textarea>
				<div class="flex justify-end mt-2">
					<button class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
						Post
					</button>
				</div>
			</div>

      <!-- Posts -->
			<div class="space-y-4">
        {#each posts as post}
          <Post {post} />
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
