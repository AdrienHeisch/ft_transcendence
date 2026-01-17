<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Données de démonstration (à remplacer par les vraies données de l'utilisateur)
  let user = $derived({
    username: data.username || "RGDupont",
    firstName: "Roger",
    lastName: "Dupont",
    bio: "Passionné par les animaux et la ferme | Photographe amateur | Amoureux des poules",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (data.username || "rgdupont"),
    coverImage: "https://lafermeducoudray.com/wp-content/uploads/2024/03/La-ferme-du-Coudray-Arnaud-Delaunay-2.jpg",
    location: "Paris, France",
    joinedDate: "Janvier 2025",
    friends: 247,
    posts: 156,
    isCurrentUser: false, // À gérer selon l'utilisateur connecté
    isFriend: false,
  });

  const passions = [
    { icon: "🐾", name: "Animaux" },
    { icon: "🐔", name: "Poules" },
    { icon: "🚜", name: "Ferme" },
    { icon: "🍽️", name: "Gastronomie" },
    { icon: "🧠", name: "Philosophie" },
    { icon: "📚", name: "Lecture" },
  ];

  const posts = [
    {
      id: 1,
      image: "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
      caption: "Marguerite profite du soleil dans le pré 🐄 #vacheheureuse",
      likes: 42,
      comments: 7,
      timestamp: "Il y a 2 heures",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop",
      caption: "Les poules ont pondu 12 œufs aujourd'hui ! 🐔 Record battu !",
      likes: 38,
      comments: 5,
      timestamp: "Il y a 5 heures",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop",
      caption: "Les cochons adorent la boue ! 🐷 Ils sont tellement mignons",
      likes: 89,
      comments: 23,
      timestamp: "Hier",
    },
    {
      id: 4,
      image: "https://as1.ftcdn.net/v2/jpg/01/33/21/60/1000_F_133216088_Za1Z6sMjrAgGqKnHIj3EaghzA0hUHTYg.jpg",
      caption: "Les moutons viennent d'être tondus 🐑 Ils sont tout doux !",
      likes: 56,
      comments: 12,
      timestamp: "Il y a 2 jours",
    },
    {
      id: 5,
      image: "https://lh6.googleusercontent.com/proxy/D68TIix5hlepNYgkXZViy8zdyEc5RT60ACsloBevch4Sdy1xwFQvVhuFg8Rive0u9k96WxskbJZw6ghffdujSZqHo9RA7w",
      caption: "Les chèvres sont espiègles comme toujours 🐐",
      likes: 64,
      comments: 15,
      timestamp: "Il y a 3 jours",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=400&fit=crop",
      caption: "Jolie balade à cheval ce matin 🐴 #equitation",
      likes: 71,
      comments: 18,
      timestamp: "Il y a 4 jours",
    },
  ];
</script>

<div class="min-h-screen relative">
  <!-- Background Image de ferme -->
  <div class="fixed inset-0 -z-10">
    <img 
      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop" 
      alt="Ferme" 
      class="w-full h-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95"></div>
  </div>

  <!-- Cover Image -->
  <div class="relative h-80 bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600">
    <img 
      src={user.coverImage} 
      alt="Couverture" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
    <!-- Profile Header -->
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-orange-700">
      <div class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <!-- Profile Picture -->
        <div class="relative">
          <img 
            src={user.profileImage} 
            alt={user.username}
            class="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white"
          />
          <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
        </div>

        <!-- User Info -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
          <p class="text-lg text-gray-600">@{user.username}</p>
          <p class="mt-2 text-gray-700 max-w-2xl">{user.bio}</p>
          
          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{user.location}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Membre depuis {user.joinedDate}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          {#if user.isCurrentUser}
            <button class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Modifier le profil
            </button>
          {:else}
            <button class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
              {#if user.isFriend}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Amis
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Ajouter en ami
              {/if}
            </button>
            <button class="px-6 py-3 bg-yellow-50 border-2 border-orange-700 text-amber-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 shadow-md hover:shadow-lg">
              Message
            </button>
          {/if}
        </div>
      </div>

      <!-- Stats -->
      <div class="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t-2 border-orange-700">
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-700">{user.friends}</div>
          <div class="text-sm text-amber-900">Amis</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-700">{user.posts}</div>
          <div class="text-sm text-amber-900">Publications</div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-8">
      <!-- Left Sidebar - Passions -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Passions Card -->
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <span class="text-2xl">🌾</span>
            Passions
          </h2>
          <div class="grid grid-cols-2 gap-3">
            {#each passions as passion}
              <div class="flex items-center gap-2 p-3 bg-yellow-100 rounded-lg hover:bg-orange-100 transition-all duration-200 cursor-pointer border-2 border-orange-700">
                <span class="text-2xl">{passion.icon}</span>
                <span class="text-sm font-medium text-gray-700">{passion.name}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Friends Preview Card -->
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center justify-between">
            <span class="flex items-center gap-2">
              <span class="text-2xl">👥</span>
              Amis
            </span>
            <a href="/profile/{user.username}/friends" class="text-sm text-orange-700 hover:text-orange-800 font-medium">Voir tout</a>
          </h2>
          <div class="grid grid-cols-3 gap-2">
            {#each Array(6) as _, i}
              <div class="aspect-square rounded-lg overflow-hidden border-2 border-orange-700 hover:border-orange-900 transition-all duration-200 cursor-pointer">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=friend{i}" 
                  alt="Ami" 
                  class="w-full h-full object-cover"
                />
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Content - Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#each posts as post (post.id)}
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-4 border-orange-700 hover:shadow-xl transition-all duration-200">
            <!-- Post Header -->
            <div class="p-4 flex items-center gap-3">
              <img 
                src={user.profileImage} 
                alt={user.username}
                class="w-12 h-12 rounded-full border-2 border-orange-700"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                <p class="text-sm text-gray-600">{post.timestamp}</p>
              </div>
              <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>

            <!-- Post Image -->
            <img 
              src={post.image} 
              alt="Post"
              class="w-full aspect-video object-cover"
            />

            <!-- Post Actions -->
            <div class="p-4 space-y-3">
              <div class="flex items-center gap-4">
                <button class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group">
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span class="font-medium">{post.likes}</span>
                </button>
                <button class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group">
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span class="font-medium">{post.comments}</span>
                </button>
                <button class="flex items-center gap-2 text-amber-900 hover:text-orange-700 transition-colors group ml-auto">
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                </button>
              </div>

              <!-- Caption -->
              <p class="text-gray-800">{post.caption}</p>
            </div>
          </div>
        {/each}

        <!-- Load More -->
        <button class="w-full py-4 bg-yellow-50 backdrop-blur-sm rounded-2xl shadow-lg border-4 border-orange-700 text-amber-900 font-bold hover:bg-orange-100 hover:border-orange-900 transition-all duration-200">
          Voir plus de publications
        </button>
      </div>
    </div>
  </div>
</div>
