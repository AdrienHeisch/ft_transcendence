import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof session.$inferSelect;

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
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
  id: serial("id").primaryKey(),
  ownerId: serial("owner_id").notNull(),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed").notNull(),
});

export type Pet = typeof user.$inferSelect;

export const friendsPair = pgTable("friends_pair", {
  id: serial("id").primaryKey(),
  left: serial("left").notNull(),
  right: serial("right").notNull(),
});

export type FriendsPair = typeof friendsPair.$inferSelect;

export const chatMessage = pgTable("chat_message", {
  id: serial("id").primaryKey(),
  friends_id: serial("friends_id").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type ChatMessage = typeof chatMessage.$inferInsert;
