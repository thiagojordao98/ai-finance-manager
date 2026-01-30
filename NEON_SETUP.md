# 🔌 Conectando ao Neon Database

## 📋 Informações do Projeto Neon

**Organização**: `org-still-pond-44168688`  
**Projeto**: `solitary-violet-11189914`

---

## 🔑 Passo 1: Obter Connection String

### Opção A: Via Console Neon (Recomendado)

1. Acesse: https://console.neon.tech
2. Faça login na sua conta
3. Selecione o projeto **solitary-violet-11189914**
4. No menu lateral, clique em **Dashboard** ou **Connection Details**
5. Copie a **Connection String** completa

A string terá este formato:

```
postgresql://[user]:[password]@[endpoint-id].us-east-2.aws.neon.tech/[dbname]?sslmode=require
```

### Opção B: Via CLI (Alternativa)

Se você tiver o Neon CLI instalado:

```bash
neon connection-string solitary-violet-11189914
```

---

## 🔧 Passo 2: Configurar .env.local

Abra o arquivo `.env.local` e cole sua connection string:

```env
# Neon Database Connection
# Project: solitary-violet-11189914
# Organization: org-still-pond-44168688
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ IMPORTANTE**: Substitua a connection string inteira, incluindo:

- Username
- Password
- Endpoint ID
- Database name

---

## ✅ Passo 3: Testar Conexão

Execute este comando para verificar se a conexão está funcionando:

```bash
npm run db:push
```

### Resultado Esperado:

```
✓ Pushing schema changes to database...
✓ Schema pushed successfully!
```

### Se der erro:

**Erro: "Connection refused"**

- Verifique se o projeto Neon está ativo
- Confirme que copiou a connection string completa
- Verifique se não há espaços extras no .env.local

**Erro: "Authentication failed"**

- Password incorreto na connection string
- Regenere as credenciais no Neon Console

**Erro: "SSL required"**

- Certifique-se que a string termina com `?sslmode=require`

---

## 🗄️ Passo 4: Criar Schema

Após conexão confirmada, execute:

```bash
npm run db:push
```

Isso criará as tabelas:

- ✅ `users` (id, email, created_at)
- ✅ `transactions` (id, user_id, type, description, amount, created_at)
- ✅ Indexes necessários

---

## 🚀 Passo 5: Iniciar Aplicação

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🔍 Verificar Dados no Banco

### Opção 1: Drizzle Studio (Recomendado)

```bash
npm run db:studio
```

Abre interface GUI em: http://localhost:4983

### Opção 2: Neon Console

1. Acesse https://console.neon.tech
2. Selecione o projeto
3. Vá em **SQL Editor**
4. Execute queries:

```sql
-- Ver usuários
SELECT * FROM users;

-- Ver transações
SELECT * FROM transactions;

-- Ver totais por usuário
SELECT
  user_id,
  type,
  COUNT(*) as count,
  SUM(amount::numeric) as total
FROM transactions
GROUP BY user_id, type;
```

---

## 🔒 Segurança da Connection String

### ⚠️ NUNCA faça:

- ❌ Commit do `.env.local` no git
- ❌ Compartilhe a connection string publicamente
- ❌ Use em código client-side
- ❌ Exponha em logs ou console

### ✅ SEMPRE faça:

- ✅ Mantenha em `.env.local` (já está no .gitignore)
- ✅ Use variáveis de ambiente em produção
- ✅ Rotacione passwords periodicamente
- ✅ Use apenas em código server-side

---

## 📊 Estrutura do Banco Criada

Após `db:push`, você terá:

### Tabela: users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### Tabela: transactions

```sql
CREATE TYPE transaction_type AS ENUM ('entrada', 'saida');

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX transactions_user_id_idx ON transactions(user_id);
CREATE INDEX transactions_created_at_idx ON transactions(created_at);
```

---

## 🎯 Checklist de Setup

- [ ] Connection string obtida do Neon Console
- [ ] `.env.local` configurado com DATABASE_URL
- [ ] `npm run db:push` executado com sucesso
- [ ] Tabelas criadas no banco
- [ ] `npm run dev` rodando sem erros
- [ ] Dashboard acessível em localhost:3000
- [ ] Consegue adicionar transações
- [ ] Dados aparecem na tabela

---

## 🆘 Problemas Comuns

### "Cannot connect to database"

**Solução**:

1. Verifique se o projeto Neon está ativo (não suspenso)
2. Teste a connection string no Neon Console SQL Editor
3. Confirme que DATABASE_URL está no .env.local (não .env.example)

### "Relation does not exist"

**Solução**:

```bash
npm run db:push
```

### "Unauthorized"

**Solução**:

1. Regenere a password no Neon Console
2. Atualize a connection string no .env.local
3. Reinicie o servidor (`npm run dev`)

---

## ✨ Tudo Pronto!

Após seguir estes passos, seu dashboard estará:

- ✅ Conectado ao Neon Database
- ✅ Com schema criado
- ✅ Pronto para armazenar transações
- ✅ Funcionando em modo multi-usuário

**Próximo passo**: Comece a usar o dashboard e adicionar transações!

---

## 📚 Recursos Úteis

- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
