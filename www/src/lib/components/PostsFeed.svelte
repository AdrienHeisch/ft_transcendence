<script lang="ts">
import Post from "$lib/components/Post.svelte";
import { getPosts } from "$lib/posts.remote";
import { type User } from "$lib/server/db/schema";
import { getUser } from "$lib/user.remote";

const PAGE_SIZE = 4;

const {
  queryArgs = {},
  currentUser,
}: {
  queryArgs?: {
    author?: string;
    pet?: string;
  };
  currentUser?: User;
} = $props();

let offset = $state(0);
let loader = $state<HTMLDivElement>();
let isLoaderVisible = $state(false);

let posts = $derived(
  await getPosts({ offset: 0, limit: PAGE_SIZE, ...queryArgs }),
);

async function onLoaderVisibilityChange(isVisible: boolean) {
  if (isVisible) {
    if (!isLoaderVisible) {
      isLoaderVisible = true;
      offset += PAGE_SIZE;
      posts = posts.concat(
        await getPosts({ offset, limit: PAGE_SIZE, ...queryArgs }),
      );
    }
  } else {
    isLoaderVisible = false;
  }
}

$effect(() => {
  const observer = new IntersectionObserver((entries, _) => {
    const entry = entries.find((entry) => entry.target === loader);
    if (!entry) {
      return;
    }
    onLoaderVisibilityChange(entry.isIntersecting);
  });
  if (loader) {
    observer.observe(loader);
  }
  return () => observer.disconnect();
});
</script>

  {#each posts as post}
    {@const author = await getUser(post.author)}
    {#if author}
      <Post post={post} author={author} currentUser={currentUser} />
    {/if}
  {/each}
  <div bind:this={loader}></div>
