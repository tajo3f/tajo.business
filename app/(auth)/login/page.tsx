import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <section className="tajo-card w-full max-w-md rounded-[32px] p-6 md:p-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Área do cliente
      </p>
      <h1 className="text-3xl font-black tracking-[-0.05em]">Bem-vindo de volta.</h1>
      <p className="mb-7 mt-2 text-sm leading-6 text-muted">
        Entre para acessar sua central comercial.
      </p>
      <AuthForm mode="login" />
    </section>
  );
}
