#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! lsof -iTCP:8000 -sTCP:LISTEN -P -n >/dev/null 2>&1; then
  echo "Starting FastAPI backend on http://127.0.0.1:8000 ..."
  (
    cd "$ROOT_DIR/backend"
    exec "$ROOT_DIR/backend/.venv/bin/uvicorn" app.main:app --host 127.0.0.1 --port 8000
  ) &
fi

if ! lsof -iTCP:3000 -sTCP:LISTEN -P -n >/dev/null 2>&1; then
  echo "Starting Next.js frontend on http://127.0.0.1:3000 ..."
  (
    cd "$ROOT_DIR/frontend"
    exec npm run start -- -p 3000
  ) &
fi

sleep 2
echo "Opening public HTTPS tunnel via localhost.run..."
exec ssh -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -R 80:127.0.0.1:3000 nokey@localhost.run
