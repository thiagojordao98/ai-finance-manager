
You are a senior fullstack engineer specialized in Next.js (App Router),
TypeScript, Drizzle ORM, PostgreSQL (NeonDB) and Neon Auth, using GitHub
Copilot Agent with MCP integration.

GOAL:
Build a multi-user financial dashboard using Next.js (App Router),
TypeScript and Drizzle ORM, with authentication handled by Neon Auth.
Each user must only access their own financial data.

TECH STACK:
- Next.js 14+ (App Router)
- TypeScript
- Drizzle ORM
- PostgreSQL (NeonDB)
- Neon Auth (JWT-based, database-native auth)
- TailwindCSS (dark theme)
- MCP for database schema and queries

AUTHENTICATION REQUIREMENTS:
- Use Neon Auth for user authentication.
- Rely on the authenticated user context provided by Neon (user_id).
- No custom auth implementation.
- All queries must be scoped by the authenticated user.
- Enforce data isolation at database and application level.

DATABASE DESIGN (Drizzle + NeonDB):

Using MCP, create the schema below:

1) users (managed by Neon Auth)
- id: uuid (primary key, provided by Neon Auth)
- email: text
- created_at: timestamp

2) transactions
- id: uuid (primary key, default random)
- user_id: uuid (foreign key → users.id, not null)
- type: 'entrada' | 'saida'
- description: text (not null)
- amount: numeric (not null)
- created_at: timestamp (default now)

Ensure:
- Index on user_id
- Strong typing with Drizzle
- Relations defined properly

DATABASE SETUP:
- Configure Drizzle to connect to NeonDB.
- Use environment variables for connection string.
- Access authenticated user_id from Neon Auth context.
- All inserts and selects must filter by user_id.

DASHBOARD UI:
- Dark theme (fintech style).
- Top section with 3 dynamic cards:
  - Entradas: sum of all 'entrada' for the logged-in user
  - Saídas: sum of all 'saida' for the logged-in user
  - Saldo: Entradas - Saídas
- Data must be isolated per user.

TRANSACTIONS TABLE:
- Large card below summary cards.
- Table listing latest transactions for the logged-in user.
- Order by created_at DESC.
- Columns:
  - Date
  - Type (entrada/saida)
  - Description
  - Amount
- Visual rules:
  - Entrada → green
  - Saída → red

FUNCTIONALITY:
- Button to add "Entrada".
- Button to add "Saída".
- Modal or form containing:
  - Description
  - Amount
- Use Server Actions to:
  - Read authenticated user_id
  - Insert transaction linked to user_id
  - Revalidate dashboard data
- Button "Atualizar" to manually refresh data using router.refresh().

DATA FETCHING & SECURITY:
- Use Server Components for all reads.
- No client-side database access.
- All queries MUST filter by authenticated user_id.
- Prevent cross-user data access.
- Handle loading and empty states gracefully.

CODE QUALITY:
- Fully typed with TypeScript.
- Use Drizzle relations.
- Clean architecture and modular components.
- No mock data or placeholders.
- Production-ready.

OUTPUT:
- Drizzle schema with multi-user support.
- Neon Auth integration.
- Secure queries scoped by user.
- Server Actions for inserts.
- Fully functional multi-user financial dashboard.
- Dark theme UI.

Proceed autonomously and implement the complete solution.
