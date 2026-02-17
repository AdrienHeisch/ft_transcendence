<script lang="ts">
import { resolve } from "$app/paths";
import type { City, User } from "$lib/server/db/schema";
import { getUserAvatar } from "$lib/storage";

interface Props {
  user: Omit<User, "city"> & { city: City };
}

const { user: _user }: Props = $props();

const user = $derived({
  ..._user,
  username: `${_user.firstName.charAt(0)}${_user.lastName}`,
  photo: getUserAvatar(_user),
  adoptedAnimals: _user.firstName.length % 3,
  age: ((20 * (_user.firstName.length + _user.lastName.length)) % 33) + 20,
});
</script>

<div
  class="bg-white rounded-2xl shadow-lg overflow-hidden border-3 border-orange-400"
>
  <!-- Profile picture -->
  <div class="relative bg-linear-to-br from-orange-200 to-yellow-200 p-6">
    <div class="flex justify-center">
      <div class="relative">
        <img 
          src={user.photo} 
          alt={user.firstName + ' ' + user.lastName}
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
        />
        {#if user.online}
          <div class={["bg-green-500", "absolute", "bottom-2", "right-2", "w-6", "h-6", "rounded-full", "border-4", "border-white"]}></div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Info -->
  <div class="p-5">
    <h3 class="text-2xl font-bold text-orange-900 mb-1" style="font-family: Georgia, serif;">
      {user.firstName} {user.lastName}
    </h3>
    <p class="text-orange-700 mb-2">@{user.username}</p>

    <div class="flex items-center gap-4 mb-3 text-sm text-orange-800">
      <div class="flex items-center gap-1">
        <span>📍</span>
        <span>{user.city.name}</span>
      </div>
      <div class="flex items-center gap-1">
        <span>🎂</span>
        <span>{user.age} years old</span>
      </div>
    </div>

    {#if user.adoptedAnimals > 0}
      <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
        <span>🐾</span>
        <span class="font-semibold">{user.adoptedAnimals} {user.adoptedAnimals > 1 ? "adopted pets" : "adopted pet"}</span>
      </div>
    {/if}

    <p class="text-sm text-gray-700 mb-4 line-clamp-2 italic">
      "{user.bio}"
    </p>

    <!-- Buttons -->
    <div class="flex gap-2">
      <a href="/persons/{user.id}" class="text-center flex-1 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
        👁️ View profile
      </a>
      <a href={resolve(`/messages/${user.id}`)} class="flex-1 py-2 bg-white border-2 border-orange-400 text-orange-900 rounded-lg font-bold hover:bg-orange-50 transition-colors text-center">
        💬 Message
      </a>
    </div>
  </div>
</div>
