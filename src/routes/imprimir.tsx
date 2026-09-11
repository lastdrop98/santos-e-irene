import { createFileRoute } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
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

const printStyles = `
  .capturing .capture-clean {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: rgba(0, 0, 0, 0.65) !important;
  }

  @media print {
    .no-print {
      display: none !important;
    }
    .print-exact {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .print-auto-height {
      min-height: auto !important;
    }
  }
`;

function ImprimirPage() {
  const [aPreparar, setAPreparar] = useState(false);
  const conviteRef = useRef<HTMLElement>(null);
  const programaRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const elemento = conviteRef.current;
    if (!elemento || aPreparar) return;

    setAPreparar(true);
    try {
      // Remove efeitos que dificultam a captura (backdrop-blur) durante a renderização
      elemento.classList.add("capturing");
      programaRef.current?.classList.add("capture-clean");

      const imagem = await toJpeg(elemento, {
        pixelRatio: 2,
        quality: 0.92,
        backgroundColor: "#000000",
        filter: (node) => !node.classList?.contains("no-print"),
      });

      // A5 em mm
      const pdfWidth = 148;
      const pdfHeight = 210;

      // A imagem do toJpeg é JPEG em base64; obtemos as dimensões reais
      const img = new Image();
      img.src = imagem;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const proporcao = img.height / img.width;
      const imgHeight = pdfWidth * proporcao;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      if (imgHeight <= pdfHeight) {
        pdf.addImage(imagem, "JPEG", 0, 0, pdfWidth, imgHeight);
      } else {
        // Conteúdo mais alto que uma página: distribui por várias páginas A5
        let posicao = 0;
        let restante = imgHeight;
        pdf.addImage(imagem, "JPEG", 0, posicao, pdfWidth, imgHeight);
        restante -= pdfHeight;
        while (restante > 0) {
          posicao -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imagem, "JPEG", 0, posicao, pdfWidth, imgHeight);
          restante -= pdfHeight;
        }
      }

      pdf.save("convite-santos-irene.pdf");
    } catch (erro) {
      console.error("Erro ao gerar o PDF:", erro);
    } finally {
      elemento.classList.remove("capturing");
      programaRef.current?.classList.remove("capture-clean");
      setAPreparar(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{printStyles}</style>
      <section
        ref={conviteRef}
        className="print-exact print-auto-height relative min-h-[100svh] w-full overflow-hidden bg-background"
      >
        <img
          src={wedding.fotos.capa}
          alt={`${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}`}
          width={896}
          height={1408}
          className="absolute inset-0 h-full w-full object-cover print-exact"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 print-exact" />

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

            <div
              ref={programaRef}
              className="w-full max-w-md space-y-4 rounded-2xl border border-gold/30 bg-black/30 p-6 backdrop-blur-sm"
            >
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

            <div className="no-print flex flex-col items-center gap-4 sm:flex-row">
              <button
                onClick={handleDownload}
                disabled={aPreparar}
                className="flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-sm font-semibold tracking-[0.15em] text-background shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-colors hover:bg-gold-soft disabled:cursor-wait disabled:opacity-70"
              >
                <Download size={18} strokeWidth={2.5} />
                {aPreparar ? "A PREPARAR…" : "BAIXAR CONVITE EM PDF"}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-3 rounded-full border border-gold/70 bg-black/40 px-8 py-4 text-sm font-semibold tracking-[0.15em] text-gold backdrop-blur-sm transition-colors hover:bg-gold/10"
              >
                <Printer size={18} strokeWidth={2.5} />
                IMPRIMIR AGORA
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
