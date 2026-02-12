import { hash, verify } from "@node-rs/argon2";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import z from "zod";
import { resolve } from "$app/paths";
import { command, form, getRequestEvent } from "$app/server";
import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "./server/storage";
import {
  PET_AVATAR_PREFIX,
  POST_IMAGE_PREFIX,
  USER_AVATAR_PREFIX,
} from "./storage";

export const register = form(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: z.string(),
  }),
  async ({ firstName, lastName, email, password }) => {
    // if (!validatePassword(password)) { // TODO password validation
    //   return fail(400, { message: "Invalid password" });
    // }

    const userId = crypto.randomUUID();
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    try {
      await db.insert(schema.user).values({
        id: userId,
        email,
        passwordHash,
        firstName,
        lastName,
        bio: "",
        hasAvatar: false,
        online: false,
      });

      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, userId);
      auth.setSessionTokenCookie(
        getRequestEvent(),
        sessionToken,
        session.expiresAt,
      );
    } catch {
      return error(500, { message: "An error has occurred" });
    }
    return redirect(302, resolve("/"));
  },
);

export const login = form(
  z.object({ email: z.email(), password: z.string() }),
  async ({ email, password }) => {
    const results = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, email));

    const existingUser = results.at(0);
    if (!existingUser) {
      return error(400, { message: "Incorrect username or password" });
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return error(400, { message: "Incorrect username or password" });
    }

    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, existingUser.id);
    auth.setSessionTokenCookie(
      getRequestEvent(),
      sessionToken,
      session.expiresAt,
    );

    return redirect(302, "/");
  },
);

export const logout = command(async (): Promise<void> => {
  const event = getRequestEvent();
  if (!event.locals.session) {
    return error(401);
  }
  await auth.invalidateSession(event.locals.session.id);
  auth.deleteSessionTokenCookie(event);
});

export const updateCredentials = form(
  z.object({
    currentPassword: z.string(),
    email: z.email().or(z.string().max(0)).optional(),
    password: z.string().optional(),
  }),
  async ({ currentPassword, email, password }) => {
    if (email?.length === 0) email = undefined;
    if (password?.length === 0) password = undefined;

    const user = auth.requireLogin();

    //TODO extract to function (present in login)
    const validPassword = await verify(user.passwordHash, currentPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return error(400, { message: "Incorrect username or password" });
    }

    const passwordHash = password
      ? await hash(password, {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        })
      : undefined;

    await db
      .update(schema.user)
      .set({ email, passwordHash })
      .where(eq(schema.user.id, user.id));
  },
);

export const deleteAccount = form(
  z.object({
    password: z.string(),
  }),
  async ({ password }) => {
    const user = auth.requireLogin();

    //TODO extract to function (present in login)
    const validPassword = await verify(user.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return error(400, { message: "Incorrect username or password" });
    }

    (
      await db.select().from(schema.post).where(eq(schema.post.author, user.id))
    ).forEach(async (post) => {
      await PublicStorage.delete(`${POST_IMAGE_PREFIX + post.id}.png`);
    });

    (
      await db.select().from(schema.pet).where(eq(schema.pet.ownerId, user.id))
    ).forEach(async (pet) => {
      await PublicStorage.delete(`${PET_AVATAR_PREFIX + pet.id}.png`);
    });

    await PublicStorage.delete(`${USER_AVATAR_PREFIX + user.id}.png`);

    auth.deleteSessionTokenCookie(getRequestEvent());
    await db.delete(schema.user).where(eq(schema.user.id, user.id));
  },
);
