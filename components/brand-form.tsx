"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";

type Brand = {
  brand_name: string | null;
  slogan: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string | null;
  visual_style: string | null;
};

export function BrandForm({
  organizationId,
  initial,
}: {
  organizationId: string;
  initial: Brand;
}) {
  const [brandName, setBrandName] = useState(initial.brand_name || "");
  const [slogan, setSlogan] = useState(initial.slogan || "");
  const [primaryColor, setPrimaryColor] = useState(initial.primary_color || "#111111");
  const [secondaryColor, setSecondaryColor] = useState(initial.secondary_color || "#ffffff");
  const [accentColor, setAccentColor] = useState(initial.accent_color || "");
  const [visualStyle, setVisualStyle] = useState(initial.visual_style || "minimalista");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("brand_profiles")
      .update({
        brand_name: brandName.trim(),
        slogan: slogan.trim() || null,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor || null,
        visual_style: visualStyle.trim() || null,
      })
      .eq("organization_id", organizationId);

    setMessage(error ? error.message : "Identidade atualizada.");
    setLoading(false);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <section className="tajo-card rounded-[30px] p-5 md:p-7">
        <div className="grid gap-5">
          <Field label="Nome da marca">
            <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </Field>

          <Field label="Slogan">
            <Input value={slogan} onChange={(e) => setSlogan(e.target.value)} />
          </Field>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Primária", primaryColor, setPrimaryColor],
              ["Secundária", secondaryColor, setSecondaryColor],
              ["Destaque", accentColor, setAccentColor],
            ].map(([label, value, setter]) => (
              <Field key={String(label)} label={String(label)}>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={String(value || "#000000")}
                    onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                    className="h-12 w-14 rounded-xl border border-ui bg-surface p-1"
                  />
                  <Input
                    value={String(value)}
                    onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                    placeholder="#111111"
                  />
                </div>
              </Field>
            ))}
          </div>

          <Field label="Estilo visual">
            <select
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              className="focus-ring h-12 rounded-2xl border border-ui bg-surface px-4 text-sm"
            >
              <option value="minimalista">Minimalista</option>
              <option value="premium">Premium</option>
              <option value="ousado">Ousado</option>
              <option value="elegante">Elegante</option>
              <option value="acolhedor">Acolhedor</option>
            </select>
          </Field>

          <Button onClick={save} disabled={loading} className="md:w-fit">
            <Save size={17} />
            {loading ? "Salvando..." : "Salvar Brand Brain"}
          </Button>

          {message ? <p className="text-sm text-muted">{message}</p> : null}
        </div>
      </section>

      <aside
        className="min-h-[420px] rounded-[30px] p-7"
        style={{
          background: primaryColor,
          color: secondaryColor,
        }}
      >
        <p className="text-xs font-black uppercase tracking-[0.18em] opacity-60">
          Brand Brain
        </p>
        <div className="flex h-[330px] flex-col justify-end">
          <p className="text-sm opacity-70">{visualStyle}</p>
          <h2 className="mt-2 text-5xl font-black leading-[0.92] tracking-[-0.07em]">
            {brandName || "Sua marca"}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 opacity-70">
            {slogan || "Sua identidade aplicada em todos os materiais."}
          </p>
          {accentColor ? (
            <span
              className="mt-7 h-3 w-20 rounded-full"
              style={{ background: accentColor }}
            />
          ) : null}
        </div>
      </aside>
    </div>
  );
}
