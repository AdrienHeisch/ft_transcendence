<script lang="ts">
import { slide } from "svelte/transition";
import { deleteComment } from "$lib/posts.remote";
import type { PostComment, User } from "$lib/server/db/schema";
import { getUserAvatar } from "$lib/storage";

interface Props {
  comment: Omit<PostComment, "author"> & { author: User };
  currentUser?: User,
}

const { comment, currentUser }: Props = $props();

let optionsOpen = $state(false);

let isEditing = $state(false);

const isOwned = $derived(currentUser?.id === comment.author.id);
$inspect(currentUser?.id);
$inspect(comment.author.id);

const onDelete = async () => {
  optionsOpen = false;
  await deleteComment(comment.id);
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

<div transition:slide class="relative m-1 p-4 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 shadow">
  <div class="flex items-center gap-3 mb-3">
    <img 
      src={getUserAvatar(comment.author)} 
      alt="{comment.author.firstName} {comment.author.lastName}"
      class="w-12 h-12 rounded-full border-2 border-orange-700"
    />
    <div class="flex-1">
      <div class="font-semibold text-orange-900">{comment.author.firstName} {comment.author.lastName}</div>
      <div class="text-xs text-gray-600">{comment.postedAt}</div>
    </div>
    {#if isOwned}
      <button onclick={() => optionsOpen = !optionsOpen} class="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Actions">
        <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </button>
    {/if}
  </div>
  <p class="text-gray-800 mb-3">{comment.content}</p>
  {#if optionsOpen}
    <div class="fixed top-14 right-6 flex flex-col p-2 bg-orange-50 rounded-lg shadow-2xl border-4 border-orange-600 z-20">
      <button onclick={onEditStart}>Edit</button>
      <button onclick={onDelete}>Delete</button>
    </div>
  {/if}
</div>
