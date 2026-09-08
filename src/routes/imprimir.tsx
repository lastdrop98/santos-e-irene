import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { wedding } from "@/config/wedding";

export const Route = createFileRoute("/imprimir")({
  head: () => ({
    meta: [
      { title: "Convite para Imprimir — Santos & Irene" },
      {
        name: "description",
        content:
          "Versão para impressão do convite de casamento de Santos Viriato Bonde e Irene Fernanda Pequenino. 28 de Novembro de 2026, Maputo.",
      },
      {
        property: "og:title",
        content: "Convite para Imprimir — Santos & Irene",
      },
      {
        property: "og:description",
        content:
          "Versão para impressão do convite de casamento de Santos Viriato Bonde e Irene Fernanda Pequenino. 28 de Novembro de 2026, Maputo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ImprimirPage,
});

function ImprimirPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/convite-fisico-santos-irene.pdf";
    link.download = "convite-fisico-santos-irene.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      <img
        src={wedding.fotos.capa}
        alt={`${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}`}
        width={896}
        height={1408}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-8 py-16 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/70">
            <span className="font-script text-3xl text-gold">
              {wedding.monograma}
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] tracking-[0.35em] text-background/85">
              A UNIÃO MATRIMONIAL DE
            </p>
            <h1 className="font-script text-5xl leading-tight text-gold sm:text-6xl">
              {wedding.noivo.nome} &amp; {wedding.noiva.nome}
            </h1>
            <p className="text-xs tracking-[0.3em] text-background/85">
              {wedding.dataExtenso}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-sm tracking-wide text-background/80">
            <p>Filho de {wedding.noivo.pai} e {wedding.noivo.mae}</p>
            <p>Filha de {wedding.noiva.pai} e {wedding.noiva.mae}</p>
          </div>

          <div className="max-w-md border-l-2 border-gold/60 pl-6 text-left">
            <p className="font-serif italic text-lg leading-relaxed text-background/90">
              “{wedding.versiculoCapa.texto}”
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-gold">
              {wedding.versiculoCapa.referencia}
            </p>
          </div>

          <div className="w-full max-w-md space-y-4 rounded-2xl border border-gold/30 bg-black/30 p-6 backdrop-blur-sm">
            <p className="text-[10px] tracking-[0.25em] text-gold">
              PROGRAMA DO DIA
            </p>
            <div className="space-y-3 text-sm text-background/90">
              <div className="flex items-start justify-between gap-4">
                <span className="text-left">Cerimónia Civil</span>
                <span className="font-semibold text-gold">14h</span>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span>Cerimónia Religiosa</span>
                <span className="text-xs text-background/70">
                  {wedding.igreja.nome}, {wedding.igreja.morada}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-start justify-between gap-4">
                  <span>Copo d&apos;Água</span>
                  <span className="font-semibold text-gold">15h</span>
                </div>
                <span className="text-xs text-background/70">
                  {wedding.local.nome}, {wedding.local.morada}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-sm font-semibold tracking-[0.15em] text-background shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-colors hover:bg-gold-soft"
          >
            <Download size={18} strokeWidth={2.5} />
            BAIXAR CONVITE EM PDF
          </button>
        </div>
      </div>
    </section>
  );
}
