import { error } from "@sveltejs/kit";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import z from "zod";
import { command, form, query } from "$app/server";
import { isLoggedIn, requireLogin } from "$lib/server/auth";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const getPosts = query(
  z.object({ author: z.string().optional() }),
  async ({ author }) => {
    return db
      .select({
        ...getTableColumns(schema.post),
        author: { ...getTableColumns(schema.user) },
      })
      .from(schema.post)
      .where(author ? eq(schema.user.id, author) : undefined)
      .innerJoin(schema.user, eq(schema.user.id, schema.post.author))
      .orderBy(desc(schema.post.postedAt))
      .limit(10);
  },
);

export const likePost = command(z.string(), async (id) => {
  if (!isLoggedIn()) error(401);
  const user = requireLogin();
  await db.insert(schema.postLike).values({ post: id, user: user.id });
  await Promise.all([getPostLikes(id).refresh(), isPostLiked(id).refresh()]);
});

export const unlikePost = command(z.string(), async (id) => {
  if (!isLoggedIn()) error(401);
  const user = requireLogin();
  await db
    .delete(schema.postLike)
    .where(
      and(eq(schema.postLike.post, id), eq(schema.postLike.user, user.id)),
    );
  await Promise.all([getPostLikes(id).refresh(), isPostLiked(id).refresh()]);
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

export const createComment = form(
  z.object({ post: z.string(), content: z.string() }),
  async ({ post, content }) => {
    const user = requireLogin();
    await db.insert(schema.postComment).values({
      id: crypto.randomUUID(),
      post,
      author: user.id,
      content,
      postedAt: new Date(),
    });
    await Promise.all([
      getPostCommentCount(post).refresh(),
      getPostComments(post).refresh(),
    ]);
  },
);

export const createPost = form(
  z.object({ content: z.string() }),
  async ({ content }) => {
    const user = requireLogin();
    await db.insert(schema.post).values({
      id: crypto.randomUUID(),
      author: user.id,
      content,
      postedAt: new Date(),
    });
    await getPosts({}).refresh();
  },
);

export const editPost = form(
  z.object({ id: z.string(), content: z.string() }),
  async ({ id, content }) => {
    const user = requireLogin();
    await db
      .update(schema.post)
      .set({ content })
      .where(and(eq(schema.post.id, id), eq(schema.post.author, user.id)));
    await getPosts({}).refresh();
  },
);
export const deletePost = command(z.string(), async (id) => {
  const user = requireLogin();
  await db
    .delete(schema.post)
    .where(and(eq(schema.post.id, id), eq(schema.post.author, user.id)));
  await getPosts({}).refresh();
});
