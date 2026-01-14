<script lang="ts">
const { data } = $props();
$effect(() => {
  data.messages.then(console.log);
});
// TODO websockets
</script>

<div class="grid">
  {#each await data.messages as message}
    <div>{message.chat_message.content}</div>
  {/each}
</div>
