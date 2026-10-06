# Vercel Checklist — TAJO ONE V2

1. Exclua o `package-lock.json` antigo da V1.
2. Rode `npm install` e gere um lock novo.
3. Rode `npm run typecheck`.
4. Rode `npm run build`.
5. Envie tudo ao GitHub.
6. Na Vercel, confira as 5 Environment Variables do README.
7. Faça Redeploy.
8. No Supabase, confira Site URL e `/auth/callback`.
9. Teste cadastro com um e-mail novo.
10. Se falhar, abra Runtime Logs e envie o erro com um dos prefixos do README.
