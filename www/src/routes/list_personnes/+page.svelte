<script lang="ts">
  // Filtres
  let searchQuery = $state("");
  let selectedRole = $state("tous");
  let selectedVille = $state("toutes");
  let sortBy = $state("nom");

  // Données de démonstration des personnes
  const personnes = [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Roger",
      username: "RGDupont",
      role: "Adoptant",
      ville: "Paris",
      age: 45,
      animauxAdoptes: 3,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roger",
      description: "Passionné par les animaux de ferme depuis toujours"
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      username: "SophieM",
      role: "Association",
      ville: "Lyon",
      age: 38,
      animauxAdoptes: 0,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      description: "Présidente de l'association Les Amis de la Ferme"
    },
    {
      id: 3,
      nom: "Bernard",
      prenom: "Jean",
      username: "JeanB",
      role: "Adoptant",
      ville: "Marseille",
      age: 52,
      animauxAdoptes: 5,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
      description: "Éleveur à la retraite, adore les vaches"
    },
    {
      id: 4,
      nom: "Petit",
      prenom: "Marie",
      username: "MariePetit",
      role: "Bénévole",
      ville: "Toulouse",
      age: 29,
      animauxAdoptes: 1,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
      description: "Vétérinaire bénévole pour les animaux de la ferme"
    },
    {
      id: 5,
      nom: "Robert",
      prenom: "Pierre",
      username: "PierreR",
      role: "Adoptant",
      ville: "Paris",
      age: 41,
      animauxAdoptes: 2,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre",
      description: "Photographe animalier amateur"
    },
    {
      id: 6,
      nom: "Moreau",
      prenom: "Claire",
      username: "ClaireM",
      role: "Association",
      ville: "Lyon",
      age: 35,
      animauxAdoptes: 0,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Claire",
      description: "Coordinatrice de l'association Ferme et Nature"
    },
  ];

  // Liste des rôles et villes uniques pour les filtres
  let roles = $derived(["tous", ...new Set(personnes.map(p => p.role))]);
  let villes = $derived(["toutes", ...new Set(personnes.map(p => p.ville))]);

  // Filtrage des personnes
  let personnesFiltrees = $derived(personnes.filter(personne => {
    const matchSearch = personne.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       personne.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       personne.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       personne.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = selectedRole === "tous" || personne.role === selectedRole;
    const matchVille = selectedVille === "toutes" || personne.ville === selectedVille;
    
    return matchSearch && matchRole && matchVille;
  }));

  // Tri des personnes
  let personnesTriees = $derived([...personnesFiltrees].sort((a, b) => {
    if (sortBy === "nom") {
      return a.nom.localeCompare(b.nom);
    } else if (sortBy === "ville") {
      return a.ville.localeCompare(b.ville);
    } else if (sortBy === "role") {
      return a.role.localeCompare(b.role);
    }
    return 0;
  }));
</script>

