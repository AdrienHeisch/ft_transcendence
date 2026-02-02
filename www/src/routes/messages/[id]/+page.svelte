<script lang="ts">
import z from "zod";
import { browser } from "$app/environment";
import type { ChatMessage } from "$lib/server/db/schema.js";

const { data, params } = $props();

let msg = $state<string>("");
let wsMessages = $state<ChatMessage[]>([]);

let ws: WebSocket | undefined = (() => {
  if (!browser) return undefined;
  const ws = new WebSocket(`/ws/${params.id}`);
  const messageSchema = z.object({
    id: z.string(),
    friendsId: z.string(),
    author: z.string(),
    content: z.string(),
    sentAt: z.coerce.date(),
  }); // TODO drizzle-zod
  ws.onmessage = (message) => {
    const result = messageSchema.safeParse(JSON.parse(message.data));
    if (result.success) {
      wsMessages.unshift(result.data);
    }
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
