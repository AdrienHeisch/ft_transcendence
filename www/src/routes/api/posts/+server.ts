import { getPosts } from "$lib/posts.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const posts = await getPosts({});
  return new Response(JSON.stringify(posts));
};
