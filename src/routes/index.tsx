import { createFileRoute } from "@tanstack/react-router";
import { wedding } from "@/config/wedding";
import { BottomNav } from "@/components/invite/BottomNav";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Convite de Casamento`,
      },
      {
        name: "description",
        content: `Convite digital do casamento de ${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}, ${wedding.dataExtenso}, em ${wedding.local.nome}, Maputo. Confirme a sua presença.`,
      },
      {
        property: "og:title",
        content: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Convite de Casamento`,
      },
      {
        property: "og:description",
        content: `Junte-se a nós no dia ${wedding.dataCurta} em ${wedding.local.nome}, Maputo.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Convite,
});

function Convite() {
  return (
    <div className="min-h-screen bg-muted/40">
      <main className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24 shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
        <h1 className="sr-only">
          Convite de casamento de {wedding.noivo.nome} e {wedding.noiva.nome}
        </h1>
        <Hero />
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
    </div>
  );
}
