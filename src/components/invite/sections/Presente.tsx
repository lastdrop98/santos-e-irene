import { Gift } from "lucide-react";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function Presente() {
  return (
    <section className="bg-muted/40 px-6 py-14">
      <Reveal>
        <div className="rounded-3xl bg-card px-7 py-10 text-center shadow-[var(--shadow-soft)]">
          <Gift className="mx-auto text-gold" size={30} strokeWidth={1.2} />
          <h2 className="mt-4 font-script text-3xl text-gold">Presente de Casamento</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {wedding.presente.texto}
          </p>
          <div className="mt-6 space-y-1 text-sm text-foreground/85">
            <p>{wedding.presente.banco}</p>
            <p>Conta: {wedding.presente.conta}</p>
            <p>NIB: {wedding.presente.nib}</p>
            <p>{wedding.presente.titular}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-6 rounded-3xl bg-card px-6 py-8 shadow-[var(--shadow-soft)]">
          <p className="text-center font-serif text-lg italic text-gold-dark">
            Sugestão de Presentes
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {wedding.presente.lista.map((item) => (
              <div
                key={item.nome}
                className="overflow-hidden rounded-2xl border border-gold/20 bg-background shadow-sm"
              >
                <img
                  src={item.foto}
                  alt={item.nome}
                  className="h-24 w-full object-cover"
                  loading="lazy"
                />
                <p className="px-3 py-2 text-center text-xs font-medium text-foreground/85">
                  {item.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
