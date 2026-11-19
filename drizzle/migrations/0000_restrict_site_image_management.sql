DROP POLICY IF EXISTS "Qualquer pessoa gere site_images" ON public.site_images;
CREATE POLICY "Administradores gerem site_images"
  ON public.site_images
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Leitura pública de site_images" ON public.site_images;
CREATE POLICY "Leitura pública de site_images"
  ON public.site_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Qualquer pessoa atualiza imagens do site" ON storage.objects;
CREATE POLICY "Administradores atualizam imagens do site"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Qualquer pessoa carrega imagens do site" ON storage.objects;
CREATE POLICY "Administradores carregam imagens do site"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Administradores apagam imagens do site"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));