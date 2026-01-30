<script lang="ts">
import { fly } from "svelte/transition";
import favicon from "$lib/assets/favicon.svg";
import "../app.css";
import { afterNavigate } from "$app/navigation";
import { resolve } from "$app/paths";
import * as auth from "$lib/auth.remote";

const { children, data } = $props();

let sidebarOpen = $state(false);
let messagesOpen = $state(false);

afterNavigate(() => (sidebarOpen = false));

const sidebarMainItems = $derived(
  [
    { label: "Home", icon: "🏠", href: "/" },
    data.currentUser
      ? {
          label: "Profile",
          icon: "👤",
          href: `/persons/${data.currentUser.id}`,
        }
      : undefined,
    // { label: "Groups", icon: "👥" },
    // { label: "Favorites", icon: "⭐" },
    // { label: "Photos", icon: "📷" },
    // { label: "News feed", icon: "📰" },
    data.currentUser
      ? {
          label: "Friends",
          icon: "🤝",
          href: `/persons/${data.currentUser.id}/friends`,
        }
      : undefined,
    // { label: "Adopt", icon: "🐾" },
    { label: "Pets", icon: "🐕", href: "/pets" },
    { label: "Search People", icon: "🔍", href: "/persons" },
    // { label: "Pet sitter", icon: "🐕" },
  ].filter((item) => !!item),
);

const sidebarBottomItems = [
  { label: "Help & Support", icon: "❓", href: "/" }, // TODO href
  { label: "Settings", icon: "⚙️", href: resolve("/settings") },
];
</script>

<svelte:head>
  <link class="bg-amber-50" rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Header avec bouton home et messages -->
  <header class="sticky flex-initial top-0 z-10 bg-linear-to-r from-orange-600 to-orange-700 text-white shadow-lg">
    <div class="flex items-center justify-between px-6 py-3">
      <!-- Bouton pour ouvrir la sidebar quand elle est fermée -->
      <button
        onclick={() => sidebarOpen = !sidebarOpen}
        class="bg-linear-to-r from-orange-500 to-orange-700 px-2 py-2 rounded hover:from-orange-100 hover:to-orange-200 transition shadow-lg}"
        style="writing-mode: vertical-rl"
        aria-label="sidebar-open"
      >
        <svg class="w-4 h-4">
          <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
        </svg>
      </button>

      <a href={resolve("/")} class="flex items-center gap-3">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐄%3C/text%3E%3C/svg%3E" alt="Logo" class="w-10 h-10" />
        <div>
          <h1 class="text-3xl font-bold text-yellow-100" style="font-family: Georgia, serif;">Bibi's Farm</h1>
          <p class="text-sm text-yellow-200 italic" style="font-family: Georgia, serif;">Since 1887</p>
        </div>
      </a>

      {#if data.currentUser}
        <button
          onclick={() => (messagesOpen = !messagesOpen)}
          class="relative flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
        >
          <span class="text-xl">💬</span>
          <span>Messages</span>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
        </button>
      {:else}
        <a
          href={resolve("/login")}
          class="relative flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
        >
          <span class="text-xl">👤</span>
          <span>Login</span>
        </a>
      {/if}
    </div>
  </header>

  <!-- Panel de messages -->
  {#if messagesOpen}
    <div class="fixed top-16 right-6 w-96 bg-orange-50 rounded-lg shadow-2xl border-4 border-orange-600 z-20">
      <div class="bg-linear-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-t flex items-center justify-between">
        <h2 class="font-bold text-lg">Direct Messages</h2>
        <button onclick={() => (messagesOpen = false)} class="text-2xl hover:text-orange-200 transition">&times;</button>
      </div>
      <div class="p-4 max-h-96 overflow-y-auto">
        <div class="space-y-2">
          <div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">A</div>
              <div class="flex-1">
                <div class="font-semibold text-orange-900">Alice</div>
                <div class="text-sm text-gray-700">Ready for the cow party?</div>
              </div>
              <span class="text-xs text-orange-600 font-medium">2m</span>
            </div>
          </div>
          <div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">B</div>
              <div class="flex-1">
                <div class="font-semibold text-orange-900">Bob</div>
                <div class="text-sm text-gray-700">Hi Frank, how's your cow doing?</div>
              </div>
              <span class="text-xs text-orange-600 font-medium">15m</span>
            </div>
          </div>
          <div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">C</div>
              <div class="flex-1">
                <div class="font-semibold text-orange-900">Charlie</div>
                <div class="text-sm text-gray-700">Tell me, would you happen to have a chicken?</div>
              </div>
              <span class="text-xs text-orange-600 font-medium">1h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Sidebar -->
  {#if sidebarOpen}
    <aside transition:fly={{x:-50, y:0, delay:0, duration:100}} class="z-30 fixed top-0 bottom-0 overflow-scroll w-72 bg-linear-to-b from-orange-50 to-yellow-50 shadow-xl border-r-4 border-orange-600 flex flex-col">
      <div class="p-4 flex-1">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-orange-900">Menu</h2>
          <button
            onclick={() => (sidebarOpen = false)}
            class="text-2xl text-orange-700 hover:text-orange-900 transition"
          >
            &times;
          </button>
        </div>

        <nav class="space-y-2">
          {#each sidebarMainItems as item}
            <a
              href={item.href}
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-orange-100 transition shadow-md border-2 border-orange-300 font-semibold text-orange-900 flex items-center gap-3"
            >
              <span class="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          {/each}
        </nav>
      </div>

      <!-- Bottom section -->
      <div class="p-4 border-t-2 border-orange-300">
        <nav class="space-y-2">
          {#each sidebarBottomItems as item}
            <a
              href={item.href}
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-orange-100 transition shadow-md border-2 border-orange-300 font-semibold text-orange-900 flex items-center gap-3"
            >
              <span class="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          {/each}
            <button
              onclick={() => auth.logout().then(() => location.reload()).catch((e) => console.log(e))}
              class="cursor-pointer w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-orange-100 transition shadow-md border-2 border-orange-300 font-semibold text-orange-900 flex items-center gap-3"
            >
              <span class="text-xl">🚪</span>
              <span>Logout</span>
            </button>
        </nav>
      </div>
    </aside>
  {/if}

  <div class="flex-auto flex flex-col *:flex-auto">
    {@render children()}
  </div>
</div>
