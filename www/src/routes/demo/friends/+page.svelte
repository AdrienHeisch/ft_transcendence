<script lang="ts">
import * as remote from "./friends.remote";

let friendToAdd = $state("");

const friends = $derived(await remote.getFriends());
const list = $derived(friends.filter(({ accepted }) => accepted == "yes"));
const invitations = $derived(
  friends.filter(({ accepted }) => accepted != "yes"),
);
</script>

<h1>Friends</h1>
<ul>
{#each list as friend}
    <li>
      {friend.id} <button onclick={async () => {
        await remote.removeFriend(friend);
        friendToAdd = "";
      }}>Remove</button>
    </li>
{/each}
</ul>
-----
<h1>Invitations</h1>
<ul>
{#each invitations as friend}
    <li>{friend.id}</li>
{/each}
</ul>
-----
<form>
  <div>
    <label for="id">Add friend ID: </label>
    <input class="border-2" type="text" id="id" bind:value={friendToAdd} required />
  </div>
  <button onclick={async () => {
    await remote.addFriend({ id: friendToAdd });
    friendToAdd = "";
  }}>Submit</button>
</form>
