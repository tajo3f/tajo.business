import { ReviewGenerator } from "@/components/review-generator";

export default function ReviewsPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Google Review
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Facilite o caminho até a avaliação.
      </h1>
      <p className="mb-8 mt-3 max-w-2xl leading-7 text-muted">
        Converta um Place ID em link direto e QR Code. O sistema não filtra notas
        nem interfere no conteúdo da avaliação.
      </p>
      <ReviewGenerator />
    </div>
  );
}
