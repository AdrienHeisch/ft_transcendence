<script lang="ts">
import { error } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import Post from "$lib/components/Post.svelte";
import {
  acceptFriend,
  addFriend,
  getFriends,
  removeFriend,
} from "$lib/friends.remote.js";
import { getUserAvatar } from "$lib/storage/index.js";

const { data } = $props();

const [_user] = $derived(await data.user);

$effect(() => {
  if (!_user) error(404);
});

// TODO remove fake data
const user = $derived({
  ..._user,
  coverImage:
    "https://lafermeducoudray.com/wp-content/uploads/2024/03/La-ferme-du-Coudray-Arnaud-Delaunay-2.jpg",
  username: _user.firstName.charAt(0) + _user.lastName,
  location: "Paris, France",
  joinedDate: "January 2025",
  passions: [
    { icon: "🐾", name: "Animals" },
    { icon: "🐔", name: "Chickens" },
    { icon: "🚜", name: "Farm" },
    { icon: "🍽️", name: "Gastronomy" },
    { icon: "🧠", name: "Philosophy" },
    { icon: "📚", name: "Reading" },
  ],
});

const posts = $derived(await data.posts);
const friends = $derived(await data.friends);

const isCurrentUser = $derived(data.currentUser?.id === user.id);
</script>

<div class="min-h-screen relative">
  <!-- Background Image de ferme -->
  <div class="fixed inset-0">
    <img 
      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop" 
      alt="Ferme" 
      class="w-full h-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-linear-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95"></div>
  </div>

  <!-- Cover Image -->
  <div class="relative h-80 bg-linear-to-r from-orange-700 via-orange-600 to-amber-600">
    <img
      src={user.coverImage}
      alt="Couverture"
       class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/20"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
    <!-- Profile Header -->
    <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-orange-700">
      <div class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <!-- Profile Picture -->
        <div class="relative">
          <img 
            src={getUserAvatar(user)} 
            alt={user.username}
            class="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white"
          />
          <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
        </div>

        <!-- User Info -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
          <p class="text-lg text-gray-600">@{user.username}</p>
          <p class="mt-2 text-gray-700 max-w-2xl">{user.bio}</p>
          
          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{user.location}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Member since {user.joinedDate}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          {#if isCurrentUser}
            <button class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Edit profile
            </button>
          {:else}
            {@const friend = (await getFriends()).find((friend) => user.id === friend.user.id)}
            {#if friend}
              {#if friend.pending == data.currentUser?.id}
                <button onclick={() => acceptFriend(user.id)} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Accept invitation
                </button>
              {:else}
                <button onclick={() => removeFriend(user.id)} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {#if friend.pending == user.id}
                    Invitation sent
                  {:else}
                    Friends
                  {/if}
                </button>
              {/if}
            {:else}
              <button onclick={() => addFriend(user.id)} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Add friend
              </button>
            {/if}
            <button class="px-6 py-3 bg-yellow-50 border-2 border-orange-700 text-amber-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 shadow-md hover:shadow-lg">
              Message
            </button>
          {/if}
        </div>
      </div>

      <!-- Stats -->
      <div class="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t-2 border-orange-700">
        <a href={resolve(`/persons/${user.id}/friends`)} class="text-center">
          <div class="text-2xl font-bold text-orange-700">{friends.length}</div>
          <div class="text-sm text-amber-900">Friends</div>
        </a>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-700">{posts.length}</div>
          <div class="text-sm text-amber-900">Posts</div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-8">
      <!-- Left Sidebar - Passions -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Passions Card -->
        <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <span class="text-2xl">🌾</span>
            Passions
          </h2>
          <div class="grid grid-cols-2 gap-3">
            {#each user.passions as passion}
              <div class="flex items-center gap-2 p-3 bg-yellow-100 rounded-lg hover:bg-orange-100 transition-all duration-200 cursor-pointer border-2 border-orange-700">
                <span class="text-2xl">{passion.icon}</span>
                <span class="text-sm font-medium text-gray-700">{passion.name}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Friends Preview Card -->
        <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center justify-between">
            <span class="flex items-center gap-2">
              <span class="text-2xl">👥</span>
              Friends
            </span>
            <a href={resolve(`/persons/${user.id}/friends`)} class="text-sm text-orange-700 hover:text-orange-800 font-medium">View all</a>
          </h2>
          <div class="grid grid-cols-3 gap-2">
            {#each friends as friend (friend.id)}
              <div class="aspect-square rounded-lg overflow-hidden border-2 border-orange-700 hover:border-orange-900 transition-all duration-200 cursor-pointer">
                <a href={resolve(`/persons/${friend.id}`)}><img 
                  src="{getUserAvatar(friend)}" 
                  alt="{friend.firstName} {friend.lastName}"
                  title="{friend.firstName} {friend.lastName}"
                  class="w-full h-full object-cover"
                /></a>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Content - Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#each posts as post (post.id)}
          <Post {post} />
        {/each}

        <!-- Load More -->
        <button class="w-full py-4 bg-yellow-50 backdrop-blur-sm rounded-2xl shadow-lg border-4 border-orange-700 text-amber-900 font-bold hover:bg-orange-100 hover:border-orange-900 transition-all duration-200">
          View more posts
        </button>
      </div>
    </div>
  </div>
</div>
