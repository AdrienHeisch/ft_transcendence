<script lang="ts">
import { updateCredentials } from "$lib/auth.remote";

const sections = [
  // {
  //   name: "Profile",
  //   icon: "👤",
  //   description: "Manage your personal information.",
  // },
  {
    name: "Account",
    icon: "🔒",
    description:
      "Manage your security settings, including your password and authentication factors.",
  },
  // { name: "Privacy", icon: "🔐", description: "Set your data sharing and privacy preferences." },
];

let selectedSection = $state(sections[0].name);

let email = $state<string>();
let password = $state<string>("");
let confirmPassword = $state<string>("");
let confirmPasswordField = $state<HTMLInputElement>();

$effect(() =>
  confirmPasswordField?.setCustomValidity(
    password == confirmPassword ? "" : "Passwords do not match",
  ),
);
</script>

<div class="settings-container">
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2>Settings</h2>
    {#each sections as section}
      <button
        class="w-full sidebar-item {selectedSection === section.name ? 'active' : ''}"
        onclick={() => (selectedSection = section.name)}
      >
        <span>{section.icon}</span> {section.name}
      </button>
    {/each}
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <div class="main-header">
      <h1>{selectedSection} Settings</h1>
      {#each sections as section (section.name)}
        {#if selectedSection === section.name}
          <p>{section.description}</p>
        {/if}
      {/each}
    </div>

    <div class="settings-panel">
      <h2>{selectedSection}</h2>

      {#if selectedSection === "Profile"}
        <form>
          <div>
            <label>
              Username
              <input type="text" placeholder="Modify your username..." />
            </label>
          </div>
          <div>
            <label>
              Username
              <input type="text" placeholder="Verification of your new username..." />
            </label>
          </div>
          <button type="submit" class="save-button">
            Save
          </button>
        </form>
      {/if}

      {#if selectedSection === "Account"}
        <form {...updateCredentials}>
          <div>
            <label>
              Current password
              <input placeholder="Enter your password..." required {...updateCredentials.fields.currentPassword.as("password")} />
            </label>
          </div>
          <div>
            <label>
              Email
              <input placeholder="Modify your email..." bind:value={email} {...updateCredentials.fields.email.as("email")} />
            </label>
          </div>
          <div>
            <label>
              New password
              <input placeholder="Enter your password..." bind:value={password} {...updateCredentials.fields.password.as("password")} />
            </label>
          </div>
          <div>
            <label>
              Confirm password
              <input placeholder="Enter your new password..." bind:value={confirmPassword} bind:this={confirmPasswordField} type="password" />
            </label>
          </div>
          <button type="submit" class="save-button">
            Save
          </button>
        </form>
      {/if}
    </div>
  </main>
</div>

<style>
:global(html) {
  font-family: 'Georgia', serif;
}

.settings-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff7e6, #ffebc9); 
  color: #7a5835; 
}

.sidebar {
  width: 280px;
  background: linear-gradient(to bottom, #fbe6c2, #d9b284);
  border-right: 4px solid #a86f3a;
  padding: 1.5rem;
}

.sidebar h2 {
  font-size: 1.5rem;
  color: #7a5835;
  margin-bottom: 1.5rem;
}

.sidebar-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}

.sidebar-item span {
  font-size: 1.3rem;
  margin-right: 0.75rem;
}

.sidebar-item:hover,
.sidebar-item.active {
  background: #fcd8a9;
  border-color: #a86f3a;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
}

.main-header {
  margin-bottom: 2rem;
}

.main-header h1 {
  font-size: 2rem;
  color: #7a5835;
}

.main-header p {
  font-size: 1rem;
  color: #a86f3a;
}

.settings-panel {
  background: #fffaf0;
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #dfb991;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.settings-panel:hover {
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.15);
}

.settings-panel h2 {
  font-size: 1.5rem;
  color: #7a5835;
  margin-bottom: 1rem;
}

form div label {
  display: block;
  font-size: 1rem;
  color: #a86f3a;
  font-weight: bold;
  margin-top: 0.5rem;
}

form div label input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #dcb98d;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

form div label input:focus {
  border-color: #a86f3a;
}

.save-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(to right, #c68642, #a86f3a);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-block;
  transition: background-color 0.3s;
}

.save-button:hover {
  background: linear-gradient(to right, #a86f3a, #7d4c2a);
}
</style>
