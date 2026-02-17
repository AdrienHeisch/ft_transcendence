<script lang="ts">
import { resolve } from "$app/paths";
import Post from "$lib/components/Post.svelte";
import PostForm from "$lib/components/PostForm.svelte";
import {
  acceptFriend,
  addFriend,
  getFriends,
  getUserFriends,
  removeFriend,
} from "$lib/friends.remote";
import { updatePerson } from "$lib/persons.remote";
import { getPets } from "$lib/pets.remote";
import { getPosts } from "$lib/posts.remote";
import { getUserAvatar } from "$lib/storage";

const { data } = $props();

const _user = $derived(await data.user);

const user = $derived({
  ..._user,
  coverImage:
    "https://lafermeducoudray.com/wp-content/uploads/2024/03/La-ferme-du-Coudray-Arnaud-Delaunay-2.jpg",
  username: _user.firstName.charAt(0) + _user.lastName,
  joinedDate: "January 2025",
});

const posts = $derived(await getPosts({ author: _user.id }));
const friends = $derived(await getUserFriends(_user.id));
const pets = $derived(
  getPets({
    owner: _user.id,
    search: "",
    sortBy: "name",
  }),
);

const isCurrentUser = $derived(data.currentUser?.id === user.id);

let isEditMode = $state(false);
let avatarFiles = $state<FileList>();

let hasAvatar = $derived(user.hasAvatar);
let removeAvatar = $derived(!hasAvatar && avatarFiles?.item(0) === undefined);

const avatarUrl = $derived.by(() => {
  const file = avatarFiles?.item(0);
  if (file && isEditMode) {
    return URL.createObjectURL(file);
  }
  return getUserAvatar({ id: user.id, hasAvatar });
});
</script>

