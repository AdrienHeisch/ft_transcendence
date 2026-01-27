<script>
	let selectedSection = "Profile";
	const sections = [ { name: "Profile", icon: "👤" }, 
	{ name: "Account Settings", icon: "🔒"},
	//{ name: "Notifications", icon: "🔔"},
	{ name: "Privacy", icon: "🛡"},];

</script>

<style>
	.settings-container { display: flex; min-height: 100vh; font-family: 'Georgia', serif; background: linear-gradient(to bottom, #fbe9c6, #fcdfb1);}
	.sidebar { width: 260px; background: linear-gradient(to bottom, #f5e6d3, #d9b284);}
	.sidebar-item { display: flex; align-items: center; padding: 1rem; margin-bottom: 1rem; border-radius: 6px; cursor: pointer; font-size: 1.1rem; background: #F9EFE1; border: 2px solid transparent; transition: all 0.3s;}
	.sidebar-item:hover { background: #EBD3A4; border-color: #C68642;}
	.sidebar-item.active { background: #DFBC8F; border-color: #A86F3A;}
	.sidebar-item span { margin-right: 1rem; font-size: 1.5rem;}
	.main-content { flex-grow: 1; padding: 2rem;}
	.content-header { font-size: 2rem; margin-bottom: 1.5rem; color: #7a5835; font-weight: bold;}

	.form-group { margin-bottom: 1.5rem;}
	.form-group label { display: block; font-weight: bold; color: #a86f3a; margin-bottom: 0.5rem;}
	.form-group input,
	.form-group textarea { width: 100%; padding: 0.75rem; border: 2px solid #d9b284; border-radius: 6px; font-family: inherit; transition: border-color 0.2s;}
	.form-group input:focus { border-color: #a86f3a; outline: none;}

	button {
		display: inline-block;
		background: linear-gradient(to right, #C68642, #a86f3a);
		border: none;
		color: #fff;
		padding: 0.75rem, 1.5rem;
		font-size: 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.3s;}
	
	button:hover { background: linear-gradient(to right, #a86f3a, #7d4c2a);}
</style>

<div class="setting-container">
	<!-- sidebar -->
	<aside class="sidebar">
		{#each sections as section }
		<div 
			class="sidebar-item { selectedSection === section.name ? 'active' : ''}"
			on:click={() => (selectedSection = section.name)}
		>
			<span>{section.icon}
		</span>
			{section.name}
		</div>
		{/each}
	</aside>

	<!-- Main content -->
	<div class="main-content">
		<h1 class="content-header">{selectedSection}</h1>
		{#if selectedSection === "Profile"}
			<form>
				<div class="form-group">
					<label	for="username">Full Name</label>
					<input type="text" id="username"
					placeholder="e.g, Adrien Heisch" />
				</div>
				<div class="form-group">
					<label for="email">Email Address</label>
					<input type="email" id="email" placeholder="e.g, aheisch@student.42.fr" />
				</div>
				<button type="submit">Save Changes</button>
			</form>
			{/if}
			{#if selectedSection === "Account Settings"}
				<p>Change your account details hehre, such as your password or linked accounts.</p>
			{/if}
			{#if selectedSection === "Privacy"}
				<p>Adjust privacy settings, including visibility and sharing options.</p>
			{/if}
			<!--{#if selectedSection === "Notification"}
				<p>Manage your notifications preferences for emails and updates.</p>
			{/if}-->
	</div>
</div>