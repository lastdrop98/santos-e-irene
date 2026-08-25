import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";
import { supabase } from "@/integrations/supabase/client";

export function Rsvp() {
  const [enviado, setEnviado] = useState(false);
  const [aEnviar, setAEnviar] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nome = String(fd.get("nome") ?? "").trim();
    const presenca = String(fd.get("presenca") ?? "sim");
    const acompanhantes = Number(fd.get("acompanhantes") ?? 0);
    const mensagem = String(fd.get("mensagem") ?? "").trim();

    if (nome.length < 2 || nome.length > 100) {
      toast.error("Indique o seu nome completo.");
      return;
    }
    if (!Number.isFinite(acompanhantes) || acompanhantes < 0 || acompanhantes > 20) {
      toast.error("Número de acompanhantes inválido.");
      return;
    }
    if (mensagem.length > 1000) {
      toast.error("Mensagem demasiado longa.");
      return;
    }

    setAEnviar(true);
    const { error } = await supabase.from("confirmacoes").insert({
      nome,
      presenca,
      acompanhantes,
      mensagem,
    });
    setAEnviar(false);

    if (error) {
      toast.error("Não foi possível registar. Tente novamente.");
      return;
    }

    setEnviado(true);
    form.reset();

    const texto =
      `Olá ${wedding.noiva.primeiroNome}! Confirmação de presença — ${wedding.monograma}\n` +
      `Nome: ${nome}\n` +
      `Presença: ${presenca === "sim" ? "Vou comparecer" : "Não poderei comparecer"}\n` +
      `Acompanhantes: ${acompanhantes}` +
      (mensagem ? `\nMensagem: ${mensagem}` : "");

    window.open(
      `https://wa.me/258${wedding.rsvp.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
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
            <input id="nome" name="nome" required maxLength={100} className={fieldClass} />
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
            {aEnviar ? "A ENVIAR…" : "SUBMETER E ENVIAR POR WHATSAPP"}
          </button>
        </form>

        {enviado && (
          <p className="mt-4 text-center text-xs text-gold-dark">
            Confirmação registada! Se o WhatsApp não abrir, envie a mensagem para{" "}
            {wedding.rsvp.whatsapp}.
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
