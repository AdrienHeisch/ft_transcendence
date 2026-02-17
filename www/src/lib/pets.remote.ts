import { error, redirect } from "@sveltejs/kit";
import { and, eq, getTableColumns, ilike, inArray, or, sql } from "drizzle-orm";
import z from "zod";
import { resolve } from "$app/paths";
import { command, form, query } from "$app/server";
import { MAX_FILE_SIZE } from "$env/static/private";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "$lib/server/storage";
import { PET_AVATAR_PREFIX } from "$lib/storage";

export const getPet = query.batch(z.string(), async (pets) => {
  const result = await db
    .select()
    .from(schema.pet)
    .where(inArray(schema.pet.id, pets));
  const lookup = new Map(result.map((pet) => [pet.id, pet]));
  return (pet) => lookup.get(pet);
});

export const getPets = query(
  z.object({
    owner: z.string().optional(),
    search: z.string(),
    species: z.string().optional(),
    sortBy: z.custom<"name" | "species">(),
    offset: z.int().optional(),
    limit: z.int().optional(),
  }),
  ({ owner, search, species, sortBy, offset, limit }) => {
    const query = db
      .select({
        ...getTableColumns(schema.pet),
        count: sql`count(*) over()`.mapWith(Number),
      })
      .from(schema.pet)
      .innerJoin(schema.user, eq(schema.user.id, schema.pet.ownerId))
      .where(
        and(
          or(
            ilike(schema.pet.name, `%${search}%`),
            ilike(schema.user.firstName, `%${search}%`),
            ilike(schema.user.lastName, `%${search}%`),
          ),
          owner ? eq(schema.pet.ownerId, owner) : undefined,
          species ? eq(schema.pet.species, species) : undefined,
        ),
      )
      .orderBy(sortBy === "name" ? schema.pet.name : schema.pet.species)
      .$dynamic();
    if (offset) query.offset(offset);
    if (limit) query.limit(limit);
    return query;
  },
);

export const createPet = form(
  z.object({
    name: z.string(),
    birth: z.string(),
    bio: z.string(),
    species: z.string(),
    breed: z.string(),
    avatar: z.custom<File>(),
  }),
  async ({ name, birth, bio, species, breed, avatar }) => {
    const user = requireLogin();
    const id = crypto.randomUUID();
    const fileKey = `${PET_AVATAR_PREFIX + id}.png`;
    if (avatar.size > Number(MAX_FILE_SIZE)) {
      error(413);
    }
    try {
      await PublicStorage.upload(fileKey, avatar);
    } catch {
      error(500, "Failed to create pet profile");
    }
    try {
      await db.insert(schema.pet).values({
        id,
        ownerId: user.id,
        name,
        birth: new Date(birth),
        bio,
        species,
        breed,
        hasAvatar: true,
      });
    } catch {
      await PublicStorage.delete(fileKey);
      error(500, "Failed to create pet profile");
    }
    redirect(303, resolve(`/pets/${id}`));
  },
);

export const updatePet = form(
  z.object({
    id: z.string(),
    name: z.string(),
    bio: z.string(),
    avatar: z.custom<File>().optional(),
    removeAvatar: z.string(),
  }),
  async (data) => {
    const { id, avatar, removeAvatar, ...values } = data;
    const [owner] = await db
      .select({ id: schema.pet.ownerId })
      .from(schema.pet)
      .where(eq(schema.pet.id, id));
    if (owner?.id !== requireLogin().id) {
      error(403);
    }
    if (avatar) {
      await PublicStorage.upload(`${PET_AVATAR_PREFIX + id}.png`, avatar);
      await db
        .update(schema.pet)
        .set({ ...values, hasAvatar: true })
        .where(eq(schema.pet.id, id));
    } else if (removeAvatar === "true") {
      await PublicStorage.delete(`${PET_AVATAR_PREFIX + id}.png`);
      await db
        .update(schema.pet)
        .set({ ...values, hasAvatar: false })
        .where(eq(schema.pet.id, id));
    } else {
      await db
        .update(schema.pet)
        .set({ ...values })
        .where(eq(schema.pet.id, id));
    }
    await getPet(id).refresh();
  },
);

export const deletePet = command(z.string(), async (petId) => {
  const user = requireLogin();

  const [pet] = await db
    .select()
    .from(schema.pet)
    .where(eq(schema.pet.id, petId));
  if (!pet) {
    error(404);
  }

  if (pet.ownerId !== user.id) {
    error(401);
  }

  await PublicStorage.delete(`${PET_AVATAR_PREFIX + petId}.png`);
  await db.delete(schema.pet).where(eq(schema.pet.id, petId));
});
