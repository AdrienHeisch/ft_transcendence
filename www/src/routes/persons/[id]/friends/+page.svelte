<script lang="ts">
import { error } from "@sveltejs/kit";
import { replaceState } from "$app/navigation";
import { resolve } from "$app/paths";

const { data } = $props();

const [user] = $derived(await data.user);

$effect(() => {
  if (!user) error(404);
  if (data.currentUser?.id === user.id)
    replaceState(resolve("/persons/me/friends"), {});
});

const friends = $derived(await data.friends);
</script>

<h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center justify-between">
  <span class="flex items-center gap-2">
    <span class="text-2xl">👥</span>
    Friends
  </span>
</h2>
<div class="grid grid-cols-3 gap-2">
  {#each friends as friend (friend.id)}
    <div class="aspect-square rounded-lg overflow-hidden border-2 border-orange-700 hover:border-orange-900 transition-all duration-200 cursor-pointer">
      <a href={resolve(`/persons/${friend.id}`)}><img 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed={friend.firstName}" 
        alt="{friend.firstName} {friend.lastName}"
        title="{friend.firstName} {friend.lastName}"
        class="w-full h-full object-cover"
      /></a>
    </div>
  {/each}
</div>
