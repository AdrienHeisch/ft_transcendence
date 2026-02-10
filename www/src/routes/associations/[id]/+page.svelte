<script lang="ts">
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

const _association = $derived(await data.association);

// TODO remove fake data
const association = $derived({
  ..._association,
  logo: "🐄",
  coverImage:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=400&fit=crop",
  website: "www.fermeheureuse.fr",
  followers: 1247,
  animalsCount: 45,
  isFollowing: false,
});

const stats = [
  { icon: "🐾", value: "45", label: "Animals" },
  { icon: "👥", value: "1,247", label: "Followers" },
  { icon: "📅", value: "2010", label: "Founded" },
  { icon: "🏆", value: "156", label: "Adoptions" },
];

const posts = [
  {
    id: 1,
    type: "publication",
    image:
      "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
    title: "Marguerite's Recovery",
    content:
      "Great news! Marguerite, our rescued cow, is doing much better after months of care. She's now enjoying the sun in our meadow 🐄💚",
    likes: 342,
    comments: 47,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "adoption",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop",
    title: "🏠 Adoption Alert: Meet Coco!",
    content:
      "Coco is a lovely 2-year-old hen looking for a forever home. She's friendly, loves treats, and lays beautiful eggs. Contact us if you're interested in adopting her!",
    likes: 189,
    comments: 23,
    timestamp: "5 hours ago",
    adoptionStatus: "Available",
  },
  {
    id: 3,
    type: "news",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop",
    title: "📰 Featured in Le Monde",
    content:
      "We're honored to be featured in today's Le Monde article about farm animal sanctuaries in France. Thank you for your continued support!",
    likes: 567,
    comments: 92,
    timestamp: "Yesterday",
    newsSource: "Le Monde",
  },
  {
    id: 4,
    type: "publication",
    image:
      "https://as1.ftcdn.net/v2/jpg/01/33/21/60/1000_F_133216088_Za1Z6sMjrAgGqKnHIj3EaghzA0hUHTYg.jpg",
    title: "Shearing Day Complete!",
    content:
      "Our annual sheep shearing is done! All our woolly friends are now ready for summer. The wool will be donated to local artisans 🐑✂️",
    likes: 234,
    comments: 31,
    timestamp: "2 days ago",
  },
  {
    id: 5,
    type: "adoption",
    image:
      "https://images.unsplash.com/photo-1518796745738-41048802f99a?w=600&h=400&fit=crop",
    title: "🏠 Adoption Alert: Billy the rabbit",
    content:
      "Billy is an energetic 3-year-old rabbit who needs a spacious home. He's great with other animals and loves to eat carrots! Perfect for a family with farm.",
    likes: 156,
    comments: 18,
    timestamp: "3 days ago",
    adoptionStatus: "Available",
  },
  {
    id: 6,
    type: "news",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=400&fit=crop",
    title: "📰 New Partnership Announced",
    content:
      "Exciting news! We've partnered with 5 local schools to offer educational farm visits. Helping the next generation understand animal welfare. Read more in today's France 3 coverage.",
    likes: 423,
    comments: 56,
    timestamp: "4 days ago",
    newsSource: "France 3",
  },
];

const quickLinks = [
  { title: "📋 Our Mission", href: "/" },
  { title: "🏠 Adopt an Animal", href: "/" },
  { title: "🤝 Volunteer", href: "/" },
  { title: "💚 Make a Donation", href: "/" },
];

function getPostBadge(type: string) {
  switch (type) {
    case "adoption":
      return { color: "bg-green-600", icon: "🏠", label: "Adoption" };
    case "news":
      return { color: "bg-blue-600", icon: "📰", label: "News" };
    default:
      return { color: "bg-orange-600", icon: "📝", label: "Update" };
  }
}
</script>

<svelte:head>
  <title>{association.name} - Bibi's Farm</title>
</svelte:head>

