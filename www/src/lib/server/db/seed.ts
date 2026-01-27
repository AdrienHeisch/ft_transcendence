import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { reset, seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

export default async function seedDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });
  console.log("Resetting database...");
  await reset(db, schema);
  console.log("Seeding database...");
  await seed(db, schema, { seed: 9 }).refine((gen) => ({
    user: {
      count: 20,
      columns: {
        bio: gen.loremIpsum(),
      },
      with: {
        session: [{ weight: 1, count: [1, 2] }],
        pet: [{ weight: 1, count: [1, 2, 3] }],
        post: [{ weight: 1, count: [5, 10, 15] }],
      },
    },
    pet: {
      columns: {
        species: gen.valuesFromArray({
          values: ["Cat", "Dog", "Cow", "Fish", "Horse"],
        }),
        breed: gen.valuesFromArray({
          values: ["Red", "Orange", "Black", "White", "Green"],
        }),
        bio: gen.loremIpsum(),
        age: gen.int({ minValue: 1, maxValue: 5 }),
        hasAvatar: gen.default({ defaultValue: true }),
      },
    },
    post: {
      columns: {
        content: gen.loremIpsum(),
        postedAt: gen.date({ maxDate: new Date(Date.now()) }),
      },
    },
    friendsPair: {
      count: 20,
      columns: {
        pending: gen.default({ defaultValue: null }),
      },
      with: {
        chatMessage: [{ weight: 1, count: [10, 20, 30] }],
      },
    },
    chatMessage: {
      columns: {
        content: gen.loremIpsum(),
      },
    },
  }));
  console.log("Inserting default entries...");
  const [userA, userB] = await db.select().from(schema.user).limit(2);
  await db
    .update(schema.user)
    .set({
      email: "mszymcza@student.42.fr",
      // TODO refactor this
      passwordHash: await hash("mszymcza", {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      }),
      firstName: "Maïa",
      lastName: "Szymczak",
      bio: "Cat person",
      hasAvatar: true,
      online: true,
    })
    .where(eq(schema.user.id, userA.id));
  await db
    .update(schema.user)
    .set({
      email: "aheisch@student.42.fr",
      // TODO refactor this
      passwordHash: await hash("aheisch", {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      }),
      firstName: "Adrien",
      lastName: "Heisch",
      bio: "Dog person",
      hasAvatar: true,
      online: true,
    })
    .where(eq(schema.user.id, userB.id));
  console.log("Done");
  client.end();
}
