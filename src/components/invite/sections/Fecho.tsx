import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function Fecho() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={wedding.fotos.fecho}
        alt={`${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}`}
        width={896}
        height={1408}
        loading="lazy"
        className="h-[520px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
        <Reveal>
          <p className="font-script text-3xl leading-snug text-gold">
            Estamos ansiosos para recebê-lo no dia do nosso casamento.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.15em] text-background/60">
            {wedding.hashtag}
          </p>
        </Reveal>
      </div>

      <div className="bg-foreground/95 px-8 py-8 text-center">
        <p className="text-[11px] tracking-[0.12em] text-background/60">
          {wedding.musica}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 font-script text-sm text-gold">
            {wedding.monograma}
          </span>
          <p className="text-[10px] tracking-[0.25em] text-background/70">
            UM PRODUTO DA {wedding.negocio}
          </p>
        </div>
      </div>
    </section>
  );
}
