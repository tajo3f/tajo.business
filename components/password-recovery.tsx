"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";

export function PasswordRecovery() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const email = String(formData.get("email") || "").trim();
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    setMessage(
      error
        ? error.message
        : "Se o e-mail estiver cadastrado, enviaremos as instruções de recuperação."
    );
    setLoading(false);
  }

  return (
    <form action={submit} className="grid gap-4">
      <Field label="E-mail da sua conta">
        <Input name="email" type="email" required />
      </Field>
      <Button disabled={loading}>
        {loading ? "Enviando..." : "Enviar recuperação"}
      </Button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
