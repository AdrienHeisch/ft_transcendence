<script lang="ts">
import { resolve } from "$app/paths";
import * as remote from "./files.remote";

const { data } = $props();

const list = $derived(await data.files);

let files = $state<FileList>();

$effect(() => {
  if (files) {
    console.log(files);

    for (const file of files) {
      console.log(`${file.name}: ${file.size} bytes`);
    }
  }
});
</script>

<form enctype="multipart/form-data" {...remote.postFile}>
  <div>
    <label for="file">Upload your file</label>
    <input type="file" id="file" name="file" bind:files required />
  </div>
  <button type="submit">Submit !</button>
</form>

{#each list.contents as file}
  {@const key = file.key.replace(list.prefix || "", "")}
  <a href={resolve(`/demo/private-files/${key}`)}>{key}</a>
{/each}
