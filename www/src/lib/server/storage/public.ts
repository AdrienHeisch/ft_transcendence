import * as storage from "./";

export const get = (key: string) => storage.get("public", key);

export const upload = (key: string, file: File) =>
  storage.upload("public", key, file);