<div class="min-h-screen relative bg-linear-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95">
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
      <form enctype="multipart/form-data" {...updatePerson.enhance(async ({ submit }) => {
        await submit();
        await data.user.refresh();
        isEditMode = false;
        // location.reload(); // TODO there might be a better way to reload all images on the page
      })} class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <input {...updatePerson.fields.id.as("hidden", user.id)} />

        <!-- Profile Picture -->
        <div class="relative">
          <img 
            src={avatarUrl} 
            alt={user.username}
            class="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white"
          />
          {#if isEditMode}
            <input
              name="removeAvatar"
              type="hidden"
              bind:value={removeAvatar}
            />
            {#if hasAvatar}
              <button
                type="button"
                onclick={() => { console.log("haha"); hasAvatar = false; }}
                class={["absolute", "bottom-2", "left-2", "px-1", "border-3", "rounded-2xl", "bg-gray-300", "border-white"]}
              >
                🗑️
              </button>
            {/if}
            <label class="block">
              <input
                name="avatar"
                type="file"
                accept="image/png"
                autocomplete="off"
                class="hidden"
                bind:files={avatarFiles}
              />
              <div class={["absolute", "bottom-2", "right-2", "px-1", "border-3", "rounded-2xl", "bg-gray-300", "border-white"]}>📸</div>
            </label>
          {:else}
            <div class={[user.online ? "bg-green-500" : "bg-gray-300", "absolute", "bottom-2", "right-2", "w-6", "h-6", "rounded-full", "border-4", "border-white"]}></div>
          {/if}
        </div>

        <!-- User Info -->
        <div class="flex-1 text-center md:text-left">
          {#if isEditMode}
            <div class="flex">
              <textarea
                class="text-3xl font-bold text-gray-900 border rounded bg-yellow-100 resize-none"
                rows=1
                {...updatePerson.fields.firstName.as("text")}
              >{user.firstName}</textarea>
              <textarea
                class="text-3xl font-bold text-gray-900 border rounded bg-yellow-100 resize-none"
                rows=1
                {...updatePerson.fields.lastName.as("text")}
              >{user.lastName}</textarea>
            </div>
          {:else}
            <h1 class="text-3xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
          {/if}
          <p class="text-lg text-gray-600">@{user.username}</p>
          {#if isEditMode}
            <textarea
              class="mt-2 text-gray-700 max-w-2xl border rounded bg-yellow-100 resize-none"
              rows=1
              {...updatePerson.fields.bio.as("text")}
            >{user.bio}</textarea>
          {:else}
            <p class="mt-2 text-gray-700 max-w-2xl">{user.bio}</p>
          {/if}

          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {#if isEditMode}
                  <select
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
                    {...updatePerson.fields.city.as("select")}
                  >
                    {#each await data.cities as city}
                    {#if city.code === user.city.code}
                      <option selected value={city.code}>{city.name}</option>
                    {:else}
                      <option value={city.code}>{city.name}</option>
                    {/if}
                    {/each}
                  </select>
                {:else}
                  <span>{user.city.name}</span>
                {/if}
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
            {#if isEditMode}
              <button type="submit" class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Save profile
              </button>
            {:else}
              <button type="button" onclick={() => isEditMode = true} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Edit profile
              </button>
            {/if}
          {:else if data.currentUser}
            {@const friend = (await getFriends()).find((friend) => user.id === friend.id)}
            {#if friend}
              {#if friend.status == "received"}
                <button onclick={() => acceptFriend(user.id)} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Accept invitation
                </button>
              {:else if friend.status}
                <button onclick={() => removeFriend(user.id)} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {#if friend.status == "sent"}
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
            <a href={resolve(`/messages/${user.id}`)} class="px-6 py-3 bg-yellow-50 border-2 border-orange-700 text-amber-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 shadow-md hover:shadow-lg">
              Message
            </a>
          {/if}
        </div>
      </form>

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
      <!-- Left Sidebar -->
      <div class="lg:col-span-1 space-y-6">
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
            {#each friends.filter(friend => friend.status === "friends") as friend (friend.id)}
              <div class="aspect-square rounded-lg overflow-hidden border-2 border-orange-700 hover:border-orange-900 transition-all duration-200 cursor-pointer">
                <a href={resolve(`/persons/${friend.id}`)}><img 
                  src={getUserAvatar(friend)}
                  alt="{friend.firstName} {friend.lastName}"
                  title="{friend.firstName} {friend.lastName}"
                  class="w-full h-full object-cover"
                /></a>
              </div>
            {/each}
          </div>
        </div>

        <!-- Animals Card -->
        <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center justify-between">
            <span class="flex items-center gap-2">
              <span class="text-2xl">🐾</span>
              Animals
            </span>
            {#if isCurrentUser}
              <div class="flex gap-2">
                <a href={resolve("/new-pet")} aria-label="Add new animal" class="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 font-medium transition-colors">
                  + <!-- TODO pet profile creation -->
                </a>
              </div>
            {:else}
              <span class="text-sm text-orange-700 font-medium">{(await pets).length} animals</span>
            {/if}
          </h2>
          <div class="grid grid-cols-2 gap-3">
            {#each await pets as pet (pet.id)}
              <a href={resolve(`/pets/${pet.id}`)} class="p-3 bg-yellow-100 rounded-lg border-2 border-orange-700 hover:bg-orange-100 transition-all duration-200">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-2xl">{pet.species === 'Cow' ? '🐄' : pet.species === 'Chicken' ? '🐔' : pet.species === 'Pig' ? '🐷' : pet.species === 'Sheep' ? '🐑' : pet.species === 'Goat' ? '🐐' : pet.species === 'Horse' ? '🐴' : pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐈' : pet.species === 'Fish' ? '🐟' : '🐾'}</span>
                  <span class="font-bold text-gray-900">{pet.name}</span>
                </div>
                <div class="text-xs text-gray-600">{pet.species} • {pet.breed}</div>
              </a>
            {/each}
            {#if (await pets).length == 0}
              <div class="col-span-2 text-center py-4 text-gray-600">
                {#if isCurrentUser}
                  No animals yet. Add your first one!
                {:else}
                  No animals registered
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Right Content - Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#if isCurrentUser && data.currentUser}
          <PostForm currentUser={data.currentUser} updates={[getPosts({ author: user.id })]} />
        {/if}

        {#if posts.length == 0}
          <div class="text-center py-12">
            <div class="text-6xl mb-4">💬</div>
            <h3 class="text-2xl font-bold text-[#8B4513] mb-2">Nothing to see here</h3>
            {#if isCurrentUser}
              <p class="text-[#A0522D]">Create your first post !</p>
            {/if}
          </div>
        {/if}

        {#each posts as post (post.id)}
          <Post {post} currentUser={data.currentUser} />
        {/each}

        <!-- Load More -->
        <button class="w-full py-4 bg-yellow-50 backdrop-blur-sm rounded-2xl shadow-lg border-4 border-orange-700 text-amber-900 font-bold hover:bg-orange-100 hover:border-orange-900 transition-all duration-200">
          View more posts
        </button>
      </div>
    </div>
  </div>
</div>
