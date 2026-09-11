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
    background: rgba(0, 0, 0, 0.78) !important;
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
    if (aPreparar) return;
    setAPreparar(true);
    try {
      const W = 148;
      const H = 210;
      const meio = W / 2;
      const dourado: [number, number, number] = [201, 168, 76];
      const creme: [number, number, number] = [245, 240, 225];

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });

      // Fundo: foto de capa
      try {
        const resposta = await fetch(wedding.fotos.capa);
        const blob = await resposta.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr.result as string);
          fr.onerror = reject;
          fr.readAsDataURL(blob);
        });
        const img = new Image();
        img.src = base64;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
        });
        // cobre a página inteira mantendo proporção (object-cover)
        const escala = Math.max(W / img.width, H / img.height);
        const larg = img.width * escala;
        const alt = img.height * escala;
        pdf.addImage(base64, "JPEG", (W - larg) / 2, (H - alt) / 2, larg, alt);
      } catch {
        pdf.setFillColor(15, 15, 15);
        pdf.rect(0, 0, W, H, "F");
      }

      // Véu escuro mais intenso para texto bem legível
      pdf.setGState(pdf.GState({ opacity: 0.82 }));
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, W, H, "F");
      pdf.setGState(pdf.GState({ opacity: 1 }));

      // Moldura dourada
      pdf.setDrawColor(...dourado);
      pdf.setLineWidth(0.5);
      pdf.rect(8, 8, W - 16, H - 16);

      // Helper para sombra de texto (traço escuro por trás)
      const desenharTextoComSombra = (
        texto: string | string[],
        x: number,
        yPos: number,
        options?: { align?: "left" | "center" | "right"; lineHeightFactor?: number }
      ) => {
        const align = options?.align ?? "left";
        pdf.setTextColor(0, 0, 0);
        const offset = 0.25;
        if (Array.isArray(texto)) {
          pdf.text(texto, x + offset, yPos + offset, { align, lineHeightFactor: options?.lineHeightFactor });
          pdf.setTextColor(...creme);
          pdf.text(texto, x, yPos, { align, lineHeightFactor: options?.lineHeightFactor });
        } else {
          pdf.text(texto, x + offset, yPos + offset, { align });
          pdf.setTextColor(...creme);
          pdf.text(texto, x, yPos, { align });
        }
      };

      let y = 24;

      pdf.setFont("times", "italic");
      pdf.setFontSize(22);
      pdf.setTextColor(...dourado);
      pdf.text(wedding.monograma, meio, y, { align: "center" });

      y += 12;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(...creme);
      desenharTextoComSombra("A UNIÃO MATRIMONIAL DE", meio, y, { align: "center" });

      y += 13;
      pdf.setFont("times", "italic");
      pdf.setFontSize(23);
      pdf.setTextColor(...dourado);
      pdf.text(wedding.noivo.nome, meio, y, { align: "center" });
      y += 8;
      pdf.setFontSize(13);
      pdf.text("&", meio, y, { align: "center" });
      y += 9;
      pdf.setFontSize(23);
      pdf.text(wedding.noiva.nome, meio, y, { align: "center" });

      y += 11;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      desenharTextoComSombra(wedding.dataExtenso, meio, y, { align: "center" });

      y += 9;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      desenharTextoComSombra(`Filho de ${wedding.noivo.pai} e ${wedding.noivo.mae}`, meio, y, {
        align: "center",
      });
      y += 5.5;
      desenharTextoComSombra(`Filha de ${wedding.noiva.pai} e ${wedding.noiva.mae}`, meio, y, {
        align: "center",
      });

      y += 13;
      // Fundo escuro por trás do versículo para maior legibilidade
      pdf.setGState(pdf.GState({ opacity: 0.55 }));
      pdf.setFillColor(0, 0, 0);
      const versiculoPreview = pdf.splitTextToSize(`“${wedding.versiculoCapa.texto}”`, W - 36);
      const alturaVersiculo = versiculoPreview.length * 5.8 + 10;
      pdf.roundedRect(14, y - 5, W - 28, alturaVersiculo, 3, 3, "F");
      pdf.setGState(pdf.GState({ opacity: 1 }));

      pdf.setFont("times", "italic");
      pdf.setFontSize(11.5);
      pdf.setTextColor(...creme);
      pdf.text(versiculoPreview, meio, y + 3, { align: "center" });
      y += versiculoPreview.length * 5.8 + 6;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(...dourado);
      pdf.text(wedding.versiculoCapa.referencia, meio, y, { align: "center" });

      // Programa do dia
      y += 15;
      pdf.setGState(pdf.GState({ opacity: 0.65 }));
      pdf.setFillColor(0, 0, 0);
      const alturaPrograma = 52;
      pdf.roundedRect(14, y - 8, W - 28, alturaPrograma, 4, 4, "F");
      pdf.setGState(pdf.GState({ opacity: 1 }));

      pdf.setDrawColor(...dourado);
      pdf.setLineWidth(0.35);
      pdf.line(34, y - 4, W - 34, y - 4);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...dourado);
      pdf.text("PROGRAMA DO DIA", meio, y, { align: "center" });

      y += 10;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      pdf.setTextColor(...creme);
      pdf.text("Cerimónia Civil — 14h", meio, y, { align: "center" });

      y += 9;
      pdf.text("Cerimónia Religiosa", meio, y, { align: "center" });
      y += 5.5;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...creme);
      pdf.text(`${wedding.igreja.nome}, ${wedding.igreja.morada}`, meio, y, {
        align: "center",
      });

      y += 10;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      pdf.text("Copo d'Água — 15h", meio, y, { align: "center" });
      y += 5.5;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.text(`${wedding.local.nome}, ${wedding.local.morada}`, meio, y, {
        align: "center",
      });

      pdf.save("convite-santos-irene.pdf");
    } catch (erro) {
      console.error("Erro ao gerar o PDF:", erro);
    } finally {
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
