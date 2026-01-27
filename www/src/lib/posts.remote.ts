import { error } from "@sveltejs/kit";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import z from "zod";
import { command, query } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { isLoggedIn, requireLogin } from "./auth";
import { db } from "./server/db";

export const getPosts = query(async () => {
  return db
    .select({
      ...getTableColumns(schema.post),
      author: { ...getTableColumns(schema.user) },
    })
    .from(schema.post)
    .innerJoin(schema.user, eq(schema.user.id, schema.post.author))
    .orderBy(desc(schema.post.postedAt));
});

export const likePost = command(z.string(), async (id) => {
  if (!isLoggedIn()) error(401);
  const user = requireLogin();
  await db.insert(schema.postLike).values({ post: id, user: user.id });
  await getPostLikes(id).refresh();
  await isPostLiked(id).refresh();
});

export const unlikePost = command(z.string(), async (id) => {
  if (!isLoggedIn()) error(401);
  const user = requireLogin();
  await db
    .delete(schema.postLike)
    .where(
      and(eq(schema.postLike.post, id), eq(schema.postLike.user, user.id)),
    );
  await getPostLikes(id).refresh();
  await isPostLiked(id).refresh();
});

export const getPostLikes = query(z.string(), (id) => {
  return db.$count(schema.postLike, eq(schema.postLike.post, id));
});

export const isPostLiked = query(z.string(), (id) => {
  if (!isLoggedIn()) return false;
  const user = requireLogin();
  return db
    .select()
    .from(schema.postLike)
    .where(and(eq(schema.postLike.post, id), eq(schema.postLike.user, user.id)))
    .then((res) => res.length > 0);
});

export const getPostCommentCount = query(z.string(), (id) => {
  return db.$count(schema.postComment, eq(schema.postComment.post, id));
});

export const getPostComments = query(z.string(), (id) => {
  return db
    .select({
      ...getTableColumns(schema.postComment),
      author: { ...getTableColumns(schema.user) },
    })
    .from(schema.postComment)
    .where(eq(schema.postComment.post, id))
    .innerJoin(schema.user, eq(schema.user.id, schema.postComment.author));
});
