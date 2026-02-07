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

export const getUserAvatar = (user: { id: string; hasAvatar?: boolean }) =>
  user.hasAvatar
    ? PublicStorage.url(`${USER_AVATAR_PREFIX + user.id}.png`)
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${user.id}`;

export const POST_IMAGE_PREFIX = "post/image/";

export const getPostImage = (post: { id: string }) =>
  PublicStorage.url(`${POST_IMAGE_PREFIX + post.id}.png`);
