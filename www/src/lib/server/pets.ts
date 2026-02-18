import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { MAX_FILE_SIZE } from "$env/static/private";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "$lib/server/storage";
import { PET_AVATAR_PREFIX } from "$lib/storage";

export async function getPetOwner(pet: { id: string }) {
  const [owner] = await db
    .select({ id: schema.pet.ownerId })
    .from(schema.pet)
    .where(eq(schema.pet.id, pet.id));
  return owner ?? undefined;
}

export async function createPet({
  ownerId,
  name,
  birth,
  bio,
  species,
  breed,
  avatar,
}: {
  ownerId: string;
  name: string;
  birth: Date;
  bio: string;
  species: string;
  breed: string;
  avatar: File;
}) {
  const id = crypto.randomUUID();
  const fileKey = `${PET_AVATAR_PREFIX + id}`;
  if (avatar.size > Number(MAX_FILE_SIZE)) {
    error(413);
  }
  if (!avatar.type.startsWith("image/")) {
    error(415);
  }
  try {
    await PublicStorage.upload(fileKey, avatar, avatar.type);
  } catch {
    error(500, "Failed to create pet profile");
  }
  try {
    return (
      await db
        .insert(schema.pet)
        .values({
          id,
          ownerId,
          name,
          birth,
          bio,
          species,
          breed,
          hasAvatar: true,
        })
        .returning()
    )[0];
  } catch {
    await PublicStorage.delete(fileKey);
    error(500, "Failed to create pet profile");
  }
}

export async function updatePet(
  id: string,
  {
    name,
    bio,
    avatar,
    removeAvatar = false,
  }: {
    name?: string;
    bio?: string;
    avatar?: File;
    removeAvatar?: boolean;
  },
) {
  if (avatar) {
    if (avatar.size > Number(MAX_FILE_SIZE)) {
      error(413);
    }
    if (!avatar.type.startsWith("image/")) {
      error(415);
    }
    await PublicStorage.upload(PET_AVATAR_PREFIX + id, avatar, avatar.type);
    return (
      await db
        .update(schema.pet)
        .set({ name, bio, hasAvatar: true })
        .where(eq(schema.pet.id, id))
        .returning()
    ).at(0);
  } else if (removeAvatar) {
    await PublicStorage.delete(PET_AVATAR_PREFIX + id);
    return (
      await db
        .update(schema.pet)
        .set({ name, bio, hasAvatar: false })
        .where(eq(schema.pet.id, id))
        .returning()
    ).at(0);
  } else {
    return (
      await db
        .update(schema.pet)
        .set({ name, bio })
        .where(eq(schema.pet.id, id))
        .returning()
    ).at(0);
  }
}
