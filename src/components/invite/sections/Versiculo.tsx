import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function Versiculo() {
  return (
    <section id="versiculo" className="bg-background px-10 py-20 text-center">
      <Reveal>
        <p className="font-script text-3xl text-gold">Lei Divina...</p>
        <p className="mt-6 font-serif text-lg italic leading-relaxed text-foreground/80">
          “{wedding.versiculoCapa.texto}”
        </p>
        <p className="mt-4 text-xs tracking-[0.2em] text-muted-foreground">
          {wedding.versiculoCapa.referencia}
        </p>
      </Reveal>
    </section>
  );
}
