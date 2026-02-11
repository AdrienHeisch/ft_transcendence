import { type S3ListObjectsOptions, s3 } from "bun";
import { PublicStorage as _PublicStorage } from "../../storage";

export const PublicStorage = {
  url: (key: string) => _PublicStorage.url(key),
  get: (key: string) => s3.file(key),
  exists: (key: string) => s3.exists(key),
  upload: async (key: string, file: Blob | File) =>
    s3.write(key, await file.bytes()),
  list: (input?: S3ListObjectsOptions) => s3.list(input),
  delete: (key: string) => s3.delete(key),
};

const bucket = process.env.S3_BUCKET_PRIVATE;

export const PrivateStorage = {
  url: (key: string, expiresIn?: number) => {
    console.error(`bucket: ${bucket}`);
    return s3.presign(key, {
      endpoint: process.env.ORIGIN,
      expiresIn,
      bucket,
    });
  },
  get: (key: string) => s3.file(key, { bucket }),
  exists: (key: string) => s3.exists(key, { bucket }),
  upload: async (key: string, file: Blob | File) =>
    s3.write(key, await file.bytes(), { bucket }),
  list: (input?: S3ListObjectsOptions) => s3.list(input, { bucket }),
  delete: (key: string) => s3.delete(key, { bucket }),
};
