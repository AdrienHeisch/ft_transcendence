<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link class="bg-amber-50" rel="icon" href={favicon} />
</svelte:head>

{@render children()}
