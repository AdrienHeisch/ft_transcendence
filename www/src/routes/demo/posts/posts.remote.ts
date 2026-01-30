import { error } from "@sveltejs/kit";
import * as z from "zod";
import { form } from "$app/server";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const sendPost = form(
  z.object({
    content: z.string(),
  }),
  async ({ content }) => {
    const user = requireLogin();
    try {
      await db.insert(schema.post).values({
        id: crypto.randomUUID(),
        author: user.id,
        content,
        postedAt: new Date(),
      });
    } catch {
      error(500, "Failed to post");
    }
    console.log("Done");
  },
);
