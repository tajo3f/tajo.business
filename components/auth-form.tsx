"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").replace(/\D/g, "");

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/app");
        router.refresh();
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      });

      if (error) throw error;

      setMessage(
        "Conta criada. Confira seu e-mail para confirmar o cadastro e continuar."
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Não foi possível continuar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={submit} className="grid gap-4">
      {mode === "signup" ? (
        <>
          <Field label="Seu nome">
            <Input name="fullName" autoComplete="name" required />
          </Field>
          <Field label="WhatsApp">
            <Input
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="27999999999"
              required
            />
          </Field>
        </>
      ) : null}

      <Field label="E-mail">
        <Input name="email" type="email" autoComplete="email" required />
      </Field>

      <Field
        label="Senha"
        hint={mode === "signup" ? "Use uma senha longa e exclusiva." : undefined}
      >
        <Input
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          minLength={8}
          required
        />
      </Field>

      {mode === "login" ? (
        <Link href="/forgot-password" className="text-right text-xs font-semibold text-muted">
          Esqueci minha senha
        </Link>
      ) : null}

      <Button disabled={loading} className="mt-2 w-full">
        {loading
          ? "Processando..."
          : mode === "login"
            ? "Entrar na plataforma"
            : "Criar minha conta"}
      </Button>

      {message ? (
        <div className="rounded-2xl border border-ui bg-soft p-4 text-sm text-muted">
          {message}
        </div>
      ) : null}

      <p className="text-center text-sm text-muted">
        {mode === "login" ? "Ainda não tem conta? " : "Já possui conta? "}
        <Link
          href={mode === "login" ? "/signup" : "/login"}
          className="font-bold text-[var(--foreground)]"
        >
          {mode === "login" ? "Criar agora" : "Entrar"}
        </Link>
      </p>
    </form>
  );
}
