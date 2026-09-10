import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";
import { useSiteImage } from "@/hooks/useSiteImage";

export function OsNoivos() {
  const foto = useSiteImage("noivos", wedding.fotos.noivos);

  return (
    <section id="noivos" className="bg-background px-8 pb-16 pt-6 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-gold">Os Noivos</h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="arch-frame mx-auto mt-8 w-[78%] border border-gold/40">
          <img
            src={foto}
            alt={`${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}`}
            width={896}
            height={1152}
            loading="lazy"
            className="h-[400px] w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
