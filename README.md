# ft_transcendence

This project has been created as part of the 42 curriculum by
ekanaeva, mszymcza, altoulle, aheisch.

## Description

_The “Description” section should also contain a clear name for the project and its
key features._

_TODO_

## Instruction

_The “Instructions” section should mention all the needed prerequisites (software,
tools, versions, configuration like .env setup, etc.), and step-by-step
instructions to run the project._

### Before anything

- Docker 29.0.0 or Podman 5.7.1 (with podman aliased as docker)
- `cp .env.example .env` and edit `.env` as necessary
- The server will listen on port `8000`

### Release

- `make build` to build the container images
- `make up` to deploy the application
- `make down` to remove the containers

### Development

- `make dev` to start the development server
- `make dev-down` to remove the development containers
- `make check` to run CI checks before pushing
- `make format` to format the code

### Tools

- `make reset` to delete the volumes
- `make seed` to seed the database with random data, __will delete existing
data__

## Resources

_TODO_

## Team Information

### ekanaeva

_TODO_

### mszymcza

_TODO_

### altoulle

_TODO_

### aheisch

_TODO_

## Project Management

_TODO_

## Technical Stack

- Docker / Podman (containerization)
- Caddy (reverse proxy)
- Postgres (database)
- Garage (object storage)
- Bun (web application server)
- SvelteKit (full-stack framework)
- TailwindCSS (CSS framework)
- Drizzle (ORM)

## Database Schema

_TODO_

## Features List

_TODO_

## Modules

_TODO_

## Individual Contributions

_TODO_