<svelte:head>
  <title>Liste des membres - La Ferme à Bibi</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
  <!-- Header -->
  <header class="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
    <div class="flex items-center justify-between px-6 py-3">
      <button
        onclick={() => (window.location.href = '/')}
        class="flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold transition shadow-md"
      >
        <span class="text-xl">🏠</span>
        <span>Accueil</span>
      </button>

      <div class="flex items-center gap-3">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐄%3C/text%3E%3C/svg%3E" alt="Logo" class="w-10 h-10" />
        <div>
          <h1 class="text-3xl font-bold text-yellow-100" style="font-family: Georgia, serif;">La Ferme à Bibi</h1>
          <p class="text-sm text-yellow-200 italic" style="font-family: Georgia, serif;">Depuis 1887</p>
        </div>
      </div>

      <div class="w-32"></div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Titre de la page -->
    <div class="text-center mb-8">
      <h2 class="text-4xl md:text-5xl font-bold text-orange-900 mb-4" style="font-family: Georgia, serif;">
        👥 Notre Communauté
      </h2>
      <p class="text-xl text-orange-800">
        Découvrez les membres de La Ferme à Bibi : adoptants, associations et bénévoles
      </p>
    </div>

    <!-- Filtres de recherche -->
    <div class="bg-white rounded-2xl shadow-xl p-6 border-3 border-orange-400 mb-8">
      <h3 class="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
        <span>🔍</span>
        Rechercher une personne
      </h3>

      <!-- Barre de recherche -->
      <div class="mb-6">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Rechercher par nom, prénom, pseudo ou description..."
          class="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
        />
      </div>

      <!-- Filtres -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Rôle -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2">Rôle</label>
          <select
            bind:value={selectedRole}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            {#each roles as role}
              <option value={role}>{role === "tous" ? "Tous les rôles" : role}</option>
            {/each}
          </select>
        </div>

        <!-- Ville -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2">Ville</label>
          <select
            bind:value={selectedVille}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            {#each villes as ville}
              <option value={ville}>{ville === "toutes" ? "Toutes les villes" : ville}</option>
            {/each}
          </select>
        </div>

        <!-- Tri -->
        <div>
          <label class="block text-sm font-bold text-orange-900 mb-2">Trier par</label>
          <select
            bind:value={sortBy}
            class="w-full px-4 py-2 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-orange-900 font-medium"
          >
            <option value="nom">Nom (A-Z)</option>
            <option value="ville">Ville</option>
            <option value="role">Rôle</option>
          </select>
        </div>

        <!-- Espace vide pour alignement -->
        <div></div>
      </div>

      <!-- Résultats -->
      <div class="mt-4 text-orange-900 font-medium">
        {personnesTriees.length} {personnesTriees.length > 1 ? "personnes trouvées" : "personne trouvée"}
      </div>
    </div>

    <!-- Grille de personnes -->
    {#if personnesTriees.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-2xl font-bold text-orange-900 mb-2">Aucune personne trouvée</h3>
        <p class="text-orange-700">Essayez de modifier vos critères de recherche</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each personnesTriees as personne (personne.id)}
          <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden border-3 border-orange-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <!-- Photo de profil -->
            <div class="relative bg-gradient-to-br from-orange-200 to-yellow-200 p-6">
              <div class="flex justify-center">
                <img 
                  src={personne.photo} 
                  alt={personne.prenom + ' ' + personne.nom}
                  class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                />
              </div>
              
              <!-- Badge rôle -->
              <span class="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-white rounded-lg font-bold text-sm shadow-md">
                {personne.role}
              </span>
            </div>

            <!-- Informations -->
            <div class="p-5">
              <h3 class="text-2xl font-bold text-orange-900 mb-1" style="font-family: Georgia, serif;">
                {personne.prenom} {personne.nom}
              </h3>
              <p class="text-orange-700 mb-2">@{personne.username}</p>

              <div class="flex items-center gap-4 mb-3 text-sm text-orange-800">
                <div class="flex items-center gap-1">
                  <span>📍</span>
                  <span>{personne.ville}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span>🎂</span>
                  <span>{personne.age} ans</span>
                </div>
              </div>

              {#if personne.animauxAdoptes > 0}
                <div class="mb-3 text-sm text-orange-800 flex items-center gap-1">
                  <span>🐾</span>
                  <span class="font-semibold">{personne.animauxAdoptes} {personne.animauxAdoptes > 1 ? "animaux adoptés" : "animal adopté"}</span>
                </div>
              {/if}

              <p class="text-sm text-gray-700 mb-4 line-clamp-2 italic">
                "{personne.description}"
              </p>

              <!-- Boutons -->
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md">
                  👁️ Voir le profil
                </button>
                <button class="flex-1 py-2 bg-white border-2 border-orange-400 text-orange-900 rounded-lg font-bold hover:bg-orange-50 transition-colors">
                  💬 Contacter
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
