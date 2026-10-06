import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Criar conta" };

export default function SignupPage() {
  return (
    <section className="tajo-card w-full max-w-md rounded-[32px] p-6 md:p-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Comece agora
      </p>
      <h1 className="text-3xl font-black tracking-[-0.05em]">
        Crie sua conta.
      </h1>
      <p className="mb-7 mt-2 text-sm leading-6 text-muted">
        Em poucos minutos sua empresa terá um espaço próprio no TAJO ONE.
      </p>
      <AuthForm mode="signup" />
    </section>
  );
}
