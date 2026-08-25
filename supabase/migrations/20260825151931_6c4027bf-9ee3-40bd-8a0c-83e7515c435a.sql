CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.presentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text NOT NULL DEFAULT '',
  valor text NOT NULL DEFAULT '',
  reservado_por text,
  reservado_em timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.presentes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.presentes TO authenticated;
GRANT ALL ON public.presentes TO service_role;
ALTER TABLE public.presentes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Presentes visiveis para todos" ON public.presentes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Qualquer pessoa pode reservar presente livre" ON public.presentes FOR UPDATE TO anon, authenticated USING (reservado_por IS NULL) WITH CHECK (reservado_por IS NOT NULL);
CREATE POLICY "Admins gerem presentes" ON public.presentes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.confirmacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  presenca text NOT NULL DEFAULT 'sim',
  acompanhantes integer NOT NULL DEFAULT 0,
  mensagem text NOT NULL DEFAULT '',
  presente text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.confirmacoes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.confirmacoes TO authenticated;
GRANT ALL ON public.confirmacoes TO service_role;
ALTER TABLE public.confirmacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode confirmar" ON public.confirmacoes FOR INSERT TO anon, authenticated WITH CHECK (char_length(nome) BETWEEN 2 AND 100 AND acompanhantes BETWEEN 0 AND 20 AND char_length(mensagem) <= 1000);
CREATE POLICY "Admins veem confirmacoes" ON public.confirmacoes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins apagam confirmacoes" ON public.confirmacoes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.presentes (nome, descricao, valor) VALUES
  ('Jogo de panelas', 'Conjunto completo de panelas em inox para a nova casa.', '8.000 MT'),
  ('Máquina de lavar roupa', 'Contribuição para a máquina de lavar do casal.', '25.000 MT'),
  ('Micro-ondas', 'Um micro-ondas para o dia-a-dia.', '9.500 MT'),
  ('Jogo de lençóis', 'Roupa de cama em algodão para o quarto principal.', '4.500 MT'),
  ('Serviço de jantar', 'Louça completa para 12 pessoas.', '6.000 MT'),
  ('Ferro e tábua de engomar', 'Prático e sempre necessário.', '3.500 MT'),
  ('Contribuição para a lua-de-mel', 'Ajuda para a viagem dos noivos.', 'Valor livre'),
  ('Aspirador', 'Para manter o novo lar impecável.', '7.000 MT');