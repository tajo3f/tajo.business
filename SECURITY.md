# Security Policy — TAJO ONE

## Regras obrigatórias

- Nunca versionar `.env.local`.
- Nunca expor secret/service-role key no browser.
- Nunca confiar em `localStorage`, query string ou estado React para autorização.
- Assinatura deve ser verificada server-side e protegida por RLS.
- Toda nova tabela multiempresa deve carregar `organization_id`.
- Toda tabela exposta deve passar por revisão de RLS e grants.
- Uploads devem usar allowlist de MIME, limite de tamanho e Storage Policies.
- Operações administrativas devem ser server-only e auditadas.
- Dependências devem permanecer atualizadas.

## Relato de vulnerabilidades

Não publique vulnerabilidades em issues públicas. Use um canal privado de segurança definido pela TAJO antes do lançamento comercial.
