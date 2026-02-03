<script lang="ts">
import Post from "$lib/components/Post.svelte";

const { data } = $props();
</script>

<div class="flex w-full p-12 items-center justify-center">
  <Post post={await data.post} currentUser={data.currentUser} isFullPage={true} />
</div>
