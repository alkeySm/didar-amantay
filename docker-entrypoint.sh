#!/usr/bin/env bash
set -euo pipefail

cd /app/backend
/app/backend/.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Wait briefly for FastAPI startup
sleep 2

cd /app/frontend
BACKEND_URL="http://127.0.0.1:8000" exec npx next start -H 0.0.0.0 -p "${PORT:-7860}"
