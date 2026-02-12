<script lang="ts">
import { deleteAccount, updateCredentials } from "$lib/auth.remote";

type SectionName = "Profile" | "Account settings" | "Account actions";

const sections = [
  // {
  //   name: "Profile",
  //   icon: "👤",
  //   description: "Manage your personal information.",
  // },
  {
    name: "Account settings" satisfies SectionName as SectionName,
    icon: "🔒",
    description:
      "Manage your security settings, including your password and authentication factors.",
  },
  // { name: "Privacy", icon: "🔐", description: "Set your data sharing and privacy preferences." },
  {
    name: "Account actions" satisfies SectionName as SectionName,
    icon: "🔒",
    description: "Delete your account",
  },
];

let selectedSection = $state<SectionName>(sections[0].name);

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

<svelte:head>
  <title>Settings - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen bg-[#f5e6d3] flex">
  <!-- Sidebar -->
  <aside class="w-80 bg-linear-to-b from-[#fef7ed] to-[#f5e6d3] border-r-4 border-[#8B4513] p-6">
    <h2 class="text-3xl font-bold text-[#8B4513] mb-6">⚙️ Settings</h2>
    <div class="space-y-2">
      {#each sections as section}
        <button
          class="w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-semibold flex items-center gap-3 {selectedSection === section.name 
            ? 'bg-[#CC5500] text-white border-[#CC5500] shadow-lg' 
            : 'bg-white text-[#8B4513] border-[#8B4513] hover:bg-[#f5e6d3]'}"
          onclick={() => (selectedSection = section.name)}
        >
          <span class="text-xl">{section.icon}</span>
          <span>{section.name}</span>
        </button>
      {/each}
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#8B4513] mb-2">{selectedSection} Settings</h1>
      {#each sections as section (section.name)}
        {#if selectedSection === section.name}
          <p class="text-lg text-[#A0522D]">{section.description}</p>
        {/if}
      {/each}
    </div>

    <!-- Settings Panel -->
    <div class="bg-[#fef7ed] rounded-2xl shadow-xl p-8 border-4 border-[#8B4513] max-w-2xl">
      <h2 class="text-2xl font-bold text-[#8B4513] mb-6">{selectedSection}</h2>

      {#if selectedSection === "Profile"}
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Username
              <input 
                type="text" 
                placeholder="Modify your username..." 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Confirm Username
              <input 
                type="text" 
                placeholder="Verification of your new username..." 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <button 
            type="submit" 
            class="w-full py-3 bg-linear-to-r from-[#CC5500] to-[#A04000] text-white rounded-lg font-bold text-lg hover:from-[#DD6611] hover:to-[#B05011] transition-all shadow-lg hover:shadow-xl"
          >
            💾 Save Changes
          </button>
        </form>
      {/if}

      {#if selectedSection === "Account settings"}
        <form {...updateCredentials} class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Current Password
              <input 
                placeholder="Enter your current password..." 
                required 
                {...updateCredentials.fields.currentPassword.as("password")} 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Email
              <input 
                placeholder="Modify your email..." 
                bind:value={email} 
                {...updateCredentials.fields.email.as("email")} 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              New Password
              <input 
                placeholder="Enter your new password..." 
                bind:value={password} 
                {...updateCredentials.fields.password.as("password")} 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Confirm Password
              <input 
                placeholder="Confirm your new password..." 
                bind:value={confirmPassword} 
                bind:this={confirmPasswordField} 
                type="password"
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <button 
            type="submit" 
            class="w-full py-3 bg-linear-to-r from-[#CC5500] to-[#A04000] text-white rounded-lg font-bold text-lg hover:from-[#DD6611] hover:to-[#B05011] transition-all shadow-lg hover:shadow-xl"
          >
            💾 Save Changes
          </button>
        </form>
      {/if}

      {#if selectedSection === "Account actions"}
        <form {...deleteAccount}>
          <div>
            <label class="block text-sm font-bold text-[#8B4513] mb-2">
              Password
              <input 
                placeholder="Enter your current password..." 
                required 
                {...deleteAccount.fields.password.as("password")} 
                class="w-full px-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none bg-white text-[#8B4513] font-medium"
              />
            </label>
          </div>
          <button 
            type="submit" 
            class="w-full py-3 bg-linear-to-r from-[#CC5500] to-[#A04000] text-white rounded-lg font-bold text-lg hover:from-[#DD6611] hover:to-[#B05011] transition-all shadow-lg hover:shadow-xl"
          >
            Delete account
          </button>
        </form>
      {/if}
    </div>
  </main>
</div>
