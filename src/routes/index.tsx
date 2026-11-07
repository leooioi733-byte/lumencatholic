import { createFileRoute, Link } from "@tanstack/react-router";
import { lumenButton } from "@/components/ui/lumen-button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Aprenda a fé católica" },
      {
        name: "description",
        content: "Lições curtas e interativas para conhecer a fé católica, todos os dias.",
      },
      { property: "og:title", content: "Lumen — Aprenda a fé católica" },
      {
        property: "og:description",
        content: "Lições curtas e interativas para conhecer a fé católica, todos os dias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-8 pt-10">
      <header className="animate-rise text-center">
        <h1 className="text-5xl font-bold text-primary">Lumen</h1>
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gold" />
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-6">
        <div className="animate-rise text-center [animation-delay:150ms]">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Conheça a fé, um passo por dia.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Lições curtas e divertidas sobre a Bíblia, Jesus, os sacramentos e a oração.
          </p>
        </div>
      </section>

      <div className="animate-rise space-y-4 [animation-delay:300ms]">
        <Link to="/cadastro" className={lumenButton()}>Começar</Link>
        <Link to="/inicio" className={lumenButton({ variant: "outline" })}>Já tenho uma conta</Link>
      </div>
    </main>
  );
}
