// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/// <reference lib="deno.ns" />
/// <reference path="../.svelte-kit/ambient.d.ts" />

declare global {
  namespace App {
    interface Locals {
      user: import("$lib/server/auth").SessionValidationResult["user"];
      session: import("$lib/server/auth").SessionValidationResult["session"];
    }

    interface Error {}
    interface PageData {}
    interface PageState {}
    interface Platform {}
  }
}

export {};
