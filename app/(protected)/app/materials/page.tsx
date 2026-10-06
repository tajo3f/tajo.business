import { MaterialStudio } from "@/components/material-studio";
import { getWorkspaceContext } from "@/lib/workspace";

export default async function MaterialsPage() {
  const ctx = await getWorkspaceContext();

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Material Studio
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Uma peça pronta para vender.
      </h1>
      <p className="mb-8 mt-3 max-w-2xl leading-7 text-muted">
        Edite o conteúdo, visualize com sua identidade e baixe o material em PNG.
      </p>

      <MaterialStudio
        brandName={ctx?.brand?.brand_name || ctx?.organization.name || "Sua empresa"}
        primaryColor={ctx?.brand?.primary_color || "#111111"}
        secondaryColor={ctx?.brand?.secondary_color || "#ffffff"}
      />
    </div>
  );
}
