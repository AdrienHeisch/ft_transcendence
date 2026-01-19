<script lang="ts">
import * as remote from "./posts.remote";

const { data } = $props();
</script>

<form enctype="multipart/form-data" {...remote.sendPost}>
  <div>
    <label for="content">New post: </label>
    <input type="text" id="content" name="content" required />
  </div>
  <button type="submit">Submit !</button>
</form>

<div class="grid columns-3">
  {#each await data.posts as post}
    <div class="border-2 border-solid">
      <h1>{post.user?.firstName}</h1>
      <p>{post.post.content}</p>
    </div>
  {/each}
</div>
