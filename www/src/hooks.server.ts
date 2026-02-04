import type { Handle, RequestEvent } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";

const handleAuth = async (event: RequestEvent) => {
  const sessionToken = event.cookies.get(auth.sessionCookieName);

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return;
  }

  const { session, user } = await auth.validateSessionToken(sessionToken);

  if (session) {
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    auth.deleteSessionTokenCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;
};

export const handle: Handle = async ({ event, resolve }) => {
  handleAuth(event);
  return resolve(event);
};
