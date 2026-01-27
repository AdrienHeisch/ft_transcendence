import { redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";

export function requireLogin() {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    redirect(302, "/login");
  }

  return locals.user;
}

export function isLoggedIn() {
  return !!getRequestEvent().locals.user;
}
