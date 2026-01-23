build:
	docker compose build

up:
	docker compose up -d

re:
	docker compose up -d --force-recreate

down:
	docker compose down

dev:
	docker compose -f compose.dev.yml up

dev-down:
	docker compose -f compose.dev.yml down

reset:
	docker volume rm ft-transcendence_db-data
	docker volume rm ft-transcendence_storage-meta
	docker volume rm ft-transcendence_storage-data

seed:
	docker run \
		--rm \
		-w /app \
		-v ./www:/app \
		--network ft-transcendence_db \
		--env-file .env \
		docker.io/oven/bun:1.3.5-debian \
		bun db:seed

format:
	docker run \
		--rm \
		-w /app \
		-v ./www:/app \
		docker.io/oven/bun:1.3.5-debian \
		bun biome
	docker run \
		--rm \
    -v ./Caddyfile:/etc/caddy/Caddyfile \
		caddy:2.11 \
		caddy fmt --overwrite /etc/caddy/Caddyfile

check:
	docker run \
		--rm \
		-w /app \
		-v ./www:/app \
		docker.io/oven/bun:1.3.5-debian \
		sh -c "bun sv:check && bun biome:check"

.PHONY: build up re down dev dev-down reset seed
