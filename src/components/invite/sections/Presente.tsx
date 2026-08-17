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
    </section>
  );
}
