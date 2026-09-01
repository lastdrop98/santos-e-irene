import { createFileRoute } from "@tanstack/react-router";
import { wedding } from "@/config/wedding";
import { BottomNav } from "@/components/invite/BottomNav";
import { MusicaFundo } from "@/components/invite/MusicaFundo";
import { HeroXiguiane } from "@/components/invite/sections/HeroXiguiane";
import { OsNoivos } from "@/components/invite/sections/OsNoivos";
import { AgendaXiguiane } from "@/components/invite/sections/AgendaXiguiane";
import { Rsvp } from "@/components/invite/sections/Rsvp";
import { Fecho } from "@/components/invite/sections/Fecho";

export const Route = createFileRoute("/domingo")({
  head: () => ({
    meta: [
       { title: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Xiguiane` }, { name: "description", content: `Convite para o Xiguiane de ${wedding.noivo.nome}
       ${wedding.noiva.nome}.`, }, { property: "og:title", content: `${wedding.noivo.primeiroNome} & ${wedding.noiva.primeiroNome} — Xiguiane` }, { property: "og:description", content: `Convite para o Xiguiane de ${wedding.noivo.nome} 
       ${wedding.noiva.nome}, ${wedding.xiguiane.dataExtenso}.`, }, { property: "og:image", content: wedding.fotos.capa }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: wedding.fotos.capa },
    
    ],
  }),
  component: ConviteDomingo,
});

function ConviteDomingo() {
  return (
    <div className="min-h-screen bg-muted/40">
      <main className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24 shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
        <h1 className="sr-only">
          Convite para o Xiguiane de {wedding.noivo.nome} e {wedding.noiva.nome}
        </h1>
        <HeroXiguiane />
        <OsNoivos />
        <AgendaXiguiane />
        <Rsvp />
        <Fecho />
      </main>
      <BottomNav />
      <MusicaFundo />
    </div>
  );
}
