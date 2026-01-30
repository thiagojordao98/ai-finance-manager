# ================================
# Dashboard Financeiro - Dockerfile
# Multi-stage build otimizado para produção
# ================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar apenas arquivos de dependências para cache otimizado
COPY package.json package-lock.json ./

# Usar --legacy-peer-deps para resolver conflitos de versão do @neondatabase/auth
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Garantir que a pasta public existe com pelo menos um arquivo
RUN mkdir -p public && touch public/.gitkeep

# Variáveis de build - valores placeholder para permitir o build
# Os valores reais vêm das variáveis de ambiente em runtime
ENV DATABASE_URL="postgresql://placeholder:placeholder@placeholder/placeholder"
ENV NEON_AUTH_BASE_URL="https://placeholder.neonauth.aws.neon.tech/placeholder/auth"
ENV NEXT_PUBLIC_APP_URL="https://placeholder.com"
ENV EVOLUTION_API_URL="https://placeholder.com"
ENV EVOLUTION_API_KEY="placeholder"
ENV EVOLUTION_INSTANCE="placeholder"

# Variáveis de build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build da aplicação
RUN npm run build

# Stage 3: Runner (produção)
FROM node:20-alpine AS runner
WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Configurações de ambiente
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiar arquivos necessários do build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ajustar permissões
RUN chown -R nextjs:nodejs /app

# Usar usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Iniciar aplicação
CMD ["node", "server.js"]