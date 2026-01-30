# Deployment Guide - Dashboard Financeiro

Guia completo para deploy do projeto no Dokploy.

## Pré-requisitos

| Requisito | Descrição                                           |
| --------- | --------------------------------------------------- |
| Dokploy   | Instalado e rodando na VPS                          |
| GitHub    | Repositório conectado ao Dokploy                    |
| Domínio   | (Opcional) Domínio configurado apontando para a VPS |

---

## Arquivos de Deploy

| Arquivo          | Descrição                               |
| ---------------- | --------------------------------------- |
| `Dockerfile`     | Multi-stage build otimizado (~150MB)    |
| `.dockerignore`  | Exclui arquivos desnecessários do build |
| `next.config.js` | Configurado com `output: 'standalone'`  |

---

## Passo a Passo no Dokploy

### 1. Criar Application

1. Acesse o painel do Dokploy
2. Clique em **+ Create Service** → **Application**
3. Selecione **GitHub** como source
4. Escolha o repositório `dashboard-financeiro`
5. Branch: `main`

### 2. Configurar Build

No painel da aplicação, vá em **General**:

| Campo           | Valor          |
| --------------- | -------------- |
| Build Type      | `Dockerfile`   |
| Dockerfile Path | `./Dockerfile` |
| Port            | `3000`         |

### 3. Variáveis de Ambiente

Vá em **Environment** e adicione todas as variáveis:

```env
# Neon Database Connection
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.sa-east-1.aws.neon.tech/neondb?sslmode=require

# Next.js (use seu domínio real em produção)
NEXT_PUBLIC_APP_URL=https://seu-dominio.com

# Neon Auth
NEON_AUTH_BASE_URL=https://ep-xxx.neonauth.sa-east-1.aws.neon.tech/neondb/auth

# Evolution API (WhatsApp Integration)
EVOLUTION_API_URL=https://sua-evolution-api.com
EVOLUTION_API_KEY=sua-api-key-aqui
EVOLUTION_INSTANCE=nome-da-instancia
```

### 4. Configurar Domínio

Vá em **Domains**:

1. Clique em **Add Domain**
2. Digite seu domínio (ex: `dashboard.seudominio.com`)
3. Habilite **HTTPS** (Let's Encrypt automático)
4. Salve

### 5. Health Check (Opcional)

Em **Advanced** → **Health Check**:

| Campo    | Valor |
| -------- | ----- |
| Path     | `/`   |
| Interval | `30s` |
| Timeout  | `10s` |
| Retries  | `3`   |

### 6. Deploy

1. Clique em **Deploy**
2. Acompanhe os logs em **Deployments**
3. Aguarde o build completar (~2-5 minutos)

---

## Variáveis de Ambiente - Referência Completa

| Variável              | Obrigatória | Descrição                   |
| --------------------- | ----------- | --------------------------- |
| `DATABASE_URL`        | ✅          | Connection string do NeonDB |
| `NEXT_PUBLIC_APP_URL` | ✅          | URL pública da aplicação    |
| `NEON_AUTH_BASE_URL`  | ✅          | URL do Neon Auth            |
| `EVOLUTION_API_URL`   | ✅          | URL da Evolution API        |
| `EVOLUTION_API_KEY`   | ✅          | API Key da Evolution        |
| `EVOLUTION_INSTANCE`  | ✅          | Nome da instância WhatsApp  |

---

## Dockerfile - Estrutura

O Dockerfile usa **multi-stage build** com 3 estágios:

```
┌─────────────────────────────────────────┐
│ Stage 1: deps                           │
│ - node:20-alpine                        │
│ - Instala dependências (npm ci)         │
│ - Cache otimizado                       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ Stage 2: builder                        │
│ - Copia deps do stage anterior          │
│ - Copia código fonte                    │
│ - Executa npm run build                 │
│ - Gera .next/standalone                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ Stage 3: runner                         │
│ - node:20-alpine (imagem limpa)         │
│ - Copia apenas arquivos necessários     │
│ - Usuário não-root (segurança)          │
│ - Health check configurado              │
│ - ~150MB final                          │
└─────────────────────────────────────────┘
```

---

## Commits de Deploy

### 17. Configuração Docker para produção

```bash
git add Dockerfile .dockerignore next.config.js
git commit -m "build: add Dockerfile and Docker config for production deployment"
git push origin main
```

---

## Troubleshooting

### Build falha no npm ci

**Problema:** Erro durante instalação de dependências.

**Solução:** Verifique se `package-lock.json` está commitado.

### Aplicação não inicia

**Problema:** Container inicia mas aplicação não responde.

**Solução:** Verifique as variáveis de ambiente, especialmente `DATABASE_URL` e `NEON_AUTH_BASE_URL`.

### Erro de conexão com banco

**Problema:** `connection refused` ou `timeout`.

**Solução:**

1. Verifique se `DATABASE_URL` está correta
2. Confirme que `?sslmode=require` está na connection string
3. Teste a conexão localmente primeiro

### Health check failing

**Problema:** Container reinicia constantemente.

**Solução:** Aumente o `start-period` no health check para 30s ou mais.

---

## Atualizando a Aplicação

Para fazer deploy de novas versões:

1. Faça commit e push das alterações para `main`
2. No Dokploy, clique em **Redeploy**
3. Ou configure **Auto Deploy** para deploy automático em cada push

---

## Recursos

| Recurso        | Link                                            |
| -------------- | ----------------------------------------------- |
| Dokploy Docs   | https://docs.dokploy.com                        |
| NeonDB Console | https://console.neon.tech                       |
| Next.js Docker | https://nextjs.org/docs/deployment#docker-image |

---

_Gerado em: 30/01/2026_
