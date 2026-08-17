import { Reveal } from "@/components/invite/Reveal";

export function AmigosFamilia() {
  return (
    <section className="bg-gold px-10 pb-20 pt-4 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-background">Amigos e Família</h2>
        <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-background/90">
          Se recebeu este convite significa que é nosso convidado de honra e a sua
          presença é importante para nós. Por favor confirme a sua presença para
          melhor nos organizarmos.
        </p>
      </Reveal>
    </section>
  );
}
