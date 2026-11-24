# Didar Amantay — Ресми әдеби портал (`didaramantay.kz`)

Full-stack Kazakh-first literary portal and book management CMS for Kazakh novelist, screenwriter, and philosopher **Didar Amantay** (`Дидар Амантай`).

## Free 1-Click Cloud Hosting (24/7)

### Option A: Render.com (Free Tier — 1 Click)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/alkeySm/didar-amantay)

- Click the button above (or go to [render.com](https://render.com) → **New Blueprint** → paste `https://github.com/alkeySm/didar-amantay`).
- Automatically deploys the unified Docker container (`Next.js` + `FastAPI`) via `render.yaml`.
- *(Optional)* To persist newly added Admin books across free-tier container restarts, connect a free PostgreSQL database from [neon.tech](https://neon.tech) or Render Postgres and set `DATABASE_URL` in Environment Variables.

### Option B: Koyeb / Hugging Face Spaces (Docker)
- Create a free **Hugging Face Space** (SDK: **Docker**, port `7860`) or **Koyeb** Web Service connected to `https://github.com/alkeySm/didar-amantay` — the included `Dockerfile` builds and runs both Next.js and FastAPI in one free container.

### Option C: Instant Local Public Link (`trycloudflare.com`)
```bash
./share-online.sh
```

## Tech Stack
- **Backend:** FastAPI, SQLAlchemy 2.0, SQLite / PostgreSQL (`DATABASE_URL`), PyJWT, multipart file uploads (`/uploads`)
- **Frontend:** React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS v3

## Features
- **Kazakh Default (`kk`) + 14-Language Switcher:** Qazaq, English, Français, Deutsch, Русский, 中文, 한국어, Türkçe, ქართული, Монгол, Oʻzbekcha, العربية (RTL), Саха тыла, Кыргызча.
- **Books Catalog & Reader:** *«Гүлдер мен кітаптар»*, *«Пұт-кітап»* (2024), *«Майдақоңыр»* (2023), *«Қарқаралы басында»* (2010), *«Күзгі рандеву»* (2005), *«Қастерле мені»* (2000), and *«Post Scriptum»* (1996).
- **All 11 Creative Genres:** Әңгіме-новеллалар, Повестер, Романдар, Пьесалар, Көсемсөз, Эсселер, Өлеңдер, Киносценарийлер, Көркем фильмдері, Деректі фильмдері, Телехабарлар.
- **Admin CMS (`/admin`):** Default login `admin` / `didar2026` (override via `ADMIN_USERNAME` / `ADMIN_PASSWORD`).
