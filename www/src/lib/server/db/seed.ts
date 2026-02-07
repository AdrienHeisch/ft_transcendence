import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { reset, seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

export default async function seedDb() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  );
  const db = drizzle(client, { schema });
  const { city, ...tables } = schema;
  
  console.log("Resetting database...");
  await reset(db, tables);
  
  // Insert default cities if table is empty
  let cities = await db.select().from(city);
  if (cities.length === 0) {
    await db.insert(city).values([
      { code: "75056", name: "Paris", location: [2.3522, 48.8566] },
      { code: "69123", name: "Lyon", location: [4.8357, 45.764] },
      { code: "13055", name: "Marseille", location: [5.3698, 43.2965] },
      { code: "31555", name: "Toulouse", location: [1.4442, 43.6047] },
      { code: "06088", name: "Nice", location: [7.2619, 43.7102] },
    ]);
    cities = await db.select().from(city);
  }
  const cityNames = cities.map((city) => city.name);
  
  console.log("Seeding database...");
  await seed(db, tables, { seed: 1 }).refine((gen) => ({
    session: {
      count: 0,
    },
    user: {
      count: 20,
      columns: {
        bio: gen.loremIpsum(),
        online: gen.default({ defaultValue: false }),
        city: gen.valuesFromArray({ values: cityNames }),
      },
      with: {
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
        hasAvatar: gen.default({ defaultValue: false }),
      },
    },
    association: {
      columns: {
        name: gen.companyName(),
        logo: gen.valuesFromArray({ values: ["🐄"] }),
        city: gen.valuesFromArray({ values: cityNames }),
        animalsCount: gen.int({ minValue: 1, maxValue: 100 }),
        description: gen.loremIpsum(),
        foundedYear: gen.int({ minValue: 1960, maxValue: 2025 }),
        phone: gen.phoneNumber(),
        type: gen.valuesFromArray({
          values: ["Sanctuary", "Rescue", "Adoption", "Care"],
        }),
      },
    },
    post: {
      columns: {
        content: gen.loremIpsum(),
        postedAt: gen.date({ maxDate: new Date() }),
      },
      with: {
        postLike: [{ weight: 1, count: 1 }],
        postComment: [
          { weight: 0.5, count: 1 },
          { weight: 0.5, count: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        ],
      },
    },
    postComment: {
      columns: {
        content: gen.loremIpsum(),
        postedAt: gen.date({ maxDate: new Date() }),
      },
    },
    usersPair: {
      count: 20,
      columns: {
        friends: gen.default({ defaultValue: true }),
        pending: gen.default({ defaultValue: null }),
      },
      with: {
        chatMessage: [{ weight: 1, count: [10, 20, 30] }],
      },
    },
    chatMessage: {
      columns: {
        content: gen.loremIpsum(),
        sentAt: gen.date({ maxDate: new Date() }),
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
    })
    .where(eq(schema.user.id, userB.id));
  console.log("Done");
  client.end();
}
