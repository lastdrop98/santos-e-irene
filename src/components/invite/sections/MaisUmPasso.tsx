import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function MaisUmPasso() {
  return (
    <section className="bg-background px-10 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-3xl leading-snug text-gold">
          Mais Um Passo Na Nossa Jornada
        </h2>
        <p className="mt-6 font-serif text-lg italic leading-relaxed text-foreground/80">
          “{wedding.versiculoFinal.texto}”
        </p>
        <p className="mt-4 text-xs tracking-[0.2em] text-muted-foreground">
          {wedding.versiculoFinal.referencia}
        </p>
      </Reveal>
    </section>
  );
}
