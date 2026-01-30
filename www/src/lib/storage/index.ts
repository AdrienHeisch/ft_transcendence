import { env } from "$env/dynamic/public";

export const PublicStorage = {
  url: (key: string) => `/${env.PUBLIC_S3_BUCKET}/${key}`,
};

export const USER_AVATAR_PREFIX = "user/avatar/";

// TODO avatars
export const getUserAvatar = (user: { id: string }) =>
  // PublicStorage.url(`user/avatar/${user.id}`);
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
