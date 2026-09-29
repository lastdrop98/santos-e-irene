import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Confirmacao = Database["public"]["Tables"]["confirmacoes"]["Row"];
type ConfirmacaoXiguiane = Database["public"]["Tables"]["confirmacoes_xiguiane"]["Row"];

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel de Confirmações — Área dos Noivos" },
      { name: "description", content: "Lista de confirmações de presença do casamento de Santos e Irene." },
      { property: "og:title", content: "Painel de Confirmações — Área dos Noivos" },
      { property: "og:description", content: "Lista de confirmações de presença do casamento de Santos e Irene." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [confirmacoes, setConfirmacoes] = useState<Confirmacao[]>([]);
  const [confirmacoesXiguiane, setConfirmacoesXiguiane] = useState<ConfirmacaoXiguiane[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const [normalResult, xiguianeResult] = await Promise.all([
        supabase.from("confirmacoes").select("*").order("created_at", { ascending: false }),
        supabase.from("confirmacoes_xiguiane").select("*").order("created_at", { ascending: false }),
      ]);

      if (!mounted) return;

      if (normalResult.error) console.error(normalResult.error);
      else setConfirmacoes(normalResult.data || []);

      if (xiguianeResult.error) console.error(xiguianeResult.error);
      else setConfirmacoesXiguiane(xiguianeResult.data || []);

      setLoading(false);
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("confirmacoes-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "confirmacoes" },
        (payload) => {
          setConfirmacoes((prev) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Confirmacao, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map((c) =>
                c.id === (payload.new as Confirmacao).id ? (payload.new as Confirmacao) : c,
              );
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((c) => c.id !== (payload.old as Confirmacao).id);
            }
            return prev;
          });
        },
      )
      .subscribe();

    const xiguianeChannel = supabase
      .channel("confirmacoes-xiguiane-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "confirmacoes_xiguiane" },
        (payload) => {
          setConfirmacoesXiguiane((prev) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as ConfirmacaoXiguiane, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map((c) =>
                c.id === (payload.new as ConfirmacaoXiguiane).id
                  ? (payload.new as ConfirmacaoXiguiane)
                  : c,
              );
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((c) => c.id !== (payload.old as ConfirmacaoXiguiane).id);
            }
            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(xiguianeChannel);
    };
  }, []);

  const resumo = useMemo(() => {
    const total = confirmacoes.length;
    const sim = confirmacoes.filter((c) => c.presenca === "sim").length;
    const nao = confirmacoes.filter((c) => c.presenca === "nao").length;
    const pessoas = confirmacoes
      .filter((c) => c.presenca === "sim")
      .reduce((sum, c) => sum + 1 + (c.acompanhantes || 0), 0);
    return { total, sim, nao, pessoas };
  }, [confirmacoes]);

  const exportarCSV = () => {
    const headers = ["Nome", "Presenca", "Acompanhantes", "Mensagem", "Presente", "Data/Hora"];
    const rows = confirmacoes.map((c) => [
      c.nome,
      c.presenca === "sim" ? "Vou comparecer" : "Nao poderei",
      String(c.acompanhantes || 0),
      c.mensagem || "",
      c.presente || "",
      c.created_at ? new Date(c.created_at).toLocaleString("pt-MZ") : "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "confirmacoes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm tracking-widest text-muted-foreground">A CARREGAR...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="font-script text-4xl text-gold">Painel de Confirmações</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportarCSV}
              className="rounded-full border border-gold/40 bg-card px-5 py-2 text-xs tracking-[0.15em] text-foreground transition-colors hover:bg-gold hover:text-background"
            >
              EXPORTAR CSV
            </button>
            <Link
              to="/"
              className="rounded-full bg-gold px-5 py-2 text-xs tracking-[0.15em] text-background transition-colors hover:bg-gold/90"
            >
              VOLTAR AO SITE
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <SummaryCard label="Total de respostas" value={resumo.total} />
          <SummaryCard label="Vão comparecer" value={resumo.sim} />
          <SummaryCard label="Não podem" value={resumo.nao} />
          <SummaryCard label="Total de pessoas" value={resumo.pessoas} />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-gold/20 bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gold text-background">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Nome</th>
                  <th className="px-4 py-3 text-left font-medium">Presença</th>
                  <th className="px-4 py-3 text-left font-medium">Acomp.</th>
                  <th className="px-4 py-3 text-left font-medium">Mensagem</th>
                  <th className="px-4 py-3 text-left font-medium">Presente</th>
                  <th className="px-4 py-3 text-left font-medium">Data/Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {confirmacoes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      Ainda não há confirmações.
                    </td>
                  </tr>
                )}
                {confirmacoes.map((c) => (
                  <tr key={c.id} className="hover:bg-gold/5">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">{c.nome}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] tracking-wider ${
                          c.presenca === "sim"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {c.presenca === "sim" ? "SIM" : "NÃO"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-foreground">{c.acompanhantes}</td>
                    <td className="max-w-xs px-4 py-3 text-foreground">
                      <p className="truncate">{c.mensagem || "—"}</p>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-foreground">
                      <p className="truncate">{c.presente || "—"}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {c.created_at ? new Date(c.created_at).toLocaleString("pt-MZ") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4">
            <h2 className="font-script text-3xl text-gold">Confirmações — Xiguiane (Domingo)</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Respostas dos convites do domingo, 29 de Novembro de 2026 — Salão do Xiguiane.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gold/20 bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gold text-background">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Nome</th>
                    <th className="px-4 py-3 text-left font-medium">Presença</th>
                    <th className="px-4 py-3 text-left font-medium">Acomp.</th>
                    <th className="px-4 py-3 text-left font-medium">Mensagem</th>
                    <th className="px-4 py-3 text-left font-medium">Presente</th>
                    <th className="px-4 py-3 text-left font-medium">Data/Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {confirmacoesXiguiane.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        Ainda não há confirmações do Xiguiane.
                      </td>
                    </tr>
                  )}
                  {confirmacoesXiguiane.map((c) => (
                    <tr key={c.id} className="hover:bg-gold/5">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">{c.nome}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] tracking-wider ${
                            c.presenca === "sim"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {c.presenca === "sim" ? "SIM" : "NÃO"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-foreground">{c.acompanhantes}</td>
                      <td className="max-w-xs px-4 py-3 text-foreground">
                        <p className="truncate">{c.mensagem || "—"}</p>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-foreground">
                        <p className="truncate">{c.presente || "—"}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {c.created_at ? new Date(c.created_at).toLocaleString("pt-MZ") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gold/20 bg-card p-5 text-center shadow-sm">
      <p className="text-3xl font-bold text-gold">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
    </div>
  );
}
