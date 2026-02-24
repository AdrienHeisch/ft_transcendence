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

async function register(
  id: string,
  email: string,
  password: string,
  isAssociation: boolean,
) {
  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await db.insert(schema.user).values({
    id,
    apiKey: auth.generateSessionToken(), // TODO is this ok ?
    email,
    passwordHash,
    person: isAssociation ? null : id,
    association: isAssociation ? id : null,
    online: false,
  });

  const sessionToken = auth.generateSessionToken();
  const session = await auth.createSession(sessionToken, id);
  auth.setSessionTokenCookie(
    getRequestEvent(),
    sessionToken,
    session.expiresAt,
  );
}

export const registerPerson = form(
  z.object({
    email: z.email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
  }),
  async ({ email, password, firstName, lastName, city }) => {
    // if (!validatePassword(password)) { // TODO password validation
    //   return fail(400, { message: "Invalid password" });
    // }

    const id = crypto.randomUUID();
    try {
      await db.insert(schema.person).values({
        id,
        firstName,
        lastName,
        description: "",
        city,
        hasAvatar: false,
      });
      await register(id, email, password, false);
    } catch {
      error(500, { message: "An error has occurred" });
    }
    redirect(302, resolve(`/persons/${id}`)); // TODO register as association
  },
);

export const registerAssociation = form(
  z.object({
    email: z.email(),
    password: z.string(),
    name: z.string(),
    phone: z.string(),
    type: schema.associationTypeSchema,
    foundedAt: z.iso.date().transform((foundedAt) => new Date(foundedAt)),
    city: z.string(),
  }),
  async ({ email, password, name, phone, type, foundedAt, city }) => {
    // if (!validatePassword(password)) { // TODO password validation
    //   return fail(400, { message: "Invalid password" });
    // }

    const id = crypto.randomUUID();
    try {
      await db.insert(schema.association).values({
        id,
        name,
        phone,
        type,
        foundedAt,
        description: "",
        city,
        hasAvatar: false,
      });
      await register(id, email, password, true);
    } catch {
      error(500, { message: "An error has occurred" });
    }
    redirect(302, resolve(`/associations/${id}`)); // TODO register as association
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
      await PublicStorage.delete(POST_IMAGE_PREFIX + post.id);
    });

    (
      await db.select().from(schema.pet).where(eq(schema.pet.ownerId, user.id))
    ).forEach(async (pet) => {
      await PublicStorage.delete(PET_AVATAR_PREFIX + pet.id);
    });

    await PublicStorage.delete(USER_AVATAR_PREFIX + user.id);

    auth.deleteSessionTokenCookie(getRequestEvent());
    await db.delete(schema.user).where(eq(schema.user.id, user.id));
  },
);
