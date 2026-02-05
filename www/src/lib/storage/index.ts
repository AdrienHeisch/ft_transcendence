const env = await (async () => {
  try {
    return (await import("$env/dynamic/public")).env;
  } catch {
    return process.env as { PUBLIC_S3_BUCKET: string };
  }
})();

export const PublicStorage = {
  url: (key: string) => `/${env.PUBLIC_S3_BUCKET}/${key}`,
};

export const USER_AVATAR_PREFIX = "user/avatar/";

// TODO avatars
export const getUserAvatar = (user: { id: string }) =>
  PublicStorage.url(`${USER_AVATAR_PREFIX + user.id}.png`);

export const POST_IMAGE_PREFIX = "post/image/";

export const getPostImage = (post: { id: string }) =>
  PublicStorage.url(`${POST_IMAGE_PREFIX + post.id}.png`);
