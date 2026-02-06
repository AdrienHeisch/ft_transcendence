import { lt } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  pgEnum,
  pgTable,
  point,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof session.$inferSelect;

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  bio: text("bio").notNull(),
  city: text("city").references(() => city.name),
  hasAvatar: boolean("has_avatar").notNull(),
  online: boolean("online").notNull(),
});

export type User = typeof user.$inferSelect;

export const pet = pgTable("pet", {
  id: uuid("id").primaryKey(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed").notNull(),
  birth: timestamp("birth", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  bio: text("description").notNull(),
  hasAvatar: boolean("has_avatar").notNull(),
});

export type Pet = typeof pet.$inferSelect;

export const usersPair = pgTable(
  "users_pair",
  {
    id: uuid("id").notNull().unique(),
    left: uuid("left")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    right: uuid("right")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    friends: boolean().notNull(),
    pending: uuid().references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.left, table.right] }),
    check("ids_order", lt(table.left, table.right)),
  ],
);

export type UsersPair = typeof usersPair.$inferSelect;

export const chatMessage = pgTable("chat_message", {
  id: uuid("id").primaryKey(),
  friendsId: uuid("friends_id")
    .notNull()
    .references(() => usersPair.id, { onDelete: "cascade" }),
  author: uuid("author")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type ChatMessage = typeof chatMessage.$inferSelect;

export const post = pgTable("post", {
  id: uuid("id").primaryKey(),
  author: uuid("author")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  postedAt: timestamp("posted_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Post = typeof post.$inferSelect;

export const postLike = pgTable(
  "post_like",
  {
    post: uuid("post")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    user: uuid("user")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.post, table.user] })],
);

export type PostLike = typeof postLike.$inferSelect;

export const postComment = pgTable("post_comment", {
  id: uuid("id").primaryKey(),
  post: uuid("post")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  author: uuid("author")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  postedAt: timestamp("posted_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type PostComment = typeof postComment.$inferSelect;

export const city = pgTable(
  "city",
  {
    code: text("code").primaryKey(),
    name: text("name").notNull(),
    location: point("location", { mode: "tuple" }).notNull(),
  },
  (table) => [index("spatial_index").using("gist", table.location)],
);

export type City = typeof city.$inferSelect;

export const associationType = pgEnum("association_type", [
  "Sanctuary",
  "Rescue",
  "Adoption",
  "Care",
]);

export const associationTypeSchema = createSelectSchema(associationType);
export type AssociationType = (typeof associationType.enumValues)[number];

export const association = pgTable("association", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
  city: text("city").references(() => city.name),
  type: associationType("type").notNull(),
  foundedAt: timestamp("founded_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Association = typeof association.$inferSelect;
