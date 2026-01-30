#!/bin/bash

# Dashboard Financeiro - Quick Start Script
# This script helps you set up the project quickly

set -e

echo "🚀 Dashboard Financeiro - Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local não encontrado!"
    echo ""
    echo "Criando .env.local a partir do template..."
    cp .env.example .env.local
    echo "✅ .env.local criado!"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env.local e adicione sua DATABASE_URL do Neon"
    echo ""
    echo "Como obter a DATABASE_URL:"
    echo "1. Acesse https://console.neon.tech"
    echo "2. Selecione o projeto: solitary-violet-11189914"
    echo "3. Copie a Connection String"
    echo "4. Cole no arquivo .env.local"
    echo ""
    read -p "Pressione ENTER após configurar o .env.local..."
fi

# Check if DATABASE_URL is configured
source .env.local
if [[ $DATABASE_URL == *"[user]"* ]] || [[ $DATABASE_URL == *"[password]"* ]]; then
    echo "❌ DATABASE_URL ainda não foi configurada!"
    echo ""
    echo "Por favor, edite .env.local e substitua a DATABASE_URL com suas credenciais do Neon."
    echo ""
    exit 1
fi

echo "✅ DATABASE_URL configurada!"
echo ""

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas!"
    echo ""
fi

# Push database schema
echo "🗄️  Criando schema no banco de dados..."
npm run db:push

echo ""
echo "✨ Setup completo!"
echo ""
echo "Para iniciar o servidor de desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Depois acesse: http://localhost:3000"
echo ""
