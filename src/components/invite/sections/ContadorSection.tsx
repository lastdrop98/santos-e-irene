import { Countdown } from "@/components/invite/Countdown";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";
import { useSiteImage } from "@/hooks/useSiteImage";

export function ContadorSection() {
  const foto = useSiteImage("contador", wedding.fotos.contador);

  return (
    <section className="bg-gold pb-12">
      <Reveal>
        <div className="arch-frame mx-auto w-[86%] border border-background/40">
          <img
            src={foto}
            alt="Contagem decrescente para o casamento"
            width={896}
            height={1152}
            loading="lazy"
            className="h-[320px] w-full object-cover object-[center_15%]"
          />
        </div>
      </Reveal>
      <Reveal delay={120} className="-mt-8">
        <Countdown target={wedding.dataAlvo} />
      </Reveal>
    </section>
  );
}
