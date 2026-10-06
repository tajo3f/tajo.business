import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3 font-black tracking-[-0.04em]">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--foreground)] text-xs text-[var(--background)]">
        T1
      </span>
      <span className="text-lg">TAJO ONE</span>
    </Link>
  );
}
