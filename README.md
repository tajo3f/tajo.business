# TAJO ONE — Premium MVP V2

Versão revisada para **GitHub + Vercel + Supabase**, com site institucional premium e fluxo de autenticação reforçado.

## O que mudou nesta V2

- Next.js fixado em **16.3.8**.
- Removido o ESLint antigo do deploy para eliminar o aviso `eslint@9.39.5 deprecated`.
- `npm run typecheck` substitui o lint como verificação local nesta V2.
- Cadastro trata Supabase com confirmação de e-mail ligada ou desligada.
- Callback de autenticação redireciona falhas para login em vez de quebrar a aplicação.
- Workspace registra erros úteis nos Runtime Logs.
- `global-error.tsx` oferece uma tela de recuperação em vez do erro genérico do framework.
- Landing institucional completamente redesenhada.
- CSS avançado: glass, aurora, grid, noise, glow, marquee, reveal, hover e animações com `prefers-reduced-motion`.
- JS/React: efeitos de entrada por IntersectionObserver, pointer glow e menu mobile.

## IMPORTANTE: substituindo a V1

Se seu repositório antigo já tiver `package-lock.json`, faça isto no PC antes do novo deploy:

```bash
rm package-lock.json
rm -rf node_modules .next
npm install
npm run typecheck
npm run build
```

No Windows PowerShell você pode apagar `package-lock.json`, `node_modules` e `.next` manualmente pelo Explorer, depois executar:

```bash
npm install
npm run typecheck
npm run build
```

Depois faça commit do **novo** `package-lock.json`.

## Environment Variables

Crie na Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
NEXT_PUBLIC_TAJO_WHATSAPP=5527999999999
NEXT_PUBLIC_TAJO_PIX_KEY=sua-chave-pix
NEXT_PUBLIC_APP_URL=https://SEU-DOMINIO.vercel.app
```

Nunca coloque service role, database password ou secret key em `NEXT_PUBLIC_*`.

## Supabase Auth

Em **Authentication → URL Configuration**:

Site URL:

```text
https://SEU-DOMINIO.vercel.app
```

Redirect URL:

```text
https://SEU-DOMINIO.vercel.app/auth/callback
```

Para desenvolvimento local também adicione:

```text
http://localhost:3000/auth/callback
```

## Banco esperado

A migration inicial precisa conter:

- profiles
- niches
- plans
- organizations
- organization_members
- subscriptions
- payment_submissions
- brand_profiles
- RPC `create_organization`
- RPC `mark_payment_sent`

## Fluxo

```text
/signup
→ confirmação do e-mail (quando habilitada)
→ /auth/callback
→ /onboarding
→ create_organization()
→ /billing
→ comprovante via WhatsApp
→ mark_payment_sent()
→ aprovação TAJO
→ /app
```

## Aprovação manual temporária

```sql
select private.approve_payment(
  'TAJO-REFERENCIA',
  'UUID-ADMIN',
  1
);
```

## Diagnóstico

Se der erro no cadastro, abra Vercel → Logs → Runtime Logs e procure prefixos:

- `[auth/callback]`
- `[workspace]`
- `[onboarding]`
- `[billing]`
- `[TAJO ONE] global error`

## Próximos módulos

- histórico dos materiais;
- QR e links persistentes;
- analytics;
- campanhas;
- clientes;
- cupons/fidelidade;
- IA;
- painel administrativo.
