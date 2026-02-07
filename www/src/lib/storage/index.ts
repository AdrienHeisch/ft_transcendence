// TODO find a way to use the environment variable in both SvelteKit and regular Bun
const S3_BUCKET = "public";

export const PublicStorage = {
  url: (key: string) => `/${S3_BUCKET}/${key}`,
};

export const USER_AVATAR_PREFIX = "user/avatar/";

// TODO avatars
export const getUserAvatar = (user: { id: string }) =>
  PublicStorage.url(`${USER_AVATAR_PREFIX + user.id}.png`);

export const PET_AVATAR_PREFIX = "pet/avatar/";

export const getPetAvatar = (pet: { id: string }) =>
  PublicStorage.url(`${PET_AVATAR_PREFIX + pet.id}.png`);

export const POST_IMAGE_PREFIX = "post/image/";

export const getPostImage = (post: { id: string }) =>
  PublicStorage.url(`${POST_IMAGE_PREFIX + post.id}.png`);
