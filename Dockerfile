FROM node:22-bookworm-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-venv python3-pip ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Backend setup
COPY backend/requirements.prod.txt /app/backend/requirements.prod.txt
RUN python3 -m venv /app/backend/.venv \
    && /app/backend/.venv/bin/pip install --no-cache-dir -r /app/backend/requirements.prod.txt

COPY backend /app/backend
RUN mkdir -p /app/backend/data /app/backend/uploads \
    && chmod -R 777 /app/backend/data /app/backend/uploads

# Frontend setup & production build
COPY frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm install --no-audit --no-fund

COPY frontend /app/frontend
RUN BACKEND_URL=http://127.0.0.1:8000 npm run build

WORKDIR /app
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 7860
CMD ["/app/docker-entrypoint.sh"]
