import { error, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";

export function requireLogin() {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    redirect(302, "/demo/auth/login");
  }

  return locals.user;
}
