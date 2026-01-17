<script lang="ts">
	let sidebarOpen = $state(true);
	let messagesOpen = $state(false);

	const sidebarMainItems = [
		{ label: 'Profil', icon: '👤' },
		{ label: 'Groupes', icon: '👥' },
		{ label: 'Favoris', icon: '⭐' },
		{ label: 'Photos', icon: '📷' },
		{ label: 'Fil actu', icon: '📰' },
		{ label: 'Amis', icon: '🤝' },
		{ label: 'Adopter', icon: '🐾' },
		{ label: 'Pet sitter', icon: '🐕' }
	];

	const sidebarBottomItems = [
		{ label: 'Aide et assistance', icon: '❓' },
		{ label: 'Paramètres', icon: '⚙️' },
		{ label: 'Déconnexion', icon: '🚪' }
	];
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
	<!-- Header avec bouton home et messages -->
	<header class="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
		<div class="flex items-center justify-between px-6 py-3">
			<div class="flex items-center gap-4">
				<button
					onclick={() => (window.location.href = '/')}
					class="flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
				>
					<span class="text-xl">🏠</span>
					<span>Accueil</span>
				</button>
		</div>

		<div class="flex items-center gap-3">
			<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐄%3C/text%3E%3C/svg%3E" alt="Logo" class="w-10 h-10" />
			<div>
				<h1 class="text-3xl font-bold text-yellow-100" style="font-family: Georgia, serif;">La Ferme à Bibi</h1>
				<p class="text-sm text-yellow-200 italic" style="font-family: Georgia, serif;">Depuis 1887</p>
			</div>
		</div>

		<button
				onclick={() => (messagesOpen = !messagesOpen)}
				class="relative flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
			>
				<span class="text-xl">💬</span>
				<span>Messages</span>
				<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
			</button>
		</div>
	</header>

	<!-- Panel de messages -->
	{#if messagesOpen}
		<div class="fixed top-16 right-6 w-96 bg-orange-50 rounded-lg shadow-2xl border-4 border-orange-600 z-50">
			<div class="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-t flex items-center justify-between">
				<h2 class="font-bold text-lg">Messages Directs</h2>
				<button onclick={() => (messagesOpen = false)} class="text-2xl hover:text-orange-200 transition">&times;</button>
			</div>
			<div class="p-4 max-h-96 overflow-y-auto">
				<div class="space-y-2">
					<div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">A</div>
							<div class="flex-1">
								<div class="font-semibold text-orange-900">Alice</div>
								<div class="text-sm text-gray-700">Prêt pour la fete de la vache ?</div>
							</div>
							<span class="text-xs text-orange-600 font-medium">2m</span>
						</div>
					</div>
					<div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">B</div>
							<div class="flex-1">
								<div class="font-semibold text-orange-900">Bob</div>
								<div class="text-sm text-gray-700">Salut Franck comment va ta vache ?</div>
							</div>
							<span class="text-xs text-orange-600 font-medium">15m</span>
						</div>
					</div>
					<div class="p-3 hover:bg-white rounded-lg cursor-pointer border-2 border-orange-300 bg-orange-100 transition">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">C</div>
							<div class="flex-1">
								<div class="font-semibold text-orange-900">Charlie</div>
								<div class="text-sm text-gray-700">Dis moi tu aurais une poule par hasard ?</div>
							</div>
							<span class="text-xs text-orange-600 font-medium">1h</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex relative">
		<!-- Bouton pour ouvrir la sidebar quand elle est fermée -->
		{#if !sidebarOpen}
			<button
				onclick={() => (sidebarOpen = true)}
				class="fixed left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-2 py-6 rounded-r-lg font-bold hover:from-orange-700 hover:to-orange-800 transition shadow-lg z-40"
				style="writing-mode: vertical-rl"
			>
				MENU
			</button>
		{/if}

		<!-- Sidebar -->
		{#if sidebarOpen}
			<aside class="w-72 bg-gradient-to-b from-orange-50 to-yellow-50 shadow-xl border-r-4 border-orange-600 min-h-[calc(100vh-60px)] flex flex-col">
				<div class="p-4 flex-1">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-bold text-orange-900">Menu</h2>
						<button
							onclick={() => (sidebarOpen = false)}
							class="text-2xl text-orange-700 hover:text-orange-900 transition"
						>
							&times;
						</button>
					</div>

					<nav class="space-y-2">
						{#each sidebarMainItems as item}
							<button
								class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-orange-100 transition shadow-md border-2 border-orange-300 font-semibold text-orange-900 flex items-center gap-3"
							>
								<span class="text-xl">{item.icon}</span>
								<span>{item.label}</span>
							</button>
						{/each}
					</nav>
				</div>

				<!-- Bottom section -->
				<div class="p-4 border-t-2 border-orange-300">
					<nav class="space-y-2">
						{#each sidebarBottomItems as item}
							<button
								class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-orange-100 transition shadow-md border-2 border-orange-300 font-semibold text-orange-900 flex items-center gap-3"
							>
								<span class="text-xl">{item.icon}</span>
								<span>{item.label}</span>
							</button>
						{/each}
					</nav>
				</div>
			</aside>
		{/if}

		<!-- Zone de contenu principal -->
		<main class="flex-1 p-6">
			<div class="max-w-2xl mx-auto">
				<!-- Fil d'actualité -->
				<section class="bg-white rounded-xl shadow-lg border-3 border-orange-400 p-6 mb-6">
					<h2 class="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
						<span>📰</span>
						Fil d'actualité
					</h2>
					
					<!-- Post input -->
					<div class="mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
						<textarea 
							class="w-full p-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none resize-none bg-white"
							placeholder="Quoi de neuf ?"
							rows="3"
						></textarea>
						<div class="flex justify-end mt-2">
							<button class="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-md">
								Publier
							</button>
						</div>
					</div>

					<!-- Posts -->
					<div class="space-y-4">
						<div class="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 shadow">
							<div class="flex items-center gap-3 mb-3">
								<div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow">
									U
								</div>
								<div>
									<div class="font-semibold text-orange-900">Utilisateur</div>
									<div class="text-xs text-gray-600">Il y a 5 minutes</div>
								</div>
							</div>
							<p class="text-gray-800 mb-3">Bienvenue sur La Ferme A Bibi ! </p>
							<div class="flex gap-4 text-sm text-gray-600">
								<button class="hover:text-orange-700 transition">👍 J'aime</button>
								<button class="hover:text-orange-700 transition">💬 Commenter</button>
								<button class="hover:text-orange-700 transition">↗️ Partager</button>
							</div>
						</div>
					</div>
				</section>

				<!-- Annonces adoptions -->
				<section class="bg-white rounded-xl shadow-lg border-3 border-orange-400 p-6">
					<h2 class="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
						<span>📢</span>
						Annonces & Adoptions
					</h2>
					<div class="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-300 text-center">
						<p class="text-gray-600 italic">Aucune annonce pour le moment.</p>
					</div>
				</section>
			</div>
		</main>
	</div>
</div>