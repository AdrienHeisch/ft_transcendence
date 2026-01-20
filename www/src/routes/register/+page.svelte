<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-300/30 to-pink-400/30 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-yellow-400/20 rounded-full blur-3xl"></div>
  </div>

  <div class="w-full max-w-md relative z-10">
    <!-- Card -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-amber-200">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Create an account</h1>
        <p class="text-gray-600">Join us today</p>
      </div>

      <!-- Form -->
      <form method="post" action="?/register" use:enhance class="space-y-5">
        <!-- First and Last name on the same line -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Last name -->
          <div class="space-y-2">
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Last name"
            />
          </div>

          <!-- First name -->
          <div class="space-y-2">
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="First name"
            />
          </div>
        </div>

        <!-- Birthdate -->
        <div class="space-y-2">
          <label for="birthdate" class="block text-sm font-medium text-gray-700">
            Date of birth
          </label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- Phone -->
        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="06 12 34 56 78"
          />
        </div>

        <!-- Username -->
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="Enter your username"
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="your@email.com"
          />
        </div>

        <!-- Password  -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="••••••••"
          />
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="••••••••"
          />
        </div>

        <!-- Error Message -->
        {#if form?.message}
          <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {form.message}
          </div>
        {/if}

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 focus:ring-4 focus:ring-amber-300 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign up
        </button>
      </form>


      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      <!-- Login  -->
      <div class="text-center">
        <p class="text-gray-600">
          Already have an account?
          <a href="/login" class="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
    <!-- Terms and Privacy -->
    <p class="text-center text-sm text-gray-500 mt-6">
      By signing up, you agree to our
      <a href="/terms" class="text-amber-600 hover:text-amber-700 underline">terms of use</a>
      and our
      <a href="/privacy" class="text-amber-600 hover:text-amber-700 underline">privacy policy</a>
    </p>
  </div>
</div>
