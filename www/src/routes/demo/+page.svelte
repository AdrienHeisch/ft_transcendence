<script lang="ts">
const demos = ["auth", "chat", "files", "friends", "posts"];
</script>

<ul>
  {#each demos as demo}
  <li>
    <a href={`/demo/${demo}`}>{demo}</a>
  </li>
{/each}
</ul>
