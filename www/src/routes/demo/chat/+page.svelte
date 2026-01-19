<script lang="ts">
const { data } = $props();
</script>

<ul>
{#each await data.chats as chat}
    <li><a href="./chat/{chat.id}">{chat.id}</a></li>
{/each}
</ul>
