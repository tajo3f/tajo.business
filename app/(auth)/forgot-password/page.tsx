import { PasswordRecovery } from "@/components/password-recovery";

export const metadata = { title: "Recuperar senha" };

export default function ForgotPasswordPage() {
  return (
    <section className="tajo-card w-full max-w-md rounded-[32px] p-6 md:p-8">
      <h1 className="text-3xl font-black tracking-[-0.05em]">Recuperar acesso.</h1>
      <p className="mb-7 mt-2 text-sm text-muted">
        Digite seu e-mail e enviaremos o link de recuperação.
      </p>
      <PasswordRecovery />
    </section>
  );
}
