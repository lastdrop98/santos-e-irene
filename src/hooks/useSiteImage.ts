import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

let cache: Promise<Record<string, string>> | null = null;

export function loadSiteImages(): Promise<Record<string, string>> {
  if (!cache) {
    cache = supabase
      .from("site_images")
      .select("key,url")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data || []).forEach((row) => {
          map[row.key] = row.url;
        });
        return map;
      });
  }
  return cache;
}

export function clearSiteImagesCache() {
  cache = null;
}

/** Devolve o URL guardado em site_images para a key, ou o fallback original. */
export function useSiteImage(key: string, fallback: string) {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    let mounted = true;
    loadSiteImages()
      .then((map) => {
        if (mounted && map[key]) setUrl(map[key]);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [key, fallback]);

  return url;
}

/** Versão para listas (galeria): devolve array com overrides aplicados. */
export function useSiteImages(entries: { key: string; fallback: string }[]) {
  const [urls, setUrls] = useState(() => entries.map((e) => e.fallback));

  const signature = entries.map((e) => `${e.key}|${e.fallback}`).join(",");

  useEffect(() => {
    let mounted = true;
    loadSiteImages()
      .then((map) => {
        if (!mounted) return;
        setUrls(entries.map((e) => map[e.key] || e.fallback));
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return urls;
}
