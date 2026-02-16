export const PublicStorage = {
  url: (key: string) => `/public/${key}`,
};

export const PrivateStorage = {
  url: (key: string) => `/private/${key}`,
};

export const USER_AVATAR_PREFIX = "user/avatar/";

export const getUserAvatar = (user: { id: string; hasAvatar: boolean }) =>
  user.hasAvatar
    ? PublicStorage.url(`${USER_AVATAR_PREFIX + user.id}.png`)
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${user.id}`;

export const PET_AVATAR_PREFIX = "pet/avatar/";

export const getPetAvatar = (pet: { id: string; hasAvatar?: boolean }) =>
  pet.hasAvatar
    ? PublicStorage.url(`${PET_AVATAR_PREFIX + pet.id}.png`)
    : "/dog.png";

export const POST_IMAGE_PREFIX = "post/image/";

export const getPostImage = (post: { id: string }) =>
  PublicStorage.url(`${POST_IMAGE_PREFIX + post.id}.png`);

export const MESSAGE_FILE_PREFIX = "message/file/";

export const getMessageFile = (message: { id: string }) =>
  PrivateStorage.url(`${MESSAGE_FILE_PREFIX + message.id}.png`);
