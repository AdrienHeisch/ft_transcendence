<script lang="ts">
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import Post from "$lib/components/Post.svelte";
import PostForm from "$lib/components/PostForm.svelte";
import UserCard from "$lib/components/UserCard.svelte";
import { deletePet, updatePet } from "$lib/pets.remote";
import { getPosts } from "$lib/posts.remote";
import { getPetAvatar } from "$lib/storage";

const { data } = $props();

// TODO remove fake data
const pet = $derived({
  ...(await data.pet),
  coverImage:
    "https://lafermeducoudray.com/wp-content/uploads/2024/03/La-ferme-du-Coudray-Arnaud-Delaunay-2.jpg",
  adopted: true,
  photos: [
    "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
    "https://www.lozere-online.com/wp-content/uploads/2013/09/vache-race-aubrac.jpg",
    "https://cdn.canardware.com/2021/05/05044743/10327-vache-1200x627.jpg",
  ],
});
const owner = $derived(await data.owner);

const posts = $derived(await getPosts({ pet: pet.id }));

const isOwned = $derived(data.currentUser?.id === pet.ownerId);

let isEditMode = $state(false);
let avatarFiles = $state<FileList>();

let hasAvatar = $derived(pet.hasAvatar);
let removeAvatar = $derived(!hasAvatar && avatarFiles?.item(0) === undefined);

const avatarUrl = $derived.by(() => {
  const file = avatarFiles?.item(0);
  if (file && isEditMode) {
    return URL.createObjectURL(file);
  }
  return getPetAvatar({ id: pet.id, hasAvatar });
});
</script>

<svelte:head>
  <title>{pet.name}'s Profile</title>
</svelte:head>

<div class="min-h-screen relative bg-linear-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95">
  <!-- Cover Image -->
  <div class="relative h-80 bg-linear-to-r from-orange-700 via-orange-600 to-amber-600">
    <img
      src={pet.coverImage}
      alt="Couverture"
       class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/20"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
    <!-- Profile Header -->
    <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-orange-700">
      <form enctype="multipart/form-data" {...updatePet.enhance(async ({ submit }) => {
        await submit();
        await data.pet.refresh();
        isEditMode = false;
        // location.reload(); // TODO there might be a better way to reload all images on the page
      })} class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <input {...updatePet.fields.id.as("hidden", pet.id)} />

        <!-- Profile Picture -->
        <div class="relative">
          <img 
            src={avatarUrl} 
            alt={pet.name}
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
                onclick={() => hasAvatar = false}
                class={["absolute", "bottom-2", "left-2", "px-1", "border-3", "rounded-2xl", "bg-gray-300", "border-white"]}
              >
                🗑️
              </button>
            {/if}
            <label class="block">
              <input
                name="avatar"
                type="file"
                accept="image/*"
                autocomplete="off"
                class="hidden"
                bind:files={avatarFiles}
              />
              <div class={["absolute", "bottom-2", "right-2", "px-1", "border-3", "rounded-2xl", "bg-gray-300", "border-white"]}>📸</div>
            </label>
          {/if}
        </div>

        <!-- User Info -->
        <div class="flex-1 text-center md:text-left">
          {#if isEditMode}
            <div class="flex">
              <textarea
                class="text-3xl font-bold text-gray-900 border rounded bg-yellow-100 resize-none"
                rows=1
                {...updatePet.fields.name.as("text")}
              >{pet.name}</textarea>
            </div>
          {:else}
            <h1 class="text-3xl font-bold text-gray-900">{pet.name}</h1>
          {/if}
          <p class="text-lg text-gray-600">{pet.species}</p>
          {#if isEditMode}
            <textarea
              class="mt-2 text-gray-700 max-w-2xl border rounded bg-yellow-100 resize-none"
              rows=1
              {...updatePet.fields.bio.as("text")}
            >{pet.bio}</textarea>
          {:else}
            <p class="mt-2 text-gray-700 max-w-2xl">{pet.bio}</p>
          {/if}

          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{owner.city.name}</span>
            </div>
              <div class="flex items-center gap-1">
                🎂 {Math.floor((new Date().getTime() - pet.birth.getTime()) / 1000 / 3600 / 24 / 365)}
              </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          {#if isOwned}
            {#if isEditMode}
              <button type="submit" class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Save profile
              </button>
            {:else}
              <button type="button" onclick={async () => { await deletePet(pet.id); await goto(resolve(`/persons/${data.currentUser?.id}`)); }} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Delete
              </button>
              <button type="button" onclick={() => isEditMode = true} class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Edit profile
              </button>
            {/if}
          {/if}
        </div>
      </form>

      <!-- Stats -->
      <div class="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t-2 border-orange-700">
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
        <UserCard user={owner}/>
      </div>

      <!-- Right Content - Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#if isOwned && data.currentUser}
          <PostForm currentUser={data.currentUser} forcePet={pet} updates={[getPosts({ pet: pet.id })]} />
        {/if}

        {#if posts.length == 0}
          <div class="text-center py-12">
            <div class="text-6xl mb-4">💬</div>
            <h3 class="text-2xl font-bold text-[#8B4513] mb-2">Nothing to see here</h3>
            {#if isOwned}
              <p class="text-[#A0522D]">Create their first post !</p>
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
