<script lang="ts">
  let showLogin = $state(false);
  let isAdminMode = $state(false);
  let sidebarOpen = $state(true);

  // Les bestiaux
  const animals = [
    {
      id: 1,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 2,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 3,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 4,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 5,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 6,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
    {
      id: 7,
      name: "Marguerite",
      type: "Vache",
      age: "4 ans",
      image: "🐄",
      description:
        "Notre jolie Marguerite, belles mamelles vous attend dans son pre ! adorable, elle saura vous charmer avec son lait",
    },
  ];

  // actualités
  const news = [
    {
      id: 1,
      author: "Le fermier en herbe",
      date: "Il y a 3h",
      content:
        "News du jour : 3 vaches sauvee par Didier 45 ans ! cet amoureux de la nature a decide de les adopter merci a lui pour ce beau geste.",
      likes: 1500,
    },
    {
      id: 2,
      author: "La laitiere",
      date: "Il y a 1h",
      content:
        "Mon lait naturel : la recette 3 hectar de prairies pour 3 vaches !",
      likes: 10,
    },
    {
      id: 3,
      author: "Le fermier en herbe",
      date: "Il y a 3h",
      content:
        "News du jour : 3 vaches sauvee par Didier 45 ans ! cet amoureux de la nature a decide de les adopter merci a lui pour ce beau geste.",
      likes: 1500,
    },
    {
      id: 4,
      author: "La laitiere",
      date: "Il y a 1h",
      content:
        "Mon lait naturel : la recette 3 hectar de prairies pour 3 vaches !",
      likes: 10,
    },
    {
      id: 5,
      author: "Le fermier en herbe",
      date: "Il y a 3h",
      content:
        "News du jour : 3 vaches sauvee par Didier 45 ans ! cet amoureux de la nature a decide de les adopter merci a lui pour ce beau geste.",
      likes: 1500,
    },
    {
      id: 6,
      author: "La laitiere",
      date: "Il y a 1h",
      content:
        "Mon lait naturel : la recette 3 hectar de prairies pour 3 vaches !",
      likes: 10,
    },
  ];
</script>
<div class="min-h-screen bg-[#f5e6d3]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.05'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E&quot;);">
  <!-- Header -->
  <header class="bg-gradient-to-r from-amber-700 via-orange-800 to-amber-800 text-amber-50 shadow-lg sticky top-0 z-50 border-b-4 border-amber-900">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button 
            onclick={() => sidebarOpen = !sidebarOpen}
            class="md:hidden bg-amber-600 p-2 rounded hover:bg-amber-700 transition"
          >
            ☰
          </button>
          <span class="text-4xl drop-shadow-md">🐄</span>
          <div>
            <h1 class="text-3xl font-bold" style="font-family: 'Georgia', serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">La Ferme à Bibi</h1>
            <p class="text-xs text-amber-200 italic">Depuis 1887</p>
          </div>
        </div>

        <nav class="hidden md:flex gap-6 items-center">
          <a href="#accueil" class="hover:text-amber-300 transition font-semibold">Accueil</a>
          <a href="#animaux" class="hover:text-amber-300 transition font-semibold">Nos animaux</a>
          <a href="#adoption" class="hover:text-amber-300 transition font-semibold">Adopter</a>
          <a href="#contact" class="hover:text-amber-300 transition font-semibold">Contact</a>
        </nav>

        <div class="flex gap-3 items-center">
          <button
            class="bg-rose-500 text-white px-4 py-2 rounded font-semibold hover:bg-rose-600 transition shadow-md border-2 border-rose-700"
          >
            ❤️ Faire un don
          </button>
          <button
            onclick={() => showLogin = !showLogin}
            class="bg-amber-100 text-amber-900 px-4 py-2 rounded font-semibold hover:bg-amber-200 transition shadow-md border-2 border-amber-300"
          >
            👤 Connexion
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Layout avec sidebar -->
  <div class="flex relative">
    <!-- Bouton pour ouvrir la sidebar quand elle est fermée -->
    {#if !sidebarOpen}
      <button
        onclick={() => sidebarOpen = true}
        class="fixed left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2 py-6 rounded-r-lg font-bold hover:from-amber-700 hover:to-orange-800 transition shadow-lg border-2 border-amber-800 z-40"
        style="writing-mode: vertical-rl;"
      >
        ☰ MENU
      </button>
    {/if}

    <!-- Sidebar gauche -->
    <aside 
      class="bg-gradient-to-b from-amber-100 to-amber-200 border-r-4 border-amber-700 shadow-xl transition-all duration-300 sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto"
      class:hidden={!sidebarOpen}
      class:block={sidebarOpen}
      class:w-64={sidebarOpen}
      style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E&quot;);"
    >
      <div class="p-6">
        <!-- Bouton toggle pour desktop -->
        <div class="flex justify-end mb-4">
          <button 
            onclick={() => sidebarOpen = !sidebarOpen}
            class="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition"
          >
            ◀
          </button>
        </div>

        <!-- Menu Navigation -->
          <div class="mb-8">
            <nav class="space-y-2">
              <a href="#accueil" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                🏠 Accueil
              </a>
              <a href="#coup-de-coeur" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                ❤️coup de cœur 
              </a>
              <a href="#actualites" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                📰 Actualités
              </a>
              <a href="#adoption" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                💚 Adopter
              </a>
              <a href="#benevole" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                🤝 Bénévolat
              </a>
              <a href="#contact" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                📧 Contact
              </a>
            </nav>
          </div>

          <!-- Infos pratiques -->
          <div class="mb-8 bg-white/50 rounded-lg p-4 border-2 border-amber-600">
            <h3 class="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2" style="font-family: 'Georgia', serif;">
              📍 Infos Pratiques
            </h3>
            <div class="space-y-2 text-sm text-amber-900">
              <p class="flex items-start gap-2">
                <span>🕒</span>
                <span><strong>Horaires:</strong><br/>Dim: 9h-10h</span>
              </p>
              <p class="flex items-start gap-2">
                <span>📞</span>
                <span>01 01 01 01 01</span>
              </p>
              <p class="flex items-start gap-2">
                <span>📧</span>
                <span>laferme@fermiere.fr</span>
              </p>
            </div>
          </div>

          <!-- Stats ferme -->
          <div class="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-4 border-2 border-amber-700 shadow-md">
            <h3 class="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2" style="font-family: 'Georgia', serif;">
              📊 La Ferme en chiffres
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between items-center border-b border-amber-400 pb-2">
                <span class="text-amber-800">🐄 Animaux accueillis</span>
                <span class="font-bold text-amber-900">152</span>
              </div>
              <div class="flex justify-between items-center border-b border-amber-400 pb-2">
                <span class="text-amber-800">💚 Adoptions</span>
                <span class="font-bold text-amber-900">89</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-amber-800">👥 Bénévoles</span>
                <span class="font-bold text-amber-900">24</span>
              </div>
            </div>
          </div>

          <!-- Appel à l'action -->
          <div class="mt-6">
            <button class="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg font-bold hover:from-rose-600 hover:to-rose-700 transition shadow-lg border-2 border-rose-800">
              ❤️ Nous soutenir
            </button>
          </div>
      </div>
    </aside>

    <!-- Contenu principal -->
    <main class="flex-1">

  <!-- Panneau de connexion -->
  {#if showLogin}
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onclick={() => showLogin = false}>
      <div class="bg-amber-50 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-amber-800" onclick={(e) => e.stopPropagation()} style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.08'%3E%3Cpath d='M0 0h40L0 40z'/%3E%3C/g%3E%3C/svg%3E&quot;);">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-amber-900 mb-2" style="font-family: 'Georgia', serif;">Bienvenue</h2>
          <p class="text-amber-700 italic">Connectez-vous à La Ferme à Bibi</p>
        </div>
        
        <form class="space-y-4">
          <div>
            <label class="block text-amber-900 font-semibold mb-2">Nom d'utilisateur</label>
            <input type="text" class="w-full px-4 py-2 border-2 border-amber-300 rounded bg-white focus:border-amber-600 focus:outline-none" placeholder="Entrez votre nom">
          </div>
          
          <div>
            <label class="block text-amber-900 font-semibold mb-2">Mot de passe</label>
            <input type="password" class="w-full px-4 py-2 border-2 border-amber-300 rounded bg-white focus:border-amber-600 focus:outline-none" placeholder="Entrez votre mot de passe">
          </div>

          <div class="flex items-center gap-2 bg-amber-100 p-3 rounded border-2 border-amber-400">
            <input type="checkbox" id="admin" bind:checked={isAdminMode} class="w-4 h-4">
            <label for="admin" class="text-amber-900 font-semibold cursor-pointer">🔐 Mode Administrateur</label>
          </div>
          
          <button type="submit" class="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-800 transition shadow-lg border-2 border-amber-800">
            Se connecter
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <a href="#" class="text-amber-700 hover:text-amber-900 text-sm underline">Mot de passe oublié ?</a>
          <p class="text-sm text-amber-600 mt-2">Pas encore de compte ? <a href="#" class="text-amber-800 font-semibold underline">S'inscrire</a></p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Section-->
  <section
    class="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 text-amber-900 py-20"
  >
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-5xl font-bold mb-4">
        Donnez une seconde chance à un animal
      </h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Nos animaux de la ferme n'attendent que vous ! venez vite les rencontrer,
        ou parler avec des personnes du monde entier sur notre site!
      </p>
      <div class="flex gap-4 justify-center">
        <button
          class="bg-white text-amber-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-50 transition shadow-lg"
        >
          Voir les animaux
        </button>
        <button
          class="bg-transparent border-2 border-amber-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-900/10 transition"
        >
          En savoir plus
        </button>
      </div>
    </div>
  </section>

  <!-- Section Animaux disponibles -->
  <section id="animaux" class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h3 class="text-4xl font-bold text-amber-900 mb-3" style="font-family: 'Georgia', serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
        🌾 Nos Pensionnaires 🌾
      </h3>
      <p class="text-amber-700 italic text-lg">Des compagnons qui n'attendent que vous !</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each animals as animal}
        <div
          class="bg-amber-50 rounded-lg shadow-xl hover:shadow-2xl transition overflow-hidden border-4 border-amber-700 transform hover:-translate-y-1"
          style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.06'%3E%3Cpath d='M0 0h30L0 30z'/%3E%3C/g%3E%3C/svg%3E&quot;);"
        >
          <div class="bg-gradient-to-r from-amber-800 to-orange-900 text-center py-2 border-b-2 border-amber-900">
            <span class="text-amber-100 font-bold text-sm tracking-wider" style="font-family: 'Georgia', serif;">★ DISPONIBLE ★</span>
          </div>

          <!-- Image de l'animal -->
          <div class="p-4">
            <div
              class="bg-gradient-to-br from-orange-200 via-yellow-100 to-amber-200 h-48 flex items-center justify-center text-8xl rounded border-8 border-amber-800 shadow-inner"
              style="box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);"
            >
              {animal.image}
            </div>
          </div>

          <div class="px-4 pb-4">
            <div class="bg-amber-100 rounded p-3 border-2 border-amber-600 shadow-md mb-3">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-2xl font-bold text-amber-900" style="font-family: 'Georgia', serif;">{animal.name}</h4>
                <span
                  class="text-xs bg-orange-600 text-white px-3 py-1 rounded-full font-bold border-2 border-orange-800"
                >{animal.type}</span>
              </div>

              <p class="text-amber-800 text-sm mb-2">📅 {animal.age}</p>
              <p class="text-gray-800 text-sm leading-relaxed italic">"{animal.description}"</p>
            </div>
        
            <div class="flex gap-2">
              <button
                class="flex-1 bg-gradient-to-b from-rose-400 to-rose-600 text-white py-2 rounded font-bold hover:from-rose-500 hover:to-rose-700 transition shadow-md border-2 border-rose-800"
              >
                ❤️ J'aime
              </button>
              <button
                class="flex-1 bg-gradient-to-b from-amber-500 to-amber-700 text-white py-2 rounded font-bold hover:from-amber-600 hover:to-amber-800 transition shadow-md border-2 border-amber-900"
              >
                🏡 Adopter
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Section Actualités-->
  <section class="bg-gradient-to-b from-yellow-50 to-amber-50 py-16">
    <div class="container mx-auto px-4">
      <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Actualités & Témoignages
      </h3>

      <div class="max-w-2xl mx-auto space-y-4">
        {#each news as post}
          <div class="bg-white rounded-lg shadow p-4 border-2 border-orange-100">
            <!-- En-tête du post -->
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold"
              >
                {post.author[0]}
              </div>
              <div>
                <p class="font-semibold text-amber-900">{post.author}</p>
                <p class="text-xs text-amber-600">{post.date}</p>
              </div>
            </div>

            <!-- Contenu du post -->
            <p class="text-gray-700 mb-3">{post.content}</p>

            <!-- Facebook like -->
            <div
              class="flex items-center gap-4 pt-3 border-t border-amber-100 text-sm text-amber-700"
            >
              <button class="hover:text-rose-600 transition">
                👍 {post.likes} J'aime
              </button>
              <button class="hover:text-orange-600 transition">
                💬 Commenter
              </button>
              <button class="hover:text-yellow-600 transition">
                🔄 Partager
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>


  <footer class="bg-gradient-to-r from-amber-800 to-orange-900 text-amber-50 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
      
        <div>
          <h4 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="text-2xl">🐾</span> Refuge de la ferme
          </h4>
          <p class="text-gray-300">
            Site d'echange et de connection entre associations de la ferme et
            les personnes
          </p>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xl font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-300">
            <li>123 rue de la ferme, la ferme-sur -vache</li>
            <li>01 01 01 01 01</li>
            <li>laferme@fermiere.fr</li>
            <li>Dim: 9h-10h</li>
          </ul>
        </div>

        <!-- Liens utiles -->
        <div>
          <h4 class="text-xl font-bold mb-4">Liens utiles</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <a href="#adoption" class="hover:text-orange-300 transition"
              >Comment adopter</a>
            </li>
            <li>
              <a href="#benevole" class="hover:text-orange-300 transition"
              >Devenir bénévole</a>
            </li>
            <li>
              <a href="#don" class="hover:text-orange-300 transition"
              >Faire un don</a>
            </li>
            <li>
              <a href="#legal" class="hover:text-orange-300 transition"
              >Mentions légales</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-amber-700 pt-6 text-center text-amber-200">
        <p>&copy; La Ferme : Tous droits réservés</p>
      </div>
    </div>
  </footer>
    </main>
  </div>
</div>
