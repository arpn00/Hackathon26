# syntax=docker/dockerfile:1

# --- Stage 1: build the React/Vite SPA -------------------------------------
FROM node:20-alpine AS web
WORKDIR /web
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Same-origin: empty base URL makes the client call the API on relative paths.
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# --- Stage 2: FastAPI backend serving the API + the built SPA --------------
FROM python:3.12-slim AS runtime
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000
WORKDIR /app

# Install backend as a package (mirrors the repo layout so fixture/db paths resolve).
COPY backend/ ./backend/
RUN pip install --upgrade pip && pip install ./backend

# Synthetic fixtures live at <repo>/fixtures; keep the same relative location.
COPY fixtures/ ./fixtures/

# Drop the compiled SPA where the app serves it same-origin.
COPY --from=web /web/dist/ ./backend/app/static/

EXPOSE 8000
WORKDIR /app/backend
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
