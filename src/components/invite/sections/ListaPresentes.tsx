import { useEffect, useState } from "react";
import { Check, Gift } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/invite/Reveal";
import { supabase } from "@/integrations/supabase/client";

type Presente = {
  id: string;
  nome: string;
  descricao: string;
  valor: string;
  reservado_por: string | null;
};

export function ListaPresentes() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);
  const [aReservar, setAReservar] = useState<string | null>(null);
  const [nome, setNome] = useState("");

  const carregar = async () => {
    const { data, error } = await supabase
      .from("presentes")
      .select("id, nome, descricao, valor, reservado_por")
      .order("created_at", { ascending: true });
    if (!error && data) setPresentes(data as Presente[]);
    setLoading(false);
  };

  useEffect(() => {
    void carregar();
  }, []);

  const reservar = async (id: string) => {
    const limpo = nome.trim();
    if (limpo.length < 2 || limpo.length > 100) {
      toast.error("Escreva o seu nome (2 a 100 caracteres).");
      return;
    }
    const { error } = await supabase
      .from("presentes")
      .update({ reservado_por: limpo, reservado_em: new Date().toISOString() })
      .eq("id", id)
      .is("reservado_por", null);
    if (error) {
      toast.error("Não foi possível reservar. Tente novamente.");
      return;
    }
    toast.success("Presente reservado. Obrigado!");
    setAReservar(null);
    setNome("");
    void carregar();
  };

  return (
    <section id="presentes" className="bg-background px-6 py-14">
      <Reveal>
        <h2 className="text-center font-script text-4xl text-gold">Lista de Presentes</h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
          Escolha um presente para reservar — assim evitamos repetições.
        </p>

        {loading ? (
          <p className="mt-8 text-center text-xs text-muted-foreground">A carregar…</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {presentes.map((p) => {
              const reservado = Boolean(p.reservado_por);
              return (
                <li
                  key={p.id}
                  className={`rounded-2xl border px-5 py-4 transition-colors ${
                    reservado ? "border-border bg-muted/40 opacity-70" : "border-gold/40 bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-foreground">{p.nome}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {p.descricao}
                      </p>
                      {p.valor && (
                        <p className="mt-1 text-[11px] tracking-[0.12em] text-gold-dark">
                          {p.valor}
                        </p>
                      )}
                    </div>
                    <Gift className="shrink-0 text-gold" size={20} strokeWidth={1.2} />
                  </div>

                  {reservado ? (
                    <p className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Check size={13} /> Já reservado
                    </p>
                  ) : aReservar === p.id ? (
                    <div className="mt-3 flex gap-2">
                      <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        maxLength={100}
                        placeholder="O seu nome"
                        className="w-full rounded-md border border-gold/40 bg-card px-3 py-2 text-xs outline-none focus:border-gold"
                      />
                      <button
                        onClick={() => reservar(p.id)}
                        className="shrink-0 rounded-md bg-foreground/85 px-4 text-xs tracking-[0.1em] text-background"
                      >
                        Confirmar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAReservar(p.id);
                        setNome("");
                      }}
                      className="mt-3 rounded-md border border-gold/50 px-4 py-2 text-[11px] tracking-[0.12em] text-gold-dark transition-colors hover:bg-gold/10"
                    >
                      RESERVAR
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
