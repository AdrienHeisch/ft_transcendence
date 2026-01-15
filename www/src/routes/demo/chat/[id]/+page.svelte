<script lang="ts">
import { browser } from "$app/environment";
import type { ChatMessage } from "$lib/server/db/schema.js";

const { data, params } = $props();

let msg = $state<string>("");
let wsMessages = $state<ChatMessage[]>([]);

let ws: WebSocket | undefined = (() => {
  if (!browser) return undefined;
  const ws = new WebSocket(`/ws/${params.id}`); // TODO error handling
  ws.onmessage = (message) => {
    wsMessages.unshift(JSON.parse(message.data)); // TODO validation
  };
  return ws;
})();
</script>

<form onsubmit={() => { ws?.send(msg); msg = ""; }}>
  <div>
    <label for="msg">-> </label>
    <input type="text" id="msg" disabled={!ws} bind:value={msg} required />
  </div>
  <button type="submit">Send</button>
</form>
<div class="grid">
  {#each [...wsMessages, ...await data.messages] as message}
    <div>{message.content}</div>
  {/each}
</div>
