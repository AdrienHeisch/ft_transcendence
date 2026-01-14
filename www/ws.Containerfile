FROM oven/bun:1.3.5-debian
WORKDIR /home/bun/app
COPY package.json .
COPY bun.lock .
COPY bunfig.toml .
COPY svelte.config.js .
COPY drizzle.config.ts .
COPY src/lib/server/db/schema.ts ./src/lib/server/db/schema.ts
COPY src/websockets.ts ./src/websockets.ts
USER bun
CMD ["bun", "run", "src/websockets.ts"]
