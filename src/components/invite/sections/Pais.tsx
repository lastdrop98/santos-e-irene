import { Heart } from "lucide-react";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function Pais() {
  return (
    <section className="bg-background px-8 pb-20 text-center">
      <Reveal>
        <p className="font-script text-4xl text-gold">
          {wedding.noiva.primeiroNome}
        </p>
        <p className="mt-3 text-sm tracking-wide text-muted-foreground">
          Filha de
        </p>
        <p className="text-sm text-foreground/85">{wedding.noiva.pai}</p>
        <p className="text-xs text-muted-foreground">e</p>
        <p className="text-sm text-foreground/85">{wedding.noiva.mae}</p>
      </Reveal>

      <Reveal delay={100}>
        <Heart className="mx-auto my-8 text-gold" size={34} strokeWidth={1.2} />
      </Reveal>

      <Reveal delay={150}>
        <p className="font-script text-4xl text-gold">
          {wedding.noivo.primeiroNome}
        </p>
        <p className="mt-3 text-sm tracking-wide text-muted-foreground">
          Filho de
        </p>
        <p className="text-sm text-foreground/85">{wedding.noivo.pai}</p>
        <p className="text-xs text-muted-foreground">e</p>
        <p className="text-sm text-foreground/85">{wedding.noivo.mae}</p>
      </Reveal>
    </section>
  );
}
