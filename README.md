# Dashboard Financeiro

Sistema completo de gestão financeira pessoal desenvolvido com Next.js 14 (App Router), TypeScript, Drizzle ORM e NeonDB.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **TypeScript**
- **Drizzle ORM**
- **PostgreSQL (NeonDB)**
- **Neon Auth** (autenticação nativa)
- **TailwindCSS** (tema escuro)

## 📋 Funcionalidades

- ✅ Autenticação multi-usuário com Neon Auth
- ✅ Isolamento completo de dados por usuário
- ✅ Dashboard com cards dinâmicos (Entradas, Saídas, Saldo)
- ✅ Tabela de transações em tempo real
- ✅ Adicionar entradas e saídas
- ✅ Atualização manual de dados
- ✅ Tema escuro (fintech style)
- ✅ Segurança: todas as queries filtradas por user_id
- ✅ Server Actions para mutações
- ✅ Server Components para leitura

## 🏗️ Arquitetura

### Banco de Dados (Drizzle + NeonDB)

**users** (gerenciado pelo Neon Auth)

- `id`: uuid (primary key)
- `email`: text (unique)
- `created_at`: timestamp

**transactions**

- `id`: uuid (primary key)
- `user_id`: uuid (foreign key → users.id, not null)
- `type`: enum ('entrada' | 'saida')
- `description`: text (not null)
- `amount`: numeric (not null)
- `created_at`: timestamp

### Segurança

- Todas as queries filtradas por `user_id` do usuário autenticado
- Neon Auth provê contexto JWT
- Validação em nível de aplicação e banco de dados
- Isolamento completo entre usuários

## 🛠️ Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Atualize com suas credenciais do Neon:

```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint-id].us-east-2.aws.neon.tech/[dbname]?sslmode=require"
```

Para obter sua connection string:

1. Acesse https://console.neon.tech
2. Selecione o projeto: **solitary-violet-11189914**
3. Navegue até Connection Details
4. Copie a connection string

### 3. Criar o schema no banco de dados

```bash
npm run db:push
```

Ou gerar e aplicar migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Executar o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📦 Estrutura do Projeto

```
dashboard-financeiro/
├── app/
│   ├── actions.ts          # Server Actions (addTransaction, deleteTransaction)
│   ├── globals.css         # Estilos globais (dark theme)
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Dashboard principal
├── components/
│   ├── add-transaction-button.tsx
│   ├── add-transaction-modal.tsx
│   ├── dashboard-header.tsx
│   ├── refresh-button.tsx
│   ├── summary-cards.tsx
│   └── transactions-table.tsx
├── db/
│   ├── index.ts            # Configuração Drizzle + Neon
│   └── schema.ts           # Schema do banco de dados
├── lib/
│   ├── auth.ts             # Utilitários de autenticação
│   └── utils.ts            # Helpers (formatação)
├── drizzle.config.ts       # Config Drizzle Kit
├── package.json
└── tsconfig.json
```

## 🔐 Autenticação com Neon Auth

O sistema utiliza Neon Auth para autenticação nativa do PostgreSQL:

- JWT tokens gerenciados pelo Neon
- Context do usuário extraído automaticamente
- `user_id` disponível via `getAuthenticatedUser()`
- Para desenvolvimento, usa demo user (remover em produção)

## 💻 Uso

### Adicionar Transação

1. Clique em "Entrada" ou "Saída"
2. Preencha a descrição e valor
3. Clique em "Adicionar"
4. Dashboard atualiza automaticamente

### Visualizar Dados

- **Cards superiores**: totais de entradas, saídas e saldo
- **Tabela**: lista todas as transações ordenadas por data
- **Cores**: verde para entradas, vermelho para saídas

### Atualizar Dados

Clique no botão "Atualizar" para forçar refresh manual dos dados.

## 🔒 Segurança

Todas as operações são protegidas:

```typescript
// Exemplo: addTransaction
const user = await requireAuth(); // Valida autenticação

await db.insert(transactions).values({
  userId: user.id, // Sempre vinculado ao usuário
  type,
  description,
  amount,
});
```

## 🎨 Customização

### Tema

Ajuste as cores em `app/globals.css` e `tailwind.config.ts`.

### Componentes

Todos os componentes estão em `components/` e podem ser customizados individualmente.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Verifica problemas no código
- `npm run db:push` - Sincroniza schema com o banco
- `npm run db:generate` - Gera migrations
- `npm run db:migrate` - Aplica migrations
- `npm run db:studio` - Abre Drizzle Studio

## 🌐 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente
4. Deploy automático!

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 14+.

## 📄 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.
