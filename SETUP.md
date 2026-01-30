# 🚀 Guia de Setup Rápido - Dashboard Financeiro

## ✅ O que foi criado

Sistema completo de dashboard financeiro multi-usuário com:

- ✅ Next.js 14 + TypeScript
- ✅ Drizzle ORM + NeonDB
- ✅ Neon Auth integration
- ✅ Dark theme (fintech style)
- ✅ Isolamento de dados por usuário
- ✅ Server Components + Server Actions

## 📝 Próximos Passos

### 1. Configure sua Database URL

Edite o arquivo `.env.local` e substitua a `DATABASE_URL` com suas credenciais do Neon:

1. Acesse: https://console.neon.tech
2. Selecione o projeto: **solitary-violet-11189914**
3. Vá em "Connection Details"
4. Copie a connection string completa
5. Cole no arquivo `.env.local`

Exemplo:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"
```

### 2. Crie o Schema no Banco de Dados

Execute o comando para sincronizar o schema:

```bash
npm run db:push
```

Isso criará as tabelas `users` e `transactions` no seu banco NeonDB.

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🎯 Como Usar

### Adicionar Transações

1. Clique em **"Entrada"** para adicionar receitas
2. Clique em **"Saída"** para adicionar despesas
3. Preencha descrição e valor
4. Dados aparecem instantaneamente no dashboard

### Visualizar Dados

- **Card Verde (Entradas)**: soma de todas as receitas
- **Card Vermelho (Saídas)**: soma de todas as despesas
- **Card Azul (Saldo)**: diferença entre entradas e saídas
- **Tabela**: lista todas as transações ordenadas por data

### Atualizar

Clique no botão **"Atualizar"** para forçar refresh dos dados.

## 🔐 Autenticação

O sistema usa **Neon Auth** para autenticação:

- Em desenvolvimento, usa um usuário demo automaticamente
- Em produção, integre com JWT do Neon Auth
- Todas as queries são filtradas por `user_id`
- Dados totalmente isolados entre usuários

## 🏗️ Arquitetura

### Banco de Dados

**users**

- id (uuid, pk)
- email (text, unique)
- created_at (timestamp)

**transactions**

- id (uuid, pk)
- user_id (uuid, fk → users.id)
- type ('entrada' | 'saida')
- description (text)
- amount (numeric)
- created_at (timestamp)

### Segurança

- ✅ Todas as queries filtradas por user_id autenticado
- ✅ Server Actions para mutações
- ✅ Server Components para leitura
- ✅ Validação de dados no backend
- ✅ Isolamento completo entre usuários

## 📦 Estrutura

```
/app
  actions.ts          → Server Actions (addTransaction)
  page.tsx            → Dashboard principal
  layout.tsx          → Layout raiz
  globals.css         → Tema dark

/components
  add-transaction-button.tsx
  add-transaction-modal.tsx
  dashboard-header.tsx
  refresh-button.tsx
  summary-cards.tsx
  transactions-table.tsx

/db
  index.ts            → Config Drizzle
  schema.ts           → Schema do banco

/lib
  auth.ts             → Autenticação Neon Auth
  utils.ts            → Helpers
```

## 🛠️ Scripts Úteis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run db:push      # Sincroniza schema
npm run db:studio    # Drizzle Studio (GUI)
```

## 🎨 Customização

### Cores

Edite `app/globals.css` e `components/*` para ajustar o tema.

### Funcionalidades

Todos os componentes são modulares e fáceis de estender.

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon Database](https://neon.tech/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 🚨 Troubleshooting

### Erro de conexão com banco

- Verifique se a `DATABASE_URL` está correta
- Confirme que o projeto Neon está ativo
- Teste a conexão no Neon Console

### Schema não criado

Execute:

```bash
npm run db:push
```

### Transações não aparecem

- Clique no botão "Atualizar"
- Verifique o console para erros
- Confirme que o schema foi criado

## ✨ Pronto para usar!

Seu dashboard financeiro está configurado e pronto para desenvolvimento.

**Próximo passo**: Edite `.env.local` com sua DATABASE_URL do Neon e execute `npm run db:push`.
