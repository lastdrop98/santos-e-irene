import { useEffect, useState } from "react";
import { ChevronDown, User, Users } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useSiteImage } from "@/hooks/useSiteImage";

export function Hero({ tipoFixo }: { tipoFixo?: "individual" | "casal" }) {
  const [badge, setBadge] = useState<string | null>(tipoFixo ?? null);
  const capa = useSiteImage("capa", wedding.fotos.capa);

  useEffect(() => {
    if (tipoFixo) return;
    const tipo = new URLSearchParams(window.location.search).get("tipo");
    if (tipo === "individual") setBadge("individual");
    else setBadge("casal");
  }, [tipoFixo]);


  const scroll = () =>
    document.getElementById("versiculo")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="capa" className="relative h-[100svh] w-full overflow-hidden">
      <img
        src={capa}
        alt={`${wedding.noivo.primeiroNome} e ${wedding.noiva.primeiroNome}`}
        width={896}
        height={1408}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/70" />

      <div className="relative flex h-full flex-col items-center justify-between px-8 py-12 text-center">
        <div className="fade-up flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70">
            <span className="font-script text-2xl text-gold">
              {wedding.monograma}
            </span>
          </div>
        </div>

        <div className="fade-up mt-[20vh] flex flex-col items-center" style={{ animationDelay: "0.2s" }}>
          <p className="text-[10px] tracking-[0.35em] text-background/85">
            A UNIÃO MATRIMONIAL DE
          </p>
          <p className="mt-3 font-script text-5xl leading-tight text-gold">
            {wedding.noivo.primeiroNome} &amp; {wedding.noiva.primeiroNome}
          </p>
          <p className="mt-3 text-xs tracking-[0.3em] text-background/85">
            {wedding.dataCurta}
          </p>
          {badge && (
            <p className="mt-5 flex items-center gap-2.5 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold tracking-[0.15em] text-background shadow-[0_0_24px_rgba(212,175,55,0.55)] ring-1 ring-gold-soft/70">
              {badge === "individual" ? <User size={15} strokeWidth={2.5} /> : <Users size={15} strokeWidth={2.5} />}
              {badge === "individual" ? "CONVITE VÁLIDO PARA 1 PESSOA" : "CONVITE VÁLIDO PARA 2 PESSOAS"}
            </p>
          )}
        </div>

        <div className="fade-up flex flex-col items-center gap-4" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={scroll}
            className="pulse-soft rounded-full bg-gold px-8 py-3 text-[11px] tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
          >
            VER CONVITE
          </button>
          <p className="text-[10px] tracking-[0.15em] text-background/70">
            partilhe os seus momentos com {wedding.hashtag}
          </p>
          <ChevronDown className="text-background/70" size={18} />
        </div>
      </div>
    </section>
  );
}
