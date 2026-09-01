ALTER TABLE public.confirmacoes REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.confirmacoes;