<script lang="ts">
import { resolve } from "$app/paths";
import { getPerson } from "$lib/persons.remote";

const { data } = $props();
</script>

<ul>
{#each await data.chats as chat}
  {@const friend = await getPerson(data.currentUser?.id === chat.left ? chat.right : chat.left)}
  {#if friend && !chat.pending}
    <li><a href={resolve(`/messages/${chat.id}`)}>{friend.firstName} {friend.lastName}</a></li>
  {/if}
{/each}
</ul>
