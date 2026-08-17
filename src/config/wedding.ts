/**
 * TODOS OS DADOS EDITÁVEIS DO CONVITE ESTÃO AQUI.
 * Altere apenas este ficheiro para mudar nomes, datas, textos, fotos e links.
 */

import heroCouple from "@/assets/hero-couple.jpg";
import coupleArch from "@/assets/couple-arch.jpg";
import countdownCouple from "@/assets/countdown-couple.jpg";
import closingCouple from "@/assets/closing-couple.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const wedding = {
  noivo: {
    nome: "Santos Viniato Bonde",
    primeiroNome: "Santos",
    pai: "[Nome do Pai]",
    mae: "[Nome da Mãe]",
    contacto: "+258 82 787 8636",
  },
  noiva: {
    nome: "Irene Fernanda Pequenino",
    primeiroNome: "Irene",
    pai: "[Nome do Pai]",
    mae: "[Nome da Mãe]",
    contacto: "+258 84 656 8622",
  },
  monograma: "S&I",
  hashtag: "#SantosEIrene2026",

  // Data alvo do contador regressivo (ano, mês-1, dia, hora, minuto)
  dataAlvo: new Date(2026, 10, 28, 10, 0, 0),
  dataCurta: "28 · 11 · 2026",
  dataExtenso: "Sábado, 28 de Novembro de 2026",

  agenda: [
    { titulo: "Cerimónia Civil", hora: "A confirmar" },
    { titulo: "Cerimónia Religiosa", hora: "A confirmar" },
    { titulo: "Copo d'Água", hora: "A confirmar" },
  ],

  local: {
    nome: "Gabriela Eventos",
    morada: "Intak, Talhão 340, Parcela 161 — Maputo",
    mapa: "https://maps.google.com/?q=Intak+Talhao+340+Parcela+161+Maputo",
  },

  versiculoCapa: {
    texto:
      "Acima de tudo, porém, revesti-vos do amor, que é o vínculo da perfeição.",
    referencia: "Colossenses 3:14",
  },
  versiculoFinal: {
    texto:
      "Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém o separe.",
    referencia: "Mateus 19:6",
  },

  presente: {
    texto:
      "A vossa presença é o nosso maior presente. Caso queira nos agraciar com uma lembrança, deixamos abaixo os nossos dados:",
    banco: "[Nome do Banco]",
    conta: "[Número da conta]",
    nib: "[NIB]",
    titular: "[Nome do titular]",
  },

  rsvp: {
    prazo: "Por favor confirme a sua presença até 28 de Outubro de 2026.",
    // Substitua por um endpoint Formspree/EmailJS quando quiser receber respostas.
    endpoint: "",
  },

  musica: "Music Background: [Artista – Faixa]",
  negocio: "[NOME DO NEGÓCIO]",

  fotos: {
    capa: heroCouple,
    noivos: coupleArch,
    contador: countdownCouple,
    fecho: closingCouple,
    galeria: [gallery1, gallery2, gallery3, gallery4],
  },
};
