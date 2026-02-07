#!/bin/bash

# Attendre que la base de données soit prête
echo "Waiting for database..."
for i in {1..30}; do
  if bun -e "import postgres from 'postgres'; const c = postgres('postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}'); await c.end();" 2>/dev/null; then
    echo "Database is ready!"
    break
  fi
  echo "Still waiting for database... ($i/30)"
  sleep 2
done

# Créer le schéma de la base de données
echo "Creating database schema..."
bun db:migrate:custom || echo "Migration failed, continuing..."

# Initialiser les triggers et données géographiques
echo "Setting up database..."
bun db:setup || echo "Setup failed or already done, continuing..."

exec "$@"
