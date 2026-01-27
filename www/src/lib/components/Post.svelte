<script lang="ts">
import { slide } from "svelte/transition";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import {
  getPostCommentCount,
  getPostComments,
  getPostLikes,
  isPostLiked,
  likePost,
  unlikePost,
} from "$lib/posts.remote";
import type { Post, User } from "$lib/server/db/schema";
import { getUserAvatar } from "$lib/storage";

interface Props {
  post: Omit<Post, "author"> & { author: User };
}

const { post: _post }: Props = $props();

// TODO remove fake data
const post = $derived({
  ..._post,
  comments: _post.content.length % 20,
  image:
    "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
});

let commentsOpen = $state(false);

const isLiked = $derived(isPostLiked(_post.id));

const onLikePost = async () => {
  try {
    if (await isLiked) {
      await unlikePost(post.id);
    } else {
      await likePost(post.id);
    }
  } catch (e: any) {
    switch (e.status) {
      case 401:
        goto(resolve("/login"));
        break;
      default:
        console.log(e);
    }
  }
};
</script>

<div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-4 border-orange-700 hover:shadow-xl transition-all duration-200">
  <!-- Post Header -->
  <div class="p-4 flex items-center gap-3">
    <img 
      src={getUserAvatar(post.author)} 
      alt="{post.author.firstName} {post.author.lastName}"
      class="w-12 h-12 rounded-full border-2 border-orange-700"
    />
    <div class="flex-1">
      <p class="font-semibold text-gray-900">{post.author.firstName} {post.author.lastName}</p>
      <p class="text-sm text-gray-600">{post.postedAt}</p>
    </div>
    <button class="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Actions">
      <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
      </svg>
    </button>
  </div>

  <!-- Post Image -->
  <img 
    src={post.image} 
    alt="Post"
    class="w-full aspect-video object-cover"
  />

  <!-- Post Actions -->
  <div class="p-4 space-y-3">
    <div class="flex items-center gap-4">
      <button onclick={onLikePost} class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group">
        <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill={await isLiked ? "red" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span class="font-medium">{await getPostLikes(_post.id)}</span>
      </button>
      <button onclick={() => commentsOpen = !commentsOpen} class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group">
        <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span class="font-medium">{await getPostCommentCount(_post.id)}</span>
      </button>
      <button class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group ml-auto" aria-label="Share">
        <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
      </button>
    </div>

    <!-- Caption -->
    <p class="text-gray-800">{post.content}</p>

    <!-- Comments -->
    {#if commentsOpen}
      <div>
        {#each await getPostComments(post.id) as comment}
          <div transition:slide class="p-4 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 shadow">
            <div class="flex items-center gap-3 mb-3">
              <!-- <div class="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow"> -->
              <!-- </div> -->
              <img 
                src={getUserAvatar(comment.author)} 
                alt="{comment.author.firstName} {comment.author.lastName}"
                class="w-12 h-12 rounded-full border-2 border-orange-700"
              />
              <div>
                <div class="font-semibold text-orange-900">{comment.author.firstName} {comment.author.lastName}</div>
                <div class="text-xs text-gray-600">{comment.postedAt}</div>
              </div>
            </div>
            <p class="text-gray-800 mb-3">{comment.content}</p>
            <!-- <div class="flex gap-4 text-sm text-gray-600"> -->
            <!--   <button class="hover:text-orange-700 transition">👍 Like</button> -->
            <!--   <button class="hover:text-orange-700 transition">💬 Comment</button> -->
            <!--   <button class="hover:text-orange-700 transition">↗️ Share</button> -->
            <!-- </div> -->
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
