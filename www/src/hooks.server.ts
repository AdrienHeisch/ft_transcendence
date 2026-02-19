import { error, type Handle, type RequestEvent } from "@sveltejs/kit";
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

const handleApiAuth = async (event: RequestEvent) => {
  const apiKey = event.request.headers.get(auth.apiKeyHeader);
  if (!apiKey) {
    error(401);
  }
  event.locals.apiUser = await auth.validateApiKey(apiKey);
};

export const handle: Handle = async ({ event, resolve }) => {
  if (event.route.id?.startsWith("/api/")) {
    await handleApiAuth(event);
  } else {
    await handleAuth(event);
  }
  return resolve(event);
};
