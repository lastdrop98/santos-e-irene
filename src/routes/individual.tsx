import { createFileRoute } from "@tanstack/react-router";
import { wedding } from "@/config/wedding";
import { BottomNav } from "@/components/invite/BottomNav";
import { MusicaFundo } from "@/components/invite/MusicaFundo";
import { Hero } from "@/components/invite/sections/Hero";
import { Versiculo } from "@/components/invite/sections/Versiculo";
import { OsNoivos } from "@/components/invite/sections/OsNoivos";
import { Pais } from "@/components/invite/sections/Pais";
import { Agenda } from "@/components/invite/sections/Agenda";
import { AmigosFamilia } from "@/components/invite/sections/AmigosFamilia";
import { ContadorSection } from "@/components/invite/sections/ContadorSection";
import { Rsvp } from "@/components/invite/sections/Rsvp";
import { Presente } from "@/components/invite/sections/Presente";
import { MaisUmPasso } from "@/components/invite/sections/MaisUmPasso";
import { Galeria } from "@/components/invite/sections/Galeria";
import { Fecho } from "@/components/invite/sections/Fecho";

const titulo = `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Convite Individual`;
const descricao = `Convite individual de casamento de ${wedding.noivo.nome} e ${wedding.noiva.nome}, válido para 1 pessoa. ${wedding.dataCurta}, em ${wedding.local.nome}, Maputo.`;

export const Route = createFileRoute("/individual")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConviteIndividual,
});

function ConviteIndividual() {
  return (
    <div className="min-h-screen bg-muted/40">
      <main className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24 shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
        <h1 className="sr-only">
          Convite de casamento de {wedding.noivo.nome} e {wedding.noiva.nome}
        </h1>
        <Hero tipoFixo="individual" />
        <Versiculo />
        <OsNoivos />
        <Pais />
        <Agenda />
        <AmigosFamilia />
        <ContadorSection />
        <Rsvp />
        <Presente />
        <MaisUmPasso />
        <Galeria />
        <Fecho />
      </main>
      <BottomNav />
      <MusicaFundo />
    </div>
  );
}
