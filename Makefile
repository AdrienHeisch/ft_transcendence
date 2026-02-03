DOCKER=docker

build:
	$(DOCKER) compose build

up:
	$(DOCKER) compose up -d

re:
	$(DOCKER) compose up -d --force-recreate

down:
	$(DOCKER) compose down

dev:
	$(DOCKER) compose -f compose.dev.yml up

dev-down:
	$(DOCKER) compose -f compose.dev.yml down

reset:
	$(DOCKER) volume rm ft-transcendence_db-data
	$(DOCKER) volume rm ft-transcendence_storage-meta
	$(DOCKER) volume rm ft-transcendence_storage-data

seed:
	$(DOCKER) run \
		--rm \
		-w /app \
		-v ./www:/app \
		-v ./.env:/app/.env \
		--network ft-transcendence_db \
		docker.io/oven/bun:1.3.5-debian \
		bun db:seed

format:
	$(DOCKER) run \
		--rm \
		-w /app \
		-v ./www:/app \
		docker.io/oven/bun:1.3.5-debian \
		bun biome
	$(DOCKER) run \
		--rm \
		-v ./Caddyfile:/etc/caddy/Caddyfile \
		caddy:2.11 \
		caddy fmt --overwrite /etc/caddy/Caddyfile

check:
	$(DOCKER) run \
		--rm \
		-w /app \
		-v ./www:/app \
		docker.io/oven/bun:1.3.5-debian \
		sh -c "bun sv:check && bun biome:check"

.PHONY: build up re down dev dev-down reset seed format check
