import { type S3ListObjectsOptions, s3 } from "bun";
import { env } from "$env/dynamic/private";
import { PublicStorage as _PublicStorage } from "$lib/storage";

export const PublicStorage = {
  url: (key: string) => _PublicStorage.url(key),
  get: (key: string) => s3.file(key),
  upload: async (key: string, file: File) => s3.write(key, await file.bytes()),
  list: (input?: S3ListObjectsOptions) => s3.list(input),
};

const bucket = env.S3_BUCKET_PRIVATE;

export const PrivateStorage = {
  url: (key: string, expiresIn?: number) => {
    console.error(`bucket: ${bucket}`);
    return s3.presign(key, {
      endpoint: env.ORIGIN,
      expiresIn,
      bucket,
    });
  },
  get: (key: string) => s3.file(key, { bucket }),
  upload: async (key: string, file: File) =>
    s3.write(key, await file.bytes(), { bucket }),
  list: (input?: S3ListObjectsOptions) => s3.list(input, { bucket }),
};
