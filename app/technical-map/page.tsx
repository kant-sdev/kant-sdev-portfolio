import Link from "next/link";

export default function TechnicalMapPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Em construção</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Mapa Técnico
        </h1>

        <p className="mt-4 text-muted-foreground">
          Esta página está sendo construída e estará disponível em breve.
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