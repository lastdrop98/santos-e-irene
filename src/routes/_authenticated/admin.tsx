import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { wedding } from "@/config/wedding";
import { clearSiteImagesCache } from "@/hooks/useSiteImage";

type Confirmacao = Database["public"]["Tables"]["confirmacoes"]["Row"];

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel de Administração — Área dos Noivos" },
      { name: "description", content: "Confirmações de presença e gestão de imagens do casamento de Santos e Irene." },
      { property: "og:title", content: "Painel de Administração — Área dos Noivos" },
      { property: "og:description", content: "Confirmações de presença e gestão de imagens do casamento de Santos e Irene." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const IMAGE_KEYS: { key: string; label: string; fallback: string }[] = [
  { key: "capa", label: "Foto de capa", fallback: wedding.fotos.capa },
  { key: "noivos", label: "Os Noivos", fallback: wedding.fotos.noivos },
  { key: "contador", label: "Contador", fallback: wedding.fotos.contador },
  ...wedding.fotos.galeria.slice(0, 6).map((foto, i) => ({
    key: `galeria_${i + 1}`,
    label: `Galeria ${i + 1}`,
    fallback: foto,
  })),
];

function tocarSom() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
    osc.onended = () => ctx.close();
  } catch {
    /* som é opcional */
  }
}

