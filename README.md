# TAJO ONE — MVP

Frontend MVP do TAJO ONE para **Next.js + Vercel + Supabase**.

## Entregue nesta versão

- Landing page;
- tema claro/escuro;
- login;
- cadastro;
- confirmação de e-mail;
- recuperação de senha;
- onboarding de empresa;
- seleção de nicho;
- seleção de plano;
- criação de `organization` via RPC;
- pagamento manual;
- link pronto para envio do comprovante via WhatsApp;
- estado `pending_payment / under_review / active`;
- bloqueio server-side de `/app` sem assinatura ativa;
- dashboard;
- Brand Brain;
- Material Studio com exportação PNG;
- gerador de QR para WhatsApp, URL, Pix e Wi-Fi;
- gerador de acesso direto para Google Review por Place ID;
- tela de resultados preparada para analytics;
- conta/assinatura;
- headers básicos de segurança;
- `proxy.ts` para sessão Supabase SSR.

## Banco esperado

Este frontend foi criado para a migration inicial já definida para o TAJO ONE, contendo:

- `profiles`
- `niches`
- `plans`
- `organizations`
- `organization_members`
- `subscriptions`
- `payment_submissions`
- `brand_profiles`
- RPC `create_organization`
- RPC `mark_payment_sent`

## 1. Instalação

```bash
npm install
```

## 2. Variáveis de ambiente

Copie:

```bash
cp .env.example .env.local
```

Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_TAJO_WHATSAPP=
NEXT_PUBLIC_TAJO_PIX_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

A `publishable key` pode estar no browser. **Nunca coloque secret/service-role key em variável `NEXT_PUBLIC_*`.**

## 3. Supabase Auth

No painel do Supabase, configure as URLs de redirect do projeto.

Local:

```text
http://localhost:3000/auth/callback
```

Produção:

```text
https://SEU-DOMINIO.com/auth/callback
```

Ative confirmação de e-mail antes de produção.

## 4. Executar

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## 5. Fluxo esperado

```text
/signup
  ↓
confirma e-mail
  ↓
/onboarding
  ↓
create_organization()
  ↓
/billing
  ↓
envia comprovante no WhatsApp
  ↓
mark_payment_sent()
  ↓
TAJO aprova no banco/admin
  ↓
/app
```

## 6. Aprovação manual

Enquanto não existir o painel administrativo completo, a assinatura é aprovada pelo mecanismo privado já criado no banco:

```sql
select private.approve_payment(
  'TAJO-REFERENCIA',
  'UUID-DO-ADMIN',
  1
);
```

## 7. Segurança

O frontend não considera o estado visual como autorização.

A rota `/app` consulta a assinatura no servidor. Mesmo que alguém modifique JavaScript, HTML ou localStorage, a aplicação volta para `/billing` sem assinatura ativa.

A segurança dos dados depende também de:

- RLS;
- grants mínimos;
- schemas privados;
- políticas do Storage;
- rate limiting/WAF no deploy;
- secrets somente no servidor;
- MFA para administradores.

### Importante sobre Google Review

A rota `/api/reviews/normalize`:

1. aceita Place ID diretamente;
2. reconhece links que contenham `placeid`, `place_id` ou `query_place_id`;
3. tenta seguir links oficiais do Google;
4. bloqueia hosts arbitrários para reduzir risco de SSRF.

Alguns links encurtados do Google não expõem o Place ID na URL final. Nesses casos será necessária uma integração oficial adicional de Places no backend.

## 8. Deploy na Vercel

1. Suba o projeto no GitHub;
2. importe o repositório na Vercel;
3. adicione as variáveis de ambiente;
4. configure o domínio;
5. adicione a URL de produção nos redirects do Supabase;
6. habilite as proteções disponíveis no Firewall/WAF do projeto.

## Próximas migrations recomendadas

```text
002_products_services
003_brand_assets_storage
004_material_history
005_qr_links_tracking
006_google_reviews
007_campaigns
008_customers
009_coupons_loyalty
010_analytics
011_ai_usage_limits
012_admin_backend
013_security_hardening
```

## Observação

O histórico de QR, materiais e cliques ainda não persiste porque a migration inicial atual não contém essas tabelas. As ferramentas funcionam no MVP, mas analytics real entra nas migrations seguintes.
