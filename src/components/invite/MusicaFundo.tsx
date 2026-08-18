import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import tema from "@/assets/tema.mp3.asset.json";

export function MusicaFundo() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [a, setA] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = 0.4;
    el.play()
      .then(() => setA(true))
      .catch(() => setA(false));

    const start = () => {
      el.play().then(() => setA(true)).catch(() => {});
    };
    window.addEventListener("pointerdown", start, { once: true });
    return () => window.removeEventListener("pointerdown", start);
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setA(true)).catch(() => {});
    } else {
      el.pause();
      setA(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={tema.url} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={a ? "Pausar música" : "Tocar música"}
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-gold-dark shadow-[var(--shadow-soft)] backdrop-blur transition-colors hover:bg-card"
      >
        {a ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      </button>
    </>
  );
}
