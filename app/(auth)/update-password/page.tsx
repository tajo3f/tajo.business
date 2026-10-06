import { UpdatePassword } from "@/components/update-password";

export const metadata = { title: "Nova senha" };

export default function UpdatePasswordPage() {
  return (
    <section className="tajo-card w-full max-w-md rounded-[32px] p-6 md:p-8">
      <h1 className="text-3xl font-black tracking-[-0.05em]">Defina sua nova senha.</h1>
      <p className="mb-7 mt-2 text-sm text-muted">
        Use uma senha forte e exclusiva para o TAJO ONE.
      </p>
      <UpdatePassword />
    </section>
  );
}
