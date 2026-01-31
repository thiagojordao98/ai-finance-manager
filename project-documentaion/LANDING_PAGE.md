# Landing Page - Dashboard Financeiro via WhatsApp

## 📍 Estrutura de Rotas

- **`/`** - Landing page pública (página de vendas)
- **`/dashboard`** - Dashboard protegido (requer autenticação)
- **`/auth/sign-in`** - Página de login
- **`/auth/sign-up`** - Página de cadastro

## 🎨 Design System

### Paleta de Cores

- **Background**: `#0a0e1a` (gray-950) com gradiente
- **Cards**: `#1a1f2e` (gray-900)
- **CTA Principal**: `#00d9a3` (green-600) - WhatsApp theme
- **CTA Secundário**: Gradiente indigo-purple
- **Bordas**: `#1f2937` (gray-800)
- **Texto**: white, gray-400, gray-500

### Componentes Criados

#### Base Components (`/components/landing/`)

1. **CTAButton** - Botões de call-to-action com variantes primary/secondary
2. **FeatureCard** - Cards de features com ícones grandes
3. **Badge** - Badges de status/indicadores
4. **SectionContainer** - Container padrão para seções

#### Section Components

1. **LandingHero** - Hero section com título, subtítulo, CTA e preview do WhatsApp
2. **HowItWorks** - Seção "Como funciona" com 3 passos
3. **DemoSection** - Demonstração visual lado a lado (WhatsApp + Dashboard)
4. **BenefitsSection** - Grid de benefícios (6 cards)
5. **FinalCTA** - Call-to-action final com múltiplos botões
6. **LandingFooter** - Footer com links e informações

## 📱 Mobile-First Approach

Todos os componentes foram desenvolvidos com mobile-first:

- Layout em coluna única no mobile
- Grid responsivo (1 coluna → 2 → 3 colunas)
- Botões full-width no mobile
- Tipografia escalável (text-base → sm: → lg:)
- Espaçamento adaptativo (px-4 → sm:px-6 → lg:px-8)

### Breakpoints

```css
sm: 640px   /* Tablets */
md: 768px   /* Tablets landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🎯 Seções da Landing Page

### 1. Hero Section

- Título principal com gradient verde
- Subtítulo explicando o fluxo WhatsApp → Dashboard
- CTA verde vibrante "Começar Gratuitamente"
- Preview do chat WhatsApp com exemplo de conversa
- Trust indicators (3 badges)

### 2. Como Funciona

- 3 cards verticais (mobile) / horizontal (desktop)
- Ícones: ShoppingCart, MessageSquare, LineChart
- Visualização do fluxo com números conectados

### 3. Demonstração Visual

- Layout vertical (mobile) / horizontal (desktop)
- Lado esquerdo: WhatsApp com mensagens reais
- Lado direito: Dashboard com dados atualizados
- Arrow indicator animado entre os lados

### 4. Benefícios

- Grid 1→2→3 colunas
- 6 cards de benefícios com ícones coloridos
- Hover effects com elevação

### 5. CTA Final

- Background com gradient blur
- 2 botões: "Conectar WhatsApp" e "Já tenho conta"
- Trust indicators finais
- Badge de destaque

### 6. Footer

- Brand + descrição
- Links de navegação
- Links de suporte
- Copyright

## 🔐 Middleware & Autenticação

O middleware foi configurado para:

- Proteger a rota `/dashboard` (requer autenticação)
- Permitir acesso público à landing page `/`
- Redirecionar para `/auth/sign-in` quando não autenticado
- Redirecionar para `/dashboard` após login/signup

## 🚀 Como Usar

### Desenvolvimento

```bash
npm run dev
# Acesse http://localhost:3000
```

### Fluxo do Usuário

1. Usuário acessa `/` (landing page)
2. Clica em "Começar Gratuitamente" → vai para `/auth/sign-up`
3. Após cadastro → redirecionado para `/dashboard`
4. Vincula WhatsApp no dashboard
5. Registra transações pelo WhatsApp
6. Visualiza dados atualizados no dashboard

## 📝 Próximos Passos Sugeridos

1. **SEO**
   - Adicionar meta tags Open Graph
   - Structured data (schema.org)
   - Sitemap.xml

2. **Analytics**
   - Google Analytics / Plausible
   - Tracking de conversão
   - Heatmaps

3. **Otimizações**
   - Lazy loading de imagens
   - Font optimization
   - Code splitting

4. **Melhorias**
   - Seção de FAQ
   - Depoimentos de usuários
   - Vídeo demo
   - Screenshots reais do WhatsApp (substituir mockups)

5. **A/B Testing**
   - Testar variações de copy
   - Testar posicionamento de CTAs
   - Testar cores de botões

## 🎨 Customização

### Cores

Todas as cores seguem o padrão Tailwind. Para customizar:

```tsx
// Em cada componente, busque por:
bg - green - 600; // CTA principal
bg - gray - 900; // Cards
text - white; // Texto principal
text - gray - 400; // Texto secundário
```

### Espaçamento

```tsx
py-12 sm:py-20  // Padding vertical das seções
gap-6 sm:gap-8  // Gap entre elementos
```

### Tipografia

```tsx
text-3xl sm:text-4xl lg:text-5xl  // Títulos responsivos
text-lg sm:text-xl                // Subtítulos
text-sm sm:text-base              // Texto body
```

## 📦 Dependências Usadas

- **lucide-react** - Ícones
- **next/link** - Navegação
- **next/image** - Otimização de imagens (preparado para uso)
- **tailwindcss** - Estilização

## 🌐 Acessibilidade

- Semantic HTML (section, nav, footer)
- Alt text preparado para imagens
- Contraste adequado (WCAG AA)
- Navegação por teclado funcional
- Focus states visíveis

## 📱 Responsividade Testada

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+
- Large Desktop: 1440px+
