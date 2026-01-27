<script lang="ts">
import * as remote from "$lib/friends.remote";

let friendToAdd = $state("");

const friends = $derived(await remote.getFriends());
const list = $derived(
  friends.flatMap(({ user, pending }) => {
    if (pending === null) {
      return user;
    }
    return [];
  }),
);
const invitations = $derived(
  friends.flatMap(({ user, pending }) => {
    if (pending !== null && pending === user.id) {
      return user;
    }
    return [];
  }),
);
const inbox = $derived(
  friends.flatMap(({ user, pending }) => {
    if (pending !== null && pending !== user.id) {
      return user;
    }
    return [];
  }),
);
</script>

<h1>Friends</h1>
<ul>
{#each list as friend}
    <li>
      <span>{friend.firstName} {friend.lastName} ({friend.id})</span>
      <button class="border" onclick={async () => {
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
  <li>
    <span>{friend.firstName} {friend.lastName} ({friend.id})</span>
    <button class="border" onclick={async () => {
      await remote.removeFriend(friend);
      friendToAdd = "";
    }}>Cancel</button>
  </li>
{/each}
</ul>
-----
<h1>Invitations inbox</h1>
<ul>
{#each inbox as friend}
  <li>
    <span>{friend.firstName} {friend.lastName} ({friend.id})</span>
    <button class="border" onclick={async () => {
      await remote.acceptFriend(friend);
      friendToAdd = "";
    }}>Accept</button>
    <button class="border" onclick={async () => {
      await remote.removeFriend(friend);
      friendToAdd = "";
    }}>Refuse</button>
  </li>
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
