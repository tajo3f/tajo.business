export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex items-center gap-3 text-sm font-bold text-muted">
        <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--accent)]" />
        Carregando TAJO ONE…
      </div>
    </div>
  );
}
