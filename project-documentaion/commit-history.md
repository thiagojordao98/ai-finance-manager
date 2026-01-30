# Commit History - Dashboard Financeiro

Histórico de commits organizados por funcionalidade.

## Resumo dos Commits

| #   | Hash      | Mensagem                                                                 |
| --- | --------- | ------------------------------------------------------------------------ |
| 1   | `62e9ca5` | `chore: initial Next.js project setup with TypeScript and TailwindCSS`   |
| 2   | `f415e01` | `feat(db): add Drizzle ORM config and database schema`                   |
| 3   | `86b13e9` | `feat(db): add SQL migrations for user resolution and OTP`               |
| 4   | `eda6c48` | `feat(auth): integrate Neon Auth with middleware and auth helpers`       |
| 5   | `f2d5cf8` | `feat(auth): add sign-in and sign-up form components`                    |
| 6   | `0592564` | `feat(auth): add auth pages and API routes for Neon Auth`                |
| 7   | `71d4f4c` | `feat(ui): add main layout with dark theme and Neon auth provider`       |
| 8   | `499010d` | `feat(dashboard): add main dashboard page with summary cards`            |
| 9   | `1ae71bc` | `feat(dashboard): add transactions table and financial charts`           |
| 10  | `d073cc8` | `feat(transactions): add transaction modal and action buttons`           |
| 11  | `fa05950` | `feat(whatsapp): add Evolution API integration with phone normalization` |
| 12  | `19d53de` | `feat(otp): add OTP server actions for WhatsApp phone verification`      |
| 13  | `dbea954` | `feat(whatsapp): add WhatsApp link modal with OTP verification flow`     |
| 14  | `46bc15d` | `feat(lib): add utility functions`                                       |
| 15  | `68772a9` | `docs: add project documentation and setup guides`                       |
| 16  | `76c3527` | `docs: add initial project prompt documentation (Obsidian)`              |

---

## Comandos Executados

### 1. Configuração inicial do projeto Next.js

```bash
git add package.json package-lock.json tsconfig.json next.config.js postcss.config.js tailwind.config.ts .gitignore .env.example
git commit -m "chore: initial Next.js project setup with TypeScript and TailwindCSS"
```

### 2. Configuração do Drizzle ORM e schema do banco

```bash
git add drizzle.config.ts db/index.ts db/schema.ts
git commit -m "feat(db): add Drizzle ORM config and database schema with users, transactions and otp_verifications tables"
```

### 3. Migrations SQL para resolução de usuários e OTP

```bash
git add migrations/001_user_resolution.sql migrations/002_otp_verifications.sql
git commit -m "feat(db): add SQL migrations for user resolution and OTP verifications"
```

### 4. Configuração de autenticação Neon Auth

```bash
git add lib/auth.ts lib/neon-auth/client.ts middleware.ts
git commit -m "feat(auth): integrate Neon Auth with middleware and auth helpers"
```

### 5. Componentes de autenticação (sign-in/sign-up)

```bash
git add components/auth/sign-in-form.tsx components/auth/sign-up-form.tsx components/auth/theme-toggle.tsx
git commit -m "feat(auth): add sign-in and sign-up form components with theme toggle"
```

### 6. Páginas de autenticação

```bash
git add app/auth/[path]/page.tsx app/account/[path]/page.tsx app/api/auth/[...path]/route.ts
git commit -m "feat(auth): add auth pages and API routes for Neon Auth"
```

### 7. Layout principal e estilos globais

```bash
git add app/layout.tsx app/globals.css components/neon-auth-provider.tsx
git commit -m "feat(ui): add main layout with dark theme and Neon auth provider"
```

### 8. Dashboard principal e cards de resumo

```bash
git add app/page.tsx app/actions.ts components/summary-cards.tsx components/dashboard-header.tsx
git commit -m "feat(dashboard): add main dashboard page with summary cards and header"
```

### 9. Tabela e gráficos de transações

```bash
git add components/transactions-table.tsx components/transactions-chart.tsx components/balance-chart.tsx components/distribution-chart.tsx
git commit -m "feat(dashboard): add transactions table and financial charts"
```

### 10. Modal e botões de adicionar transação

```bash
git add components/add-transaction-modal.tsx components/add-transaction-button.tsx components/refresh-button.tsx
git commit -m "feat(transactions): add transaction modal and action buttons"
```

### 11. Integração WhatsApp via Evolution API

```bash
git add lib/whatsapp.ts
git commit -m "feat(whatsapp): add Evolution API integration for WhatsApp messaging with phone normalization"
```

### 12. Sistema de OTP para vinculação de WhatsApp

```bash
git add lib/otp-actions.ts
git commit -m "feat(otp): add OTP server actions for WhatsApp phone verification"
```

### 13. Modal de vinculação WhatsApp

```bash
git add components/whatsapp-link-modal.tsx
git commit -m "feat(whatsapp): add WhatsApp link modal with OTP verification flow"
```

### 14. Utilitários

```bash
git add lib/utils.ts
git commit -m "feat(lib): add utility functions"
```

### 15. Documentação do projeto

```bash
git add README.md ARCHITECTURE.md PROJECT_SUMMARY.md SETUP.md NEON_SETUP.md setup.sh
git commit -m "docs: add project documentation and setup guides"
```

### 16. Documentação interna (Obsidian)

```bash
git add project-documentaion/
git commit -m "docs: add initial project prompt documentation (Obsidian)"
```

---

## Arquivos por Commit

| Commit | Arquivos                                                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.js`, `postcss.config.js`, `tailwind.config.ts`, `.gitignore`, `.env.example` |
| 2      | `drizzle.config.ts`, `db/index.ts`, `db/schema.ts`                                                                                              |
| 3      | `migrations/001_user_resolution.sql`, `migrations/002_otp_verifications.sql`                                                                    |
| 4      | `lib/auth.ts`, `lib/neon-auth/client.ts`, `middleware.ts`                                                                                       |
| 5      | `components/auth/sign-in-form.tsx`, `components/auth/sign-up-form.tsx`, `components/auth/theme-toggle.tsx`                                      |
| 6      | `app/auth/[path]/page.tsx`, `app/account/[path]/page.tsx`, `app/api/auth/[...path]/route.ts`                                                    |
| 7      | `app/layout.tsx`, `app/globals.css`, `components/neon-auth-provider.tsx`                                                                        |
| 8      | `app/page.tsx`, `app/actions.ts`, `components/summary-cards.tsx`, `components/dashboard-header.tsx`                                             |
| 9      | `components/transactions-table.tsx`, `components/transactions-chart.tsx`, `components/balance-chart.tsx`, `components/distribution-chart.tsx`   |
| 10     | `components/add-transaction-modal.tsx`, `components/add-transaction-button.tsx`, `components/refresh-button.tsx`                                |
| 11     | `lib/whatsapp.ts`                                                                                                                               |
| 12     | `lib/otp-actions.ts`                                                                                                                            |
| 13     | `components/whatsapp-link-modal.tsx`                                                                                                            |
| 14     | `lib/utils.ts`                                                                                                                                  |
| 15     | `README.md`, `ARCHITECTURE.md`, `PROJECT_SUMMARY.md`, `SETUP.md`, `NEON_SETUP.md`, `setup.sh`                                                   |
| 16     | `project-documentaion/*`                                                                                                                        |

---

_Gerado em: 30/01/2026_
