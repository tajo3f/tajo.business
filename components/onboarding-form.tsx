"use client";

import { Check, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";
import { formatBRL } from "@/lib/utils";

type Niche = {
  slug: string;
  name: string;
  description: string | null;
};

type Plan = {
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
};

export function OnboardingForm({
  niches,
  plans,
}: {
  niches: Niche[];
  plans: Plan[];
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [plan, setPlan] = useState(plans[1]?.slug || plans[0]?.slug || "pro");
  const [niche, setNiche] = useState(niches[0]?.slug || "outros");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [taxId, setTaxId] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canContinue = useMemo(
    () => name.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10,
    [name, whatsapp]
  );

  function updateName(value: string) {
    setName(value);
    setSlug(
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 70)
    );
  }

  async function finish() {
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.rpc("create_organization", {
      p_name: name.trim(),
      p_slug: slug,
      p_niche_slug: niche,
      p_plan_slug: plan,
      p_whatsapp: whatsapp.replace(/\D/g, ""),
      p_tax_id: taxId.trim() || null,
      p_business_email: businessEmail.trim() || null,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/billing?created=1");
    router.refresh();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <section className="tajo-card rounded-[32px] p-5 md:p-7">
        <div className="mb-7 flex items-center gap-2 text-xs font-bold text-muted">
          <span className={step === 1 ? "text-[var(--foreground)]" : ""}>EMPRESA</span>
          <ChevronRight size={14} />
          <span className={step === 2 ? "text-[var(--foreground)]" : ""}>PLANO</span>
        </div>

        {step === 1 ? (
          <div className="grid gap-5">
            <Field label="Nome da empresa">
              <Input
                value={name}
                onChange={(e) => updateName(e.target.value)}
                placeholder="Ex.: Barbearia Central"
              />
            </Field>

            <Field label="Identificador">
              <Input
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "")
                      .slice(0, 80)
                  )
                }
                placeholder="barbearia-central"
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="WhatsApp">
                <Input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  inputMode="tel"
                  placeholder="27999999999"
                />
              </Field>

              <Field label="CNPJ/CPF (opcional)">
                <Input
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  inputMode="numeric"
                />
              </Field>
            </div>

            <Field label="E-mail comercial (opcional)">
              <Input
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                type="email"
              />
            </Field>

            <Field label="Segmento">
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="focus-ring h-12 rounded-2xl border border-ui bg-surface px-4 text-sm"
              >
                {niches.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>

            <Button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep(2)}
              className="mt-2 md:w-fit"
            >
              Escolher plano <ChevronRight size={18} />
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {plans.map((item) => {
              const selected = item.slug === plan;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setPlan(item.slug)}
                  className={`focus-ring flex items-start justify-between gap-5 rounded-[24px] border p-5 text-left transition ${
                    selected
                      ? "border-[var(--foreground)] bg-soft"
                      : "border-ui bg-surface"
                  }`}
                >
                  <span>
                    <span className="text-lg font-black">{item.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">
                      {item.description}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block whitespace-nowrap text-lg font-black">
                      {formatBRL(item.price_cents)}
                    </span>
                    <span className="text-xs text-muted">/mês</span>
                    {selected ? (
                      <span className="mt-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--foreground)] text-[var(--background)]">
                        <Check size={15} />
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="min-h-11 rounded-2xl border border-ui px-5 text-sm font-bold"
              >
                Voltar
              </button>
              <Button type="button" onClick={finish} disabled={loading}>
                {loading ? "Criando empresa..." : "Criar minha empresa"}
              </Button>
            </div>
          </div>
        )}

        {message ? (
          <div className="mt-5 rounded-2xl border border-ui bg-soft p-4 text-sm text-muted">
            {message}
          </div>
        ) : null}
      </section>

      <aside className="rounded-[32px] bg-[var(--foreground)] p-6 text-[var(--background)]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-60">
          Seu espaço
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">
          {name || "Sua empresa"}
        </h2>
        <p className="mt-3 text-sm leading-6 opacity-70">
          Depois da confirmação de pagamento, você entra no Brand Brain e
          personaliza toda a experiência.
        </p>

        <div className="mt-8 grid gap-3 text-sm">
          {[
            "Identidade centralizada",
            "Material Studio",
            "QR & Links",
            "Google Review",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={16} />
              {item}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
