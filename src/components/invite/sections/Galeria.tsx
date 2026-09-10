import { Reveal } from "@/components/invite/Reveal";
import { wedding } from "@/config/wedding";
import { useSiteImages } from "@/hooks/useSiteImage";

const heights = ["h-52", "h-64", "h-64", "h-52"];

export function Galeria() {
  const fotos = useSiteImages(
    wedding.fotos.galeria.map((foto, i) => ({ key: `galeria_${i + 1}`, fallback: foto })),
  );

  return (
    <section id="galeria" className="bg-background px-3 pb-10">
      <Reveal>
        <div className="grid grid-cols-2 gap-2">
          {fotos.map((foto, i) => (
            <img
              key={`${i}-${foto}`}
              src={foto}
              alt={`Momento ${i + 1} do casal`}
              loading="lazy"
              className={`w-full rounded-md object-cover ${heights[i % heights.length]}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
