CREATE TABLE IF NOT EXISTS public.confirmacoes_xiguiane (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  presenca text NOT NULL DEFAULT 'sim',
  acompanhantes integer NOT NULL DEFAULT 0,
  mensagem text NOT NULL DEFAULT '',
  presente text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.confirmacoes_xiguiane REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.confirmacoes_xiguiane;

ALTER TABLE public.confirmacoes_xiguiane ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção pública nas confirmações Xiguiane"
  ON public.confirmacoes_xiguiane
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura pública das confirmações Xiguiane"
  ON public.confirmacoes_xiguiane
  FOR SELECT
  USING (true);
