import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar — Área dos Noivos" },
      { name: "description", content: "Acesso reservado aos noivos para gerir as confirmações de presença." },
      { property: "og:title", content: "Entrar — Área dos Noivos" },
      { property: "og:description", content: "Acesso reservado aos noivos para gerir as confirmações de presença." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"login" | "registo">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setMsg(null);
    setLoading(true);
    if (modo === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErro(error.message);
      else navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) setErro(error.message);
      else if (data.session) navigate({ to: "/admin" });
      else setMsg("Conta criada. Verifique o seu email para confirmar.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-background p-8 shadow-lg">
        <h1 className="font-script text-3xl text-gold">Área dos Noivos</h1>
        <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground">
          {modo === "login" ? "INICIAR SESSÃO" : "CRIAR CONTA"}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Palavra-passe"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {erro && <p className="text-xs text-destructive">{erro}</p>}
          {msg && <p className="text-xs text-muted-foreground">{msg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-6 py-3 text-[11px] tracking-[0.25em] text-background disabled:opacity-60"
          >
            {loading ? "AGUARDE..." : modo === "login" ? "ENTRAR" : "REGISTAR"}
          </button>
        </form>
        <button
          onClick={() => {
            setModo(modo === "login" ? "registo" : "login");
            setErro(null);
            setMsg(null);
          }}
          className="mt-4 w-full text-xs text-muted-foreground underline"
        >
          {modo === "login" ? "Não tem conta? Registar" : "Já tem conta? Entrar"}
        </button>
      </div>
    </div>
  );
}
