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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Convite de Casamento`,
      },
      {
        name: "description",
        content: `Convite digital de casamento de ${wedding.noivo.nome} e ${wedding.noiva.nome}. Junte-se a nós no dia ${wedding.dataCurta}, em ${wedding.local.nome}, Maputo. Confirme a sua presença e celebre este momento connosco.`,
      },
      {
        property: "og:title",
        content: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Convite de Casamento`,
      },
      {
        property: "og:description",
        content: `Convite digital de casamento de ${wedding.noivo.nome} e ${wedding.noiva.nome}. Junte-se a nós no dia ${wedding.dataCurta}, em ${wedding.local.nome}, Maputo. Confirme a sua presença e celebre este momento connosco.`,
      },
      { property: "og:type", content: "website" }, { property: "og:image", content: "https://santos-e-irene.lovable.app/__l5e/assets-v1/1ecdd8fb-817f-40bb-b2fb-3e47beaaacc6/foto-1.jpeg" }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: "https://santos-e-irene.lovable.app/__l5e/assets-v1/1ecdd8fb-817f-40bb-b2fb-3e47beaaacc6/foto-1.jpeg" },
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
      <MusicaFundo />
    </div>
  );
}
