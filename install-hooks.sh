#!/bin/bash

cd ./.git/hooks

if [ ! -f pre-push ]; then
  cat <<'EOF' >pre-push
#!/bin/bash
set -euo pipefail

tests=(
  "deno task prepare"
  "deno fmt --check"
  "deno check"
  "deno task sv-check"
  "deno lint"
)
cd ./www
for test in "${tests[@]}"; do
  echo "Running $test..."
  if ! eval "$test"; then
    echo "Error: $test"
    exit 1
  fi
done
echo "All good !"
echo
EOF

  chmod +x pre-push
fi
