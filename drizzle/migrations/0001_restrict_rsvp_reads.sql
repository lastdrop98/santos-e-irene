DROP POLICY IF EXISTS "Leitura pública de confirmacoes" ON public.confirmacoes;
CREATE POLICY "Admins leem confirmacoes" ON public.confirmacoes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Permitir leitura pública das confirmações Xiguiane" ON public.confirmacoes_xiguiane;
DROP POLICY IF EXISTS "Permitir inserção pública nas confirmações Xiguiane" ON public.confirmacoes_xiguiane;
CREATE POLICY "Admins leem confirmacoes Xiguiane" ON public.confirmacoes_xiguiane FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Convidados confirmam Xiguiane" ON public.confirmacoes_xiguiane FOR INSERT TO anon, authenticated WITH CHECK (char_length(nome) BETWEEN 2 AND 100 AND acompanhantes BETWEEN 0 AND 20 AND char_length(mensagem) <= 1000 AND presenca IN ('sim','nao') AND char_length(presente) <= 200);

DROP POLICY IF EXISTS "Presentes visiveis para todos" ON public.presentes;
CREATE POLICY "Admins veem presentes" ON public.presentes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));