function AdminPage() {
  const [confirmacoes, setConfirmacoes] = useState<Confirmacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (!mounted) return;

      const user = userData.user;
      if (userError || !user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!mounted) return;

      if (!roles || roles.length === 0) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data, error } = await supabase
        .from("confirmacoes")
        .select("*")
        .order("created_at", { ascending: false });

      if (!mounted) return;
      if (error) console.error(error);
      else setConfirmacoes(data || []);
      setLoading(false);
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel("confirmacoes-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "confirmacoes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const nova = payload.new as Confirmacao;
            tocarSom();
            toast.success("Nova confirmação!", { description: nova.nome });
            setConfirmacoes((prev) => [nova, ...prev]);
            return;
          }
          setConfirmacoes((prev) => {
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  const resumo = useMemo(() => {
    const total = confirmacoes.length;
    const sim = confirmacoes.filter((c) => c.presenca === "sim").length;
    const nao = confirmacoes.filter((c) => c.presenca !== "sim").length;
    const pessoas = confirmacoes
      .filter((c) => c.presenca === "sim")
      .reduce((sum, c) => sum + 1 + (c.acompanhantes || 0), 0);
    return { total, sim, nao, pessoas };
  }, [confirmacoes]);

  const exportarExcel = async () => {
    const XLSX = (await import("xlsx-js-style")).default as typeof import("xlsx-js-style");

    const headers = ["Nome", "Confirmou", "Acompanhantes", "Mensagem", "Presente", "Data/Hora"];
    const titleStyle = {
      font: { bold: true, sz: 16, color: { rgb: "D4AF37" }, name: "Arial" },
      fill: { fgColor: { rgb: "1A1A1A" } },
      alignment: { horizontal: "center", vertical: "center" },
    };
    const headerStyle = {
      font: { bold: true, sz: 11, color: { rgb: "1A1A1A" }, name: "Arial" },
      fill: { fgColor: { rgb: "D4AF37" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "B8952F" } },
        bottom: { style: "thin", color: { rgb: "B8952F" } },
        left: { style: "thin", color: { rgb: "B8952F" } },
        right: { style: "thin", color: { rgb: "B8952F" } },
      },
    };

    const rows = confirmacoes.map((c) => [
      c.nome,
      c.presenca === "sim" ? "Sim" : "Não",
      c.acompanhantes || 0,
      c.mensagem || "",
      c.presente || "",
      c.created_at ? new Date(c.created_at).toLocaleString("pt-MZ") : "",
    ]);

    const aoa: (string | number)[][] = [
      ["Confirmações — Santos & Irene", "", "", "", "", ""],
      headers,
      ...rows,
      ["TOTAL", `${resumo.sim} sim / ${resumo.nao} não`, resumo.pessoas, "", "", ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];
    ws["!cols"] = [{ wch: 26 }, { wch: 12 }, { wch: 14 }, { wch: 40 }, { wch: 24 }, { wch: 20 }];
    ws["!rows"] = [{ hpt: 28 }, { hpt: 20 }];

    const totalRow = rows.length + 2;
    for (let r = 0; r <= totalRow; r++) {
      for (let c = 0; c < headers.length; c++) {
        const ref = XLSX.utils.encode_cell({ r, c });
        if (!ws[ref]) ws[ref] = { t: "s", v: "" };
        const cell = ws[ref] as { s?: unknown };
        if (r === 0) {
          cell.s = titleStyle;
        } else if (r === 1) {
          cell.s = headerStyle;
        } else if (r === totalRow) {
          cell.s = {
            font: { bold: true, sz: 11, color: { rgb: "1A1A1A" }, name: "Arial" },
            fill: { fgColor: { rgb: "F0E2B6" } },
          };
        } else {
          const zebra = r % 2 === 0;
          const presenca = rows[r - 2]?.[1];
          const isSim = presenca === "Sim";
          cell.s = {
            font: {
              sz: 10,
              name: "Arial",
              bold: c === 1,
              color: { rgb: c === 1 ? (isSim ? "127A2E" : "B32020") : "222222" },
            },
            fill: { fgColor: { rgb: zebra ? "FFFFFF" : "FAF5E6" } },
            alignment: { vertical: "center", wrapText: c === 3 },
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Confirmações");
    const data = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `confirmacoes-santos-irene-${data}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm tracking-widest text-muted-foreground">A CARREGAR...</p>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-script text-3xl text-gold">Sem permissões</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Não tem permissões para aceder a esta área.
        </p>
        {userId && (
          <p className="mt-4 break-all rounded-md border border-gold/30 bg-card px-4 py-2 text-xs text-foreground">
            O seu ID de utilizador: <span className="font-mono">{userId}</span>
          </p>
        )}
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-6 py-2 text-xs tracking-[0.2em] text-background"
        >
          VOLTAR AO CONVITE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="font-script text-4xl text-gold">Painel dos Noivos</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportarExcel}
              className="rounded-full border border-gold/40 bg-card px-5 py-2 text-xs tracking-[0.15em] text-foreground transition-colors hover:bg-gold hover:text-background"
            >
              EXPORTAR EXCEL
            </button>
            <Link
              to="/"
              className="rounded-full bg-gold px-5 py-2 text-xs tracking-[0.15em] text-background transition-colors hover:bg-gold/90"
            >
              VOLTAR AO SITE
            </Link>
          </div>
        </div>

        <h2 className="mt-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Confirmações de presença
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
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

        <GestaoImagens />
      </div>
    </div>
  );
}

function GestaoImagens() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    let mounted = true;
    supabase
      .from("site_images")
      .select("key,url")
      .then(({ data }) => {
        if (!mounted) return;
        const map: Record<string, string> = {};
        (data || []).forEach((row) => {
          map[row.key] = row.url;
        });
        setUrls(map);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const substituir = async (key: string, file: File) => {
    setBusy(key);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${key}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: true, contentType: file.type || "image/jpeg" });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("site-images").getPublicUrl(path);
      const url = pub.publicUrl;

      const { error: dbErr } = await supabase
        .from("site_images")
        .upsert({ key, url, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (dbErr) throw dbErr;

      setUrls((prev) => ({ ...prev, [key]: url }));
      clearSiteImagesCache();
      toast.success("Imagem atualizada!");
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível atualizar a imagem.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <h2 className="mt-14 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Gestão de imagens
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {IMAGE_KEYS.map(({ key, label, fallback }) => (
          <div key={key} className="overflow-hidden rounded-xl border border-gold/20 bg-card">
            <img
              src={urls[key] || fallback}
              alt={label}
              loading="lazy"
              className="h-44 w-full object-cover"
            />
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="text-xs tracking-wide text-foreground">{label}</p>
              <input
                ref={(el) => {
                  inputs.current[key] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) substituir(key, file);
                  e.target.value = "";
                }}
              />
              <button
                disabled={busy === key}
                onClick={() => inputs.current[key]?.click()}
                className="rounded-full bg-gold px-4 py-1.5 text-[11px] tracking-[0.15em] text-background transition-colors hover:bg-gold/90 disabled:opacity-60"
              >
                {busy === key ? "A ENVIAR…" : "SUBSTITUIR"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
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
