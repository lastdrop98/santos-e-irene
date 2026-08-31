import { CalendarDays, Diamond, MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function AgendaXiguiane() {
  return (
    <section id="agenda" className="relative bg-gold px-6 py-16">
      <Reveal>
        <div className="rounded-3xl bg-card px-6 py-10 text-center shadow-[var(--shadow-soft)]">
          <CalendarDays className="mx-auto text-gold" size={30} strokeWidth={1.2} />
          <h2 className="mt-4 font-serif text-3xl text-gold-dark">Xiguiane</h2>
          <p className="mt-3 text-sm text-muted-foreground">{wedding.xiguiane.dataExtenso}</p>

          <Diamond className="mx-auto my-6 text-gold" size={16} strokeWidth={1.2} />

          <p className="font-serif text-sm uppercase italic tracking-[0.2em] text-gold-dark">Receção</p>
          <p className="mt-1 text-sm tracking-[0.15em] text-foreground/80">{wedding.xiguiane.hora}</p>

          <div className="mt-10">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <Navigation className="text-gold" size={20} strokeWidth={1.3} />
              <span className="h-px w-10 bg-gold/50" />
            </div>
            <p className="mt-5 font-serif text-xl font-semibold text-foreground">{wedding.xiguiane.local.nome}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{wedding.xiguiane.local.morada}</p>
            
              href={wedding.xiguiane.local.mapa}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-7 py-3 text-[11px] tracking-[0.25em] text-foreground/80 transition-colors hover:bg-muted/70"
            >
              <MapPin size={14} /> MAPA
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
