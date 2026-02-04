import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { and, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./lib/server/db/schema";

const PORT = 3000;

type WebSocketData = {
  user: schema.User;
  chatId: string;
};

const client = postgres(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
);
const db = drizzle(client, { schema });

const server = Bun.serve({
  port: PORT,
  routes: {
    "/:id": async (req, server) => {
      const sessionToken = req.cookies.get(sessionCookieName);
      if (!sessionToken) {
        return new Response("Not authenticated", { status: 401 });
      }

      const { session, user } = await validateSessionToken(sessionToken);
      if (!session || !user) {
        return new Response("Not authenticated", { status: 401 });
      }

      const [chat] = await db
        .select()
        .from(schema.usersPair)
        .where(
          or(
            and(
              eq(schema.usersPair.left, user.id),
              eq(schema.usersPair.right, req.params.id),
            ),
            and(
              eq(schema.usersPair.left, req.params.id),
              eq(schema.usersPair.right, user.id),
            ),
          ),
        );
      if (!chat) {
        return new Response("Not part of this chat", { status: 403 });
      }

      if (server.upgrade(req, { data: { user, chatId: chat.id } })) {
        return; // Success !
      }
      return new Response("Upgrade failed", { status: 500 });
    },
  },
  websocket: {
    data: {} as WebSocketData,
    open(ws) {
      ws.subscribe(ws.data.chatId);
    },
    async message(ws, content) {
      const message: schema.ChatMessage = {
        id: crypto.randomUUID(),
        friendsId: ws.data.chatId,
        author: ws.data.user.id,
        content: content.toString(),
        sentAt: new Date(),
      };
      console.log(message);
      server.publish(ws.data.chatId, JSON.stringify(message));
      await db.insert(schema.chatMessage).values(message);
    },
    close(ws) {
      ws.unsubscribe(ws.data.chatId);
    },
  },
});
console.log(`Websocket server listening on port ${PORT}...`);

// TODO everything below is copy pasted from ./lib/server/auth.ts !

const sessionCookieName = "auth-session";

async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [result] = await db
    .select({
      // Adjust user table here to tweak returned data
      user: schema.user,
      session: schema.session,
    })
    .from(schema.session)
    .innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
    .where(eq(schema.session.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }
  const { session, user } = result;

  const sessionExpired = Date.now() >= session.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(schema.session).where(eq(schema.session.id, session.id));
    return { session: null, user: null };
  }

  return { session, user };
}
