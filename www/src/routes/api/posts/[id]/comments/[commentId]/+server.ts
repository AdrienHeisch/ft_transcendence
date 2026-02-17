import { getPostComments } from "$lib/posts.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id, commentId } }) => {
  const [comment] = (await getPostComments(id)).filter(
    (comment) => comment.id === commentId,
  );
  return new Response(JSON.stringify(comment));
};
