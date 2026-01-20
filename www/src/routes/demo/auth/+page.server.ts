import { fail, redirect } from "@sveltejs/kit";
import { requireLogin } from "$lib/auth";
import * as auth from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const user = requireLogin();
  return { user };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, "/demo/auth/login");
  },
};
