"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";

export function UpdatePassword() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const password = String(formData.get("password") || "");
    if (password.length < 8) {
      setMessage("A senha precisa ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <form action={submit} className="grid gap-4">
      <Field label="Nova senha">
        <Input name="password" type="password" minLength={8} required />
      </Field>
      <Button disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar senha"}
      </Button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
