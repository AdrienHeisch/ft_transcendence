<script lang="ts">
import Post from "$lib/components/Post.svelte";

const { data } = $props();
</script>

<svelte:head>
  <title>Post - Bibi's Farm</title>
</svelte:head>

<div class="flex w-full p-12 items-center justify-center">
  <Post post={data.post} author={data.author} currentUser={data.currentUser} isFullPage={true} />
</div>
