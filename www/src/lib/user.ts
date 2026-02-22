import type { UserPublic } from "$lib/server/db/schema";

export function getFullName(user: UserPublic) {
  return user.isAssociation ? user.name : `${user.firstName} ${user.lastName}`;
}
