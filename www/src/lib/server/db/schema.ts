import { lt } from "drizzle-orm";
import {
  boolean,
  check,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

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
  age: text("age"),
  description: text("description"),
  photo: text("photo"),
});

export type Pet = typeof user.$inferSelect;

export const friendsPair = pgTable(
  "friends_pair",
  {
    id: uuid("id").notNull().unique(),
    left: uuid("left")
      .notNull()
      .references(() => user.id),
    right: uuid("right")
      .notNull()
      .references(() => user.id),
    pending: uuid().references(() => user.id),
  },
  (table) => [
    primaryKey({ columns: [table.left, table.right] }),
    check("ids_order", lt(table.left, table.right)),
  ],
);

export type FriendsPair = typeof friendsPair.$inferSelect;

export const chatMessage = pgTable("chat_message", {
  id: uuid("id").primaryKey(),
  friendsId: uuid("friends_id")
    .notNull()
    .references(() => friendsPair.id, { onDelete: "cascade" }),
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
    .references(() => user.id),
  content: text("content").notNull(),
  postedAt: timestamp("posted_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Post = typeof post.$inferSelect;
