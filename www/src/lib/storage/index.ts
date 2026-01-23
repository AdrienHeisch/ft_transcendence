import { env } from "$env/dynamic/private";

export const PublicStorage = {
  url: (key: string) => `/${env.S3_BUCKET}/${key}`,
};
