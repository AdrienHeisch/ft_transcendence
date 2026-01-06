<script lang="ts">
  import * as remote from "./files.remote";

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
  <div class="group">
    <label for="file">Upload your file</label>
    <input type="file" id="file" name="file" required />
  </div>

  <button type="submit">Submit !</button>
</form>
