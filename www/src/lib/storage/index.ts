export enum Bucket {
  Public = "public",
}

export const url = (bucket: Bucket, key: string) => `/${bucket}/${key}`;
