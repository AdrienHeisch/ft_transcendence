<script lang="ts">
import { resolve } from "$app/paths";
import Post from "$lib/components/Post.svelte";
import { getPetsCount } from "$lib/associations.remote";
import { getPosts } from "$lib/posts.remote";
import { getUser } from "$lib/user.remote";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

const _association = $derived(await data.association);

// TODO remove fake data
const association = $derived({
  ..._association,
  logo: "🐄",
  coverImage:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=400&fit=crop",
  website: "www.fermeheureuse.fr",
});

const email = $derived((await getUser(association.id))?.email);
const animalsCount = $derived(await getPetsCount(association.id));

// Use real posts from the database
const posts = $derived(await getPosts({ author: association.id }));

const stats = [
  { icon: "🐾", value: animalsCount.toString(), label: "Animals" },
  { icon: "📅", value: association.foundedAt.toString(), label: "Founded" },
];
</script>

<svelte:head>
  <title>{association.name} - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen relative">
  <!-- Background -->
  <div class="fixed inset-0 -z-10">
    <img 
      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop" 
      alt="Farm" 
      class="w-full h-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95"></div>
  </div>

  <!-- Cover Image -->
  <div class="relative h-80 bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600">
    <img 
      src={association.coverImage} 
      alt="Cover" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
    <!-- Profile Header -->
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-orange-700">
      <div class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <!-- Logo -->
        <div class="relative">
          <div class="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-8xl">
            {association.logo}
          </div>
          <div class="absolute bottom-2 right-2 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
            {association.type}
          </div>
        </div>

        <!-- Association Info -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900" style="font-family: Georgia, serif;">{association.name}</h1>
          <p class="mt-2 text-gray-700 max-w-2xl">{association.description}</p>

          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <span>📍</span>
              <span>{association.city.name}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>📧</span>
              <span>{email}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>📞</span>
              <span>{association.phone}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>🌐</span>
              <span>{association.website}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <a 
            href={resolve(`/messages/${association.id}`)}
            class="px-6 py-3 bg-yellow-50 border-2 border-orange-700 text-amber-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>💬</span>
            <span>Contact</span>
          </a>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t-2 border-orange-700">
        {#each stats as stat}
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-700">{stat.value}</div>
            <div class="text-sm text-amber-900 flex items-center gap-1">
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-8">
      <!-- Left Sidebar - About -->
      <div class="lg:col-span-1 space-y-6">
        <!-- About Card -->
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <span class="text-2xl">ℹ️</span>
            About
          </h2>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <span class="text-xl">🏛️</span>
              <div>
                <div class="font-semibold text-gray-700">Type</div>
                <div class="text-gray-600">{association.type}</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-xl">📅</span>
              <div>
                <div class="font-semibold text-gray-700">Founded</div>
                <div class="text-gray-600">{association.foundedAt}</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-xl">🐾</span>
              <div>
                <div class="font-semibold text-gray-700">Animals</div>
                <div class="text-gray-600">{animalsCount} animals currently in care</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#each posts as post (post.id)}
          <Post {post} currentUser={data.currentUser ?? undefined} />
        {/each}

        {#if posts.length === 0}
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-12 border-4 border-orange-700 text-center">
            <div class="text-6xl mb-4">📝</div>
            <h3 class="text-2xl font-bold text-orange-900 mb-2">No posts yet</h3>
            <p class="text-gray-700">This association hasn't shared anything yet.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
