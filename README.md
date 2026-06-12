# Teste técnico - Front

Frontend Next.js para o sistema construído para o teste técnico.

## Setup

### Com Docker

```bash
cp .env.example .env.local
docker compose up -d
```

Acesse: `http://localhost:3000`

### Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL_SERVER=http://localhost:8000
```

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build
npm run start     # Produção
npm run lint      # Lint
```
