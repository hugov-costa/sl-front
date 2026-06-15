# Teste técnico - Front

Frontend Next.js para o sistema construído para o teste técnico.

## Setup

### Variáveis de Ambiente

Antes de buildar a imagem da aplicação, é necessário gerar as variáveis de ambiente:

```bash
cp .env.example .env
```

### Docker

```bash
docker compose build --no-cache     # Apenas na primeira vez
docker compose up -d
```

Acesse: `http://localhost:3000`

### Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build
npm run start     # Produção
npm run format    # Formatação
npm run lint      # Lint
```
