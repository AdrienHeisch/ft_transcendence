<script lang="ts">
import { slide } from "svelte/transition";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import {
  createComment,
  deletePost,
  editPost,
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
  isOwned?: boolean;
}

const { post: _post, isOwned = false }: Props = $props();

// TODO remove fake data
const post = $derived({
  ..._post,
  comments: _post.content.length % 20,
  image:
    "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
});

let optionsOpen = $state(false);
let commentsOpen = $state(false);

let isEditing = $state(false);

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

const onDelete = async () => {
  optionsOpen = false;
  await deletePost(post.id);
};

const onEditStart = () => {
  optionsOpen = false;
  isEditing = !isEditing;
};

const closeEdit = () => {
  optionsOpen = false;
  isEditing = false;
};
</script>

<div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-4 border-orange-700 hover:shadow-xl transition-all duration-200">
  <!-- Post Header -->
  <div class="p-4 flex items-center gap-3">
    <a href={resolve(`/persons/${post.author.id}`)}>
      <img 
        src={getUserAvatar(post.author)} 
        alt="{post.author.firstName} {post.author.lastName}"
        class="w-12 h-12 rounded-full border-2 border-orange-700"
      />
    </a>
    <div class="flex-1">
      <a href={resolve(`/persons/${post.author.id}`)}>
        <p class="font-semibold text-gray-900">{post.author.firstName} {post.author.lastName}</p>
      </a>
      <p class="text-sm text-gray-600">{post.postedAt}</p>
    </div>
    {#if isOwned}
      <button onclick={() => optionsOpen = !optionsOpen} class="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Actions">
        <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </button>
    {/if}
  </div>

  {#if optionsOpen}
    <div class="fixed top-14 right-6 flex flex-col p-2 bg-orange-50 rounded-lg shadow-2xl border-4 border-orange-600 z-20">
      <button onclick={onEditStart}>Edit</button>
      <button onclick={onDelete}>Delete</button>
    </div>
  {/if}

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
    {#if isEditing}
      <form {...editPost} onsubmit={closeEdit}>
        <input {...editPost.fields.id.as("hidden", post.id)}/>
        <textarea class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white" {...editPost.fields.content.as("text")}
        >{post.content}</textarea>
        <div class="flex mt-1">
          <div class="flex-1"></div>
          <button onclick={closeEdit} class="px-6 py-2 mr-1 bg-linear-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition shadow-md">
            Cancel
          </button>
          <button type="submit" class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
            Post
          </button>
        </div>
      </form>
    {:else}
      <p class="text-gray-800">{post.content}</p>
    {/if}

    <!-- Comments -->
    {#if commentsOpen}
      <div class="flex flex-col content-center">
        {#each await getPostComments(post.id) as comment}
          <div transition:slide class="m-1 p-4 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 shadow">
            <div class="flex items-center gap-3 mb-3">
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
          </div>
        {/each}
        <form class="m-1 p-4 bg-orange-50 rounded-lg border-2 border-orange-300 shadow" {...createComment}>
          <input {...createComment.fields.post.as("hidden", post.id)}/>
          <textarea 
            class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white"
            placeholder="What's new?"
            rows="3"
            required
            {...createComment.fields.content.as("text")}
          ></textarea>
          <div class="flex justify-end mt-2">
            <button
              type="submit"
              class="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
