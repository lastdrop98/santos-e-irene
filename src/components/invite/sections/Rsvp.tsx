import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";

export function Rsvp() {
  const [enviado, setEnviado] = useState(false);

  // Ligue wedding.rsvp.endpoint a um serviço tipo Formspree/EmailJS quando quiser.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!wedding.rsvp.endpoint) {
      e.preventDefault();
      setEnviado(true);
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-md border border-gold/40 bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold";

  return (
    <section id="rsvp" className="bg-background px-8 py-16">
      <Reveal>
        <h2 className="text-center font-script text-4xl text-gold">Confirmar Presença</h2>

        <form
          action={wedding.rsvp.endpoint || undefined}
          method="POST"
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="nome">
              Nome e Apelido <span className="text-gold">*</span>
            </label>
            <input id="nome" name="nome" required className={fieldClass} />
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
              defaultValue={0}
              className={fieldClass}
            />
          </div>

          <div>
            <label className="text-xs tracking-[0.12em] text-foreground/80" htmlFor="mensagem">
              Mensagem para os noivos
            </label>
            <textarea id="mensagem" name="mensagem" rows={4} className={fieldClass} />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-foreground/80 py-3 text-sm tracking-[0.15em] text-background transition-colors hover:bg-foreground"
          >
            Submeter
          </button>
        </form>

        {enviado && (
          <p className="mt-4 text-center text-xs text-gold-dark">
            Obrigado! (formulário de demonstração — ligue o endpoint para receber as respostas)
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
