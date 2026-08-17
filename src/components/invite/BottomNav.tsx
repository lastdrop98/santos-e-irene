import { Calendar, Gift, Home, Image, Users } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: "capa", label: "Início", Icon: Home },
  { id: "noivos", label: "Noivos", Icon: Users },
  { id: "galeria", label: "Galeria", Icon: Image },
  { id: "rsvp", label: "RSVP", Icon: Gift },
  { id: "agenda", label: "Agenda", Icon: Calendar },
];

export function BottomNav() {
  const [active, setActive] = useState("capa");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5] },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
      <div className="pointer-events-auto flex w-full max-w-[430px] items-center justify-around rounded-t-3xl border border-b-0 border-gold/40 bg-card px-2 py-3 shadow-[0_-6px_24px_-12px_rgba(0,0,0,0.25)]">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            aria-label={label}
            className={`flex h-10 w-12 items-center justify-center rounded-xl transition-colors ${
              active === id ? "text-gold-dark" : "text-muted-foreground"
            }`}
          >
            <Icon size={20} strokeWidth={1.6} />
          </button>
        ))}
      </div>
    </nav>
  );
}
