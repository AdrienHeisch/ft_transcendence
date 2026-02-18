import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { MAX_FILE_SIZE } from "$env/static/private";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "$lib/server/storage";
import { USER_AVATAR_PREFIX } from "$lib/storage";

export async function updatePerson(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    city?: string;
    avatar?: File;
    removeAvatar?: boolean;
  },
) {
  const { avatar, removeAvatar = false, ...values } = data;
  if (avatar) {
    if (avatar.size > Number(MAX_FILE_SIZE)) {
      error(413);
    }
    if (!avatar.type.startsWith("image/")) {
      error(415);
    }
    await PublicStorage.upload(USER_AVATAR_PREFIX + id, avatar, avatar.type);
    return (
      await db
        .update(schema.user)
        .set({ ...values, hasAvatar: true })
        .where(eq(schema.user.id, id))
        .returning()
    ).at(0);
  } else if (removeAvatar) {
    await PublicStorage.delete(USER_AVATAR_PREFIX + id);
    return (
      await db
        .update(schema.user)
        .set({ ...values, hasAvatar: false })
        .where(eq(schema.user.id, id))
        .returning()
    ).at(0);
  } else {
    return (
      await db
        .update(schema.user)
        .set(values)
        .where(eq(schema.user.id, id))
        .returning()
    ).at(0);
  }
}