<div class="min-h-screen relative">
  <!-- Background -->
  <div class="fixed inset-0 -z-10">
    <img 
      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop" 
      alt="Farm" 
      class="w-full h-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-linear-to-br from-yellow-50/95 via-orange-50/95 to-amber-100/95"></div>
  </div>

  <!-- Cover Image -->
  <div class="relative h-80 bg-linear-to-r from-orange-700 via-orange-600 to-amber-600">
    <img 
      src={association.coverImage} 
      alt="Cover" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/20"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
    <!-- Profile Header -->
    <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-orange-700">
      <div class="flex flex-col md:flex-row items-center md:items-end gap-6">
        <!-- Logo -->
        <div class="relative">
          <div class="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-8xl">
            {association.logo}
          </div>
          <div class="absolute bottom-2 right-2 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
            {association.type}
          </div>
        </div>

        <!-- Association Info -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900" style="font-family: Georgia, serif;">{association.name}</h1>
          <p class="mt-2 text-gray-700 max-w-2xl">{association.description}</p>

          <div class="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <span>📍</span>
              <span>{association.city.name}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>📧</span>
              <span>{association.email}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>📞</span>
              <span>{association.phone}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>🌐</span>
              <span>{association.website}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
            {#if association.isFollowing}
              <span>✓</span>
              Following
            {:else}
              <span>➕</span>
              Follow
            {/if}
          </button>
          <button class="px-6 py-3 bg-yellow-50 border-2 border-orange-700 text-amber-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 shadow-md hover:shadow-lg">
            💬 Contact
          </button>
          <button class="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
            💚 Donate
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t-2 border-orange-700">
        {#each stats as stat}
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-700">{stat.value}</div>
            <div class="text-sm text-amber-900 flex items-center gap-1">
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-8">
      <!-- Left Sidebar - About -->
      <div class="lg:col-span-1 space-y-6">
        <!-- About Card -->
        <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <span class="text-2xl">ℹ️</span>
            About
          </h2>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <span class="text-xl">🏛️</span>
              <div>
                <div class="font-semibold text-gray-700">Type</div>
                <div class="text-gray-600">{association.type}</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-xl">📅</span>
              <div>
                <div class="font-semibold text-gray-700">Founded</div>
                <div class="text-gray-600">{association.foundedAt}</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-xl">🐾</span>
              <div>
                <div class="font-semibold text-gray-700">Animals Rescued</div>
                <div class="text-gray-600">{association.animalsCount} animals</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-4 border-orange-700">
          <h2 class="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <span class="text-2xl">🔗</span>
            Quick Links
          </h2>
          <div class="space-y-2">
            {#each quickLinks as link}
              <a href={link.href} class="block p-3 bg-yellow-100 rounded-lg hover:bg-orange-100 transition-all duration-200 border-2 border-orange-700 font-medium text-gray-700">
                {link.title}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Posts Feed -->
      <div class="lg:col-span-2 space-y-6">
        {#each posts as post (post.id)}
          <div class="bg-linear-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-4 border-orange-700">
            <!-- Post Header -->
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-white border-2 border-orange-700 flex items-center justify-center text-2xl">
                  {association.logo}
                </div>
                <div>
                  <div class="font-bold text-gray-900">{association.name}</div>
                  <div class="text-xs text-gray-600">{post.timestamp}</div>
                </div>
              </div>
              <div class="{getPostBadge(post.type).color} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <span>{getPostBadge(post.type).icon}</span>
                <span>{getPostBadge(post.type).label}</span>
              </div>
            </div>

            <!-- Post Content -->
            <div>
              <h3 class="px-4 pb-2 text-lg font-bold text-gray-900">{post.title}</h3>
              <p class="px-4 pb-4 text-gray-700">{post.content}</p>

              {#if post.image}
                <img src={post.image} alt={post.title} class="w-full h-80 object-cover" />
              {/if}

              {#if post.adoptionStatus}
                <div class="px-4 py-3 bg-green-100 border-t-2 border-green-600">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-green-900">
                      Status: <span class="text-green-700">{post.adoptionStatus}</span>
                    </span>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors text-sm">
                      Apply to Adopt
                    </button>
                  </div>
                </div>
              {/if}

              {#if post.newsSource}
                <div class="px-4 py-3 bg-blue-100 border-t-2 border-blue-600">
                  <div class="flex items-center gap-2 text-sm text-blue-900">
                    <span>📰</span>
                    <span class="font-semibold">Source: {post.newsSource}</span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Post Actions -->
            <div class="px-4 py-3 border-t-2 border-orange-700 flex items-center gap-6">
              <button class="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span class="font-semibold">{post.likes}</span>
              </button>
              <button class="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span class="font-semibold">{post.comments}</span>
              </button>
              <button class="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors ml-auto">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                <span class="font-semibold">Share</span>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
