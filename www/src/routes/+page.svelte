<script lang="ts">
let showLogin = $state(false);
let isAdminMode = $state(false);
let sidebarOpen = $state(true);

// The animals
const animals = [
  {
    id: 1,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 2,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 3,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 4,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 5,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 6,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
  {
    id: 7,
    name: "Marguerite",
    type: "Cow",
    age: "4 years old",
    image: "🐄",
    description:
      "Our lovely Marguerite, with beautiful udders waiting in her meadow! Adorable, she will charm you with her milk",
  },
];

// news
const news = [
  {
    id: 1,
    author: "The budding farmer",
    date: "3h ago",
    content:
      "Today's news: 3 cows saved by Didier, 45 years old! This nature lover decided to adopt them, thanks to him for this beautiful gesture.",
    likes: 1500,
  },
  {
    id: 2,
    author: "The milkmaid",
    date: "1h ago",
    content: "My natural milk: the recipe 3 hectares of meadows for 3 cows!",
    likes: 10,
  },
  {
    id: 3,
    author: "The budding farmer",
    date: "3h ago",
    content:
      "Today's news: 3 cows saved by Didier, 45 years old! This nature lover decided to adopt them, thanks to him for this beautiful gesture.",
    likes: 1500,
  },
  {
    id: 4,
    author: "The milkmaid",
    date: "1h ago",
    content: "My natural milk: the recipe 3 hectares of meadows for 3 cows!",
    likes: 10,
  },
  {
    id: 5,
    author: "The budding farmer",
    date: "3h ago",
    content:
      "Today's news: 3 cows saved by Didier, 45 years old! This nature lover decided to adopt them, thanks to him for this beautiful gesture.",
    likes: 1500,
  },
  {
    id: 6,
    author: "The milkmaid",
    date: "1h ago",
    content: "My natural milk: the recipe 3 hectares of meadows for 3 cows!",
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
            <h1 class="text-3xl font-bold" style="font-family: 'Georgia', serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Bibi's Farm</h1>
            <p class="text-xs text-amber-200 italic">Since 1887</p>
          </div>
        </div>

        <nav class="hidden md:flex gap-6 items-center">
          <a href="#accueil" class="hover:text-amber-300 transition font-semibold">Home</a>
          <a href="#animaux" class="hover:text-amber-300 transition font-semibold">Our animals</a>
          <a href="#adoption" class="hover:text-amber-300 transition font-semibold">Adopt</a>
          <a href="#contact" class="hover:text-amber-300 transition font-semibold">Contact</a>
        </nav>

        <div class="flex gap-3 items-center">
          <button
            class="bg-rose-500 text-white px-4 py-2 rounded font-semibold hover:bg-rose-600 transition shadow-md border-2 border-rose-700"
          >
            ❤️ Donate
          </button>
          <button
            onclick={() => showLogin = !showLogin}
            class="bg-amber-100 text-amber-900 px-4 py-2 rounded font-semibold hover:bg-amber-200 transition shadow-md border-2 border-amber-300"
          >
            👤 Login
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
                🏠 Home
              </a>
              <a href="#coup-de-coeur" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                ❤️ Favorites
              </a>
              <a href="#actualites" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                📰 News
              </a>
              <a href="#adoption" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                💚 Adopt
              </a>
              <a href="#benevole" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                🤝 Volunteer
              </a>
              <a href="#contact" class="flex items-center gap-3 p-3 rounded hover:bg-amber-300 transition text-amber-900 font-semibold border-2 border-transparent hover:border-amber-600">
                📧 Contact
              </a>
            </nav>
          </div>

          <!-- Practical information -->
          <div class="mb-8 bg-white/50 rounded-lg p-4 border-2 border-amber-600">
            <h3 class="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2" style="font-family: 'Georgia', serif;">
              📍 Practical Info
            </h3>
            <div class="space-y-2 text-sm text-amber-900">
              <p class="flex items-start gap-2">
                <span>🕒</span>
                <span><strong>Hours:</strong><br/>Sun: 9am-10am</span>
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

          <!-- Farm stats -->
          <div class="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-4 border-2 border-amber-700 shadow-md">
            <h3 class="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2" style="font-family: 'Georgia', serif;">
              📊 The Farm in Numbers
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between items-center border-b border-amber-400 pb-2">
                <span class="text-amber-800">🐄 Animals welcomed</span>
                <span class="font-bold text-amber-900">152</span>
              </div>
              <div class="flex justify-between items-center border-b border-amber-400 pb-2">
                <span class="text-amber-800">💚 Adoptions</span>
                <span class="font-bold text-amber-900">89</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-amber-800">👥 Volunteers</span>
                <span class="font-bold text-amber-900">24</span>
              </div>
            </div>
          </div>

          <!-- Call to action -->
          <div class="mt-6">
            <button class="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg font-bold hover:from-rose-600 hover:to-rose-700 transition shadow-lg border-2 border-rose-800">
              ❤️ Support us
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
          <h2 class="text-3xl font-bold text-amber-900 mb-2" style="font-family: 'Georgia', serif;">Welcome</h2>
          <p class="text-amber-700 italic">Log in to Bibi's Farm</p>
        </div>
        
        <form class="space-y-4">
          <div>
            <label class="block text-amber-900 font-semibold mb-2">Username</label>
            <input type="text" class="w-full px-4 py-2 border-2 border-amber-300 rounded bg-white focus:border-amber-600 focus:outline-none" placeholder="Enter your name">
          </div>
          
          <div>
            <label class="block text-amber-900 font-semibold mb-2">Password</label>
            <input type="password" class="w-full px-4 py-2 border-2 border-amber-300 rounded bg-white focus:border-amber-600 focus:outline-none" placeholder="Enter your password">
          </div>

          <div class="flex items-center gap-2 bg-amber-100 p-3 rounded border-2 border-amber-400">
            <input type="checkbox" id="admin" bind:checked={isAdminMode} class="w-4 h-4">
            <label for="admin" class="text-amber-900 font-semibold cursor-pointer">🔐 Administrator Mode</label>
          </div>
          
          <button type="submit" class="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-800 transition shadow-lg border-2 border-amber-800">
            Log in
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <a href="#" class="text-amber-700 hover:text-amber-900 text-sm underline">Forgot password?</a>
          <p class="text-sm text-amber-600 mt-2">Don't have an account yet? <a href="#" class="text-amber-800 font-semibold underline">Sign up</a></p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Hero section-->
  <section
    class="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 text-amber-900 py-20"
  >
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-5xl font-bold mb-4">
        Give an animal a second chance
      </h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Our farm animals are waiting for you! Come meet them soon,
        or chat with people from around the world on our site!
      </p>
      <div class="flex gap-4 justify-center">
        <button
          class="bg-white text-amber-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-50 transition shadow-lg"
        >
          See the animals
        </button>
        <button
          class="bg-transparent border-2 border-amber-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-900/10 transition"
        >
          Learn more
        </button>
      </div>
    </div>
  </section>

  <!-- Available animals section -->
  <section id="animaux" class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h3 class="text-4xl font-bold text-amber-900 mb-3" style="font-family: 'Georgia', serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
        🌾 Our Residents 🌾
      </h3>
      <p class="text-amber-700 italic text-lg">Companions waiting just for you!</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each animals as animal}
        <div
          class="bg-amber-50 rounded-lg shadow-xl hover:shadow-2xl transition overflow-hidden border-4 border-amber-700 transform hover:-translate-y-1"
          style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.06'%3E%3Cpath d='M0 0h30L0 30z'/%3E%3C/g%3E%3C/svg%3E&quot;);"
        >
          <div class="bg-gradient-to-r from-amber-800 to-orange-900 text-center py-2 border-b-2 border-amber-900">
            <span class="text-amber-100 font-bold text-sm tracking-wider" style="font-family: 'Georgia', serif;">★ AVAILABLE ★</span>
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
                ❤️ Like
              </button>
              <button
                class="flex-1 bg-gradient-to-b from-amber-500 to-amber-700 text-white py-2 rounded font-bold hover:from-amber-600 hover:to-amber-800 transition shadow-md border-2 border-amber-900"
              >
                🏡 Adopt
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- News section-->
  <section class="bg-gradient-to-b from-yellow-50 to-amber-50 py-16">
    <div class="container mx-auto px-4">
      <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        News & Testimonials
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

            <!-- Social interactions -->
            <div
              class="flex items-center gap-4 pt-3 border-t border-amber-100 text-sm text-amber-700"
            >
              <button class="hover:text-rose-600 transition">
                👍 {post.likes} Like
              </button>
              <button class="hover:text-orange-600 transition">
                💬 Comment
              </button>
              <button class="hover:text-yellow-600 transition">
                🔄 Share
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
            <span class="text-2xl">🐾</span> Farm Sanctuary
          </h4>
          <p class="text-gray-300">
            Exchange and connection platform between farm associations and
            people
          </p>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xl font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-300">
            <li>123 Farm Street, Farm-on-Cow</li>
            <li>01 01 01 01 01</li>
            <li>laferme@fermiere.fr</li>
            <li>Sun: 9am-10am</li>
          </ul>
        </div>

        <!-- Useful links -->
        <div>
          <h4 class="text-xl font-bold mb-4">Useful Links</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <a href="#adoption" class="hover:text-orange-300 transition"
              >How to adopt</a>
            </li>
            <li>
              <a href="#benevole" class="hover:text-orange-300 transition"
              >Become a volunteer</a>
            </li>
            <li>
              <a href="#don" class="hover:text-orange-300 transition"
              >Make a donation</a>
            </li>
            <li>
              <a href="#legal" class="hover:text-orange-300 transition"
              >Legal notice</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-amber-700 pt-6 text-center text-amber-200">
        <p>&copy; The Farm: All rights reserved</p>
      </div>
    </div>
  </footer>
    </main>
  </div>
</div>
