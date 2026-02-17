import { error } from "@sveltejs/kit";
import { and, desc, eq, getTableColumns, inArray } from "drizzle-orm";
import z from "zod";
import { command, form, query } from "$app/server";
import { MAX_FILE_SIZE } from "$env/static/private";
import { isLoggedIn, requireLogin } from "$lib/server/auth";
import type { Post, User } from "$lib/server/db/schema";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";
import { PublicStorage } from "./server/storage";
import { POST_IMAGE_PREFIX } from "./storage";

export type PostData = Omit<Post, "author"> & { author: User };

const { apiKey, passwordHash, ...userColumns } = getTableColumns(schema.user);

export const getPost = query.batch(z.string(), async (posts) => {
  const result = await db
    .select({
      ...getTableColumns(schema.post),
      author: userColumns,
    })
    .from(schema.post)
    .where(inArray(schema.post.id, posts))
    .innerJoin(schema.user, eq(schema.user.id, schema.post.author));
  const lookup = new Map(result.map((post) => [post.id, post]));
  return (post) => lookup.get(post);
});

export const getPosts = query(
  z.object({ author: z.string().optional(), pet: z.string().optional() }),
  async ({ author, pet }) => {
    return db
      .select({
        ...getTableColumns(schema.post),
        author: userColumns,
      })
      .from(schema.post)
      .where(
        and(
          author ? eq(schema.user.id, author) : undefined,
          pet ? eq(schema.post.pet, pet) : undefined,
        ),
      )
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
      author: userColumns,
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

export const editComment = form(
  z.object({ id: z.string(), content: z.string() }),
  async ({ id, content }) => {
    const user = requireLogin();
    const [comment] = await db
      .update(schema.postComment)
      .set({ content })
      .where(
        and(
          eq(schema.postComment.id, id),
          eq(schema.postComment.author, user.id),
        ),
      )
      .returning();
    if (comment) {
      await Promise.all([
        getPostCommentCount(comment.post).refresh(),
        getPostComments(comment.post).refresh(),
      ]);
    }
  },
);

export const deleteComment = command(z.string(), async (id) => {
  const user = requireLogin();
  const [comment] = await db
    .delete(schema.postComment)
    .where(
      and(
        eq(schema.postComment.id, id),
        eq(schema.postComment.author, user.id),
      ),
    )
    .returning();
  if (comment) {
    await Promise.all([
      getPostCommentCount(comment.post).refresh(),
      getPostComments(comment.post).refresh(),
    ]);
  }
});

export const createPost = form(
  z.object({
    content: z.string(),
    pet: z.string().optional(),
    file: z.custom<File>(),
  }),
  async ({ content, pet, file }) => {
    const user = requireLogin();
    const id = crypto.randomUUID();
    if (file.size > Number(MAX_FILE_SIZE)) {
      error(413);
    }
    const fileKey = POST_IMAGE_PREFIX + id;
    try {
      await PublicStorage.upload(fileKey, file, file.type);
    } catch {
      error(500, "Failed to create post");
    }
    try {
      await db.insert(schema.post).values({
        id,
        author: user.id,
        content,
        pet: pet && pet.length > 0 ? pet : undefined,
        postedAt: new Date(),
      });
    } catch {
      await PublicStorage.delete(fileKey);
      error(500, "Failed to create post");
    }
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
  await PublicStorage.delete(POST_IMAGE_PREFIX + id);
  await getPosts({}).refresh();
});

export const getPostFileType = query(z.string(), async (id) => {
  return (await PublicStorage.stat(POST_IMAGE_PREFIX + id)).type;
});
