import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";
import { supabase } from "@/integrations/supabase/client";

export function Rsvp() {
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState(false);
  const [aEnviar, setAEnviar] = useState(false);
  // null = ainda não sabemos (evita mismatch de hidratação); true = convite individual
  const [conviteIndividual, setConviteIndividual] = useState<boolean | null>(null);

  useEffect(() => {
    const individual =
      window.location.pathname === "/individual" ||
      new URLSearchParams(window.location.search).get("tipo") === "individual";
    setConviteIndividual(individual);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (aEnviar) return;
    setAEnviar(true);
    setErro(false);

    const form = new FormData(e.currentTarget);
    const nome = String(form.get("nome") || "").trim();
    const presenca = String(form.get("presenca") || "sim");
    const acompanhantes = conviteIndividual
      ? 0
      : Math.max(0, Math.min(20, Number(form.get("acompanhantes") || 0) || 0));
    const mensagem = String(form.get("mensagem") || "").trim();

    const { error } = await supabase.from("confirmacoes").insert({
      nome,
      presenca,
      acompanhantes,
      mensagem,
    });

    setAEnviar(false);
    if (error) {
      setErro(true);
      return;
    }
    setEnviado(true);
    (e.target as HTMLFormElement).reset();
  };

  const fieldClass =
    "mt-2 w-full rounded-md border border-gold/40 bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold";

  return (
    <section id="rsvp" className="bg-background px-8 py-16">
      <Reveal>
        <h2 className="text-center font-script text-4xl text-gold">Confirmar Presença</h2>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="nome">
              Nome e Apelido <span className="text-gold">*</span>
            </label>
            <input id="nome" name="nome" required minLength={2} maxLength={100} className={fieldClass} />
            <p className="mt-2 text-[11px] text-muted-foreground">Ex: António João</p>
          </div>

          <div>
            <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="presenca">
              Estará presente? <span className="text-gold">*</span>
            </label>
            <select id="presenca" name="presenca" required className={fieldClass} defaultValue="sim">
              <option value="sim">Vou comparecer</option>
              <option value="nao">Não poderei comparecer</option>
            </select>
          </div>

          {conviteIndividual !== true && (
            <div>
              <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="acompanhantes">
                Número de acompanhantes
              </label>
              <input
                id="acompanhantes"
                name="acompanhantes"
                type="number"
                min={0}
                max={20}
                defaultValue={0}
                className={fieldClass}
              />
            </div>
          )}

          <div>
            <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="mensagem">
              Mensagem para os noivos
            </label>
            <textarea id="mensagem" name="mensagem" rows={4} maxLength={1000} className={fieldClass} />
          </div>

          <button
            type="submit"
            disabled={aEnviar}
            className="w-full rounded-md bg-foreground/80 py-3 text-sm tracking-[0.15em] text-background transition-colors hover:bg-foreground disabled:opacity-60"
          >
            {aEnviar ? "A enviar..." : "Submeter"}
          </button>
        </form>

        {enviado && (
          <p className="mt-4 text-center text-xs text-gold-dark">
            Obrigado! A sua confirmação foi registada com sucesso.
          </p>
        )}
        {erro && (
          <p className="mt-4 text-center text-xs text-red-600">
            Ocorreu um erro ao enviar. Por favor tente novamente.
          </p>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {wedding.rsvp.prazo}
        </p>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Contactos (WhatsApp e chamadas):{" "}
          <a
            href={`https://wa.me/258${wedding.noivo.contacto}`}
            target="_blank"
            rel="noreferrer"
            className="text-gold-dark"
          >
            {wedding.noivo.primeiroNome} {wedding.noivo.contacto}
          </a>{" "}
          ·{" "}
          <a
            href={`https://wa.me/258${wedding.noiva.contacto}`}
            target="_blank"
            rel="noreferrer"
            className="text-gold-dark"
          >
            {wedding.noiva.primeiroNome} {wedding.noiva.contacto}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
