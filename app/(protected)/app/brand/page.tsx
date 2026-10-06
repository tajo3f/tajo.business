import { BrandForm } from "@/components/brand-form";
import { getWorkspaceContext } from "@/lib/workspace";

export default async function BrandPage() {
  const ctx = await getWorkspaceContext();

  if (!ctx?.brand) {
    return <p>Brand profile não encontrado.</p>;
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Brand Brain
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Sua identidade, uma única vez.
      </h1>
      <p className="mb-8 mt-3 max-w-2xl leading-7 text-muted">
        O Material Studio usa esses dados para manter consistência nas próximas
        criações.
      </p>

      <BrandForm
        organizationId={ctx.organization.id}
        initial={ctx.brand}
      />
    </div>
  );
}
