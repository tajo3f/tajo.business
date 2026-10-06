import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[14px] bg-[var(--text)] text-xs font-black text-[var(--bg)]">
        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[var(--accent)] opacity-90" />
        T1
      </span>
      <span>
        <span className="block text-[17px] font-black leading-none tracking-[-0.05em]">TAJO ONE</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-muted">Business Studio</span>
      </span>
    </Link>
  );
}
