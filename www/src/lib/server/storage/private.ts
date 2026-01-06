import * as storage from "./";

export const get = (key: string) => storage.get("private", key);
export const upload = (key: string, file: File) =>
  storage.upload("private", key, file);
