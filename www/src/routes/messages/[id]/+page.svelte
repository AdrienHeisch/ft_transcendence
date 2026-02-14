<script lang="ts">
import z from "zod";
import { browser, dev } from "$app/environment";
import { resolve } from "$app/paths";
import { getPerson } from "$lib/persons.remote";
import type { ChatMessage } from "$lib/server/db/schema.js";
import { getUserAvatar } from "$lib/storage";

const { data, params } = $props();

let msg = $state<string>("");
let wsMessages = $state<ChatMessage[]>([]);

let ws: WebSocket | undefined = (() => {
  if (!browser) return undefined;
  const ws = new WebSocket(`/ws/messages/${params.id}`);
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
      wsMessages.push(result.data);
      wsMessages.sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
    } else if (dev) {
      console.error(result.error);
    }
  };
  return ws;
})();

const friend = $derived(await getPerson(params.id));
const allMessages = $derived([...wsMessages, ...(await data.messages)]);
</script>

<svelte:head>
  <title>Chat with {friend?.firstName} - Bibi's Farm</title>
</svelte:head>

<div class="h-screen bg-[#f5e6d3] flex flex-col">
  <!-- Header -->
  <div class="bg-linear-to-r from-[#CC5500] to-[#A04000] shadow-lg shrink-0">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center gap-4">
        <!-- Back button -->
        <a 
          aria-label="Back"
          href={resolve("/messages")}
          class="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
        </a>

        {#if friend}
          <!-- Friend info -->
          <div class="flex items-center gap-3 flex-1">
            <div class="relative">
              <img 
                src={getUserAvatar(friend)} 
                alt={friend.firstName}
                class="w-12 h-12 rounded-full border-2 border-white bg-white object-cover"
              />
              {#if friend.online}
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              {/if}
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">
                {friend.firstName} {friend.lastName}
              </h1>
              <p class="text-sm text-white/80">
                {friend.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <!-- Profile button -->
          <a 
            href={resolve(`/persons/${friend.id}`)}
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors"
          >
            View Profile
          </a>
        {/if}
      </div>
    </div>
  </div>

  <!-- Messages container -->
  <div class="flex-1 overflow-hidden">
    <div class="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-[#fef7ed] rounded-2xl shadow-xl border-4 border-[#8B4513] h-full flex flex-col">
        <!-- Messages area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col-reverse">
          {#if allMessages.length === 0}
            <div class="text-center py-12">
              <div class="text-6xl mb-4">💬</div>
              <h3 class="text-2xl font-bold text-[#8B4513] mb-2">No messages yet</h3>
              <p class="text-[#A0522D]">Start the conversation!</p>
            </div>
          {:else}
            {#each allMessages as message}
              {@const isOwn = message.author === data.currentUser?.id}
              <div class="flex {isOwn ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[70%] {isOwn ? 'bg-[#CC5500] text-white' : 'bg-white border-2 border-[#8B4513] text-[#8B4513]'} rounded-2xl px-4 py-3 shadow-md">
                  <p class="wrap-break-words">{message.content}</p>
                  <p class="text-xs mt-1 {isOwn ? 'text-white/70' : 'text-[#A0522D]'}">
                    {new Date(message.sentAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            {/each}
          {/if}
        </div>

        <!-- Input area -->
        <div class="border-t-2 border-[#8B4513] p-4 shrink-0">
          <form 
            onsubmit={(e) => { 
              e.preventDefault();
              if (msg.trim()) {
                ws?.send(msg); 
                msg = "";
              }
            }}
            class="flex gap-3"
          >
            <input
              type="text"
              id="msg"
              disabled={!ws}
              bind:value={msg}
              placeholder="Type your message..."
              required
              class="flex-1 px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button 
              type="submit"
              disabled={!ws || !msg.trim()}
              class="px-6 py-3 bg-linear-to-r from-[#CC5500] to-[#A04000] text-white rounded-lg font-bold hover:from-[#DD6611] hover:to-[#B05011] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send 📤
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
