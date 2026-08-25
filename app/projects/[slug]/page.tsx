import Link from "next/link";

export default function ProjectPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">404</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Projeto não encontrado
        </h1>

        <p className="mt-4 text-muted-foreground">
          Este projeto ainda não possui uma página disponível.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center text-sm underline underline-offset-4"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}