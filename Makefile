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
	docker volume rm ft-transcendence_api-keys

seed:
	docker run \
		--rm \
		-w /app \
		-v ./www:/app \
		--network ft-transcendence_db \
		-e DATABASE_URL=postgres://root:mysecretpassword@db:5432/local \
		docker.io/oven/bun:1.3.5-debian \
		bun db:seed
