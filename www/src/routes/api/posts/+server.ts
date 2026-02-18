import { getPosts } from "$lib/posts.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const author = url.searchParams.get("author") ?? undefined;
  const pet = url.searchParams.get("pet") ?? undefined;
  // TODO sortBy
  const posts = (await getPosts({ author, pet })).map((post) => ({
    ...post,
    author: post.author.id,
  }));
  return new Response(JSON.stringify(posts));
};
