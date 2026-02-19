import { eq } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PrivateStorage, PublicStorage } from "$lib/server/storage";
import {
  MESSAGE_FILE_PREFIX,
  PET_AVATAR_PREFIX,
  POST_IMAGE_PREFIX,
  USER_AVATAR_PREFIX,
} from "$lib/storage";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const { passwordHash, ...user } = requireLogin();
  const data = {
    ...user,
    pets: await db
      .select()
      .from(schema.pet)
      .where(eq(schema.pet.ownerId, user.id)),
    posts: await db
      .select()
      .from(schema.post)
      .where(eq(schema.post.author, user.id)),
    comments: await db
      .select()
      .from(schema.postComment)
      .where(eq(schema.postComment.author, user.id)),
    messages: await db
      .select()
      .from(schema.chatMessage)
      .where(eq(schema.chatMessage.author, user.id)),
  };
  const publicFileKeys = [
    ...user.hasAvatar ? [USER_AVATAR_PREFIX + user.id] : [],
    ...data.pets.filter(pet => pet.hasAvatar).map((pet) => PET_AVATAR_PREFIX + pet.id),
    ...data.posts.map((pet) => POST_IMAGE_PREFIX + pet.id),
  ];
  const privateFileKeys = [
    ...data.messages
      .filter((message) => message.isFile)
      .map((message) => MESSAGE_FILE_PREFIX + message.id),
  ];
  console.log(publicFileKeys, privateFileKeys);
  const files = await Promise.all(
    [
      ...publicFileKeys.map((key) => ({
        key,
        stat: PublicStorage.stat(key),
        file: PublicStorage.get(key).arrayBuffer(),
      })),
      ...privateFileKeys.map((key) => ({
        key,
        stat: PrivateStorage.stat(key),
        file: PrivateStorage.get(key).arrayBuffer(),
      })),
    ].map(
      async ({ key, stat, file }) => {
        const ext = (await stat).type.split("/")[1];
        return [key + (ext ? "." : "") + ext, await file] satisfies readonly [string, ArrayBuffer];
      }
    ),
  );
  return new Response(
    await new Bun.Archive(
      {
        "data.json": JSON.stringify(data, undefined, " "),
        ...Object.fromEntries(new Map(files).entries()),
      },
      { compress: "gzip" },
    ).blob(),
    {
      headers: {
        "Content-Disposition": `attachment; filename="bibis_farm_data_${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}.tar.gz"`,
        "Content-Type": "application/gzip",
      },
    },
  );
};
