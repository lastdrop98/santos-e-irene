import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms / 3600000) % 24),
    minutos: Math.floor((ms / 60000) % 60),
    segundos: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ target }: { target: Date }) {
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { v: t.dias, l: "Dias" },
    { v: t.horas, l: "Horas" },
    { v: t.minutos, l: "Minutos" },
    { v: t.segundos, l: "Segundos" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 px-5">
      {items.map((i) => (
        <div
          key={i.l}
          className="rounded-2xl bg-card px-1 py-3 text-center shadow-[var(--shadow-soft)]"
        >
          <div className="font-serif text-2xl text-gold-dark tabular-nums">
            {String(i.v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] tracking-[0.15em] text-muted-foreground">
            {i.l}
          </div>
        </div>
      ))}
    </div>
  );
}
