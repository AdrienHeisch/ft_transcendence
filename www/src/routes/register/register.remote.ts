import { hash } from "@node-rs/argon2";
import { error, redirect } from "@sveltejs/kit";
import z from "zod";
import { resolve } from "$app/paths";
import { form, getRequestEvent } from "$app/server";
import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

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
    return redirect(302, resolve("/demo/auth"));
  },
);
