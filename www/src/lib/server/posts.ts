import { error } from "@sveltejs/kit";
import { PUBLIC_MAX_FILE_SIZE } from "$env/static/public";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "$lib/server/storage";
import { POST_IMAGE_PREFIX } from "$lib/storage";

export const createPost = async ({
  author,
  content,
  pet,
  file,
}: {
  author: string;
  content: string;
  pet?: string;
  file: File;
}) => {
  const id = crypto.randomUUID();
  if (file.size > Number(PUBLIC_MAX_FILE_SIZE)) {
    error(413);
  }
  if (!(file.type.startsWith("image/") || file.type.startsWith("video/"))) {
    error(415);
  }
  const fileKey = POST_IMAGE_PREFIX + id;
  try {
    await PublicStorage.upload(fileKey, file, file.type);
  } catch {
    error(500, "Failed to create post");
  }
  try {
    return (
      await db
        .insert(schema.post)
        .values({
          id,
          author,
          content,
          pet,
          postedAt: new Date(),
        })
        .returning()
    )[0];
  } catch {
    await PublicStorage.delete(fileKey);
    error(500, "Failed to create post");
  }
};
