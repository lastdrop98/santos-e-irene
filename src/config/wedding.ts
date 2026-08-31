/**
 * TODOS OS DADOS EDITÁVEIS DO CONVITE ESTÃO AQUI.
 * Altere apenas este ficheiro para mudar nomes, datas, textos, fotos e links.
 */

import foto1 from "@/assets/foto-1.jpeg.asset.json";
import foto2 from "@/assets/foto-2.jpeg.asset.json";
import foto3 from "@/assets/foto-3.jpeg.asset.json";
import foto4 from "@/assets/foto-4.jpeg.asset.json";
import foto5 from "@/assets/foto-5.jpeg.asset.json";
import foto7 from "@/assets/foto-7.jpeg.asset.json";

export const wedding = {
  noivo: {
    nome: "Santos Viniato Bonde",
    primeiroNome: "Santos",
    pai: "Viriato Santos Bonde",
    mae: "Antoninha Falso Lamo",
    contacto: "827878636",
  },
  noiva: {
    nome: "Irene Fernanda Pequenino",
    primeiroNome: "Irene",
    pai: "Dinis Rafael Pequenino",
    mae: "Olga Laurinda Mavanga",
    contacto: "846560622",
  },
  monograma: "S&I",
  hashtag: "#SantosEIrene2026",

  // Data alvo do contador regressivo (ano, mês-1, dia, hora, minuto)
  dataAlvo: new Date(2026, 10, 28, 10, 0, 0),
  dataCurta: "28 · 11 · 2026",
  dataExtenso: "Sábado, 28 de Novembro de 2026",

  agenda: [
    { titulo: "Cerimónia Civil", hora: "15h" },
    { titulo: "Cerimónia Religiosa", hora: "A confirmar" },
    { titulo: "Copo d'Água", hora: "16h" },
  ],

  igreja: {
    nome: "Igreja São Pedro São Paulo",
    morada: "Bairro 25 de Junho — Maputo",
    mapa: "https://maps.google.com/?q=Igreja+Sao+Pedro+Sao+Paulo+Bairro+25+de+Junho+Maputo",
  },

  local: {
    nome: "Gabriela Eventos",
    morada: "Intaka, Talhão 340, Parcela 161 — Maputo",
    mapa: "https://maps.google.com/?q=Intak+Talhao+340+Parcela+161+Maputo",
  },
  xiguiane: { 
    dataExtenso: "Domingo, 29 de Novembro de 2026", 
    hora: "A confirmar", 
    local: { 
      nome: "Xiguiane — Casa da Noiva", 
      morada: "Morada a confirmar", 
      mapa: "https://maps.google.com/?q=Maputo", },
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
     lista: [ { nome: "Jogo de Panelas", 
               foto: "https://images.unsplash.com/photo-1556911164-1297abe8527c?fm=jpg&q=80&w=1200&auto=format&fit=crop" }, 
             { nome: "Máquina de Lavar Roupa", 
              foto: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?fm=jpg&q=80&w=1200&auto=format&fit=crop" }, 
             { nome: "Jogo de Lençóis e Toalhas", 
              foto: "https://images.unsplash.com/photo-1702501543049-4cb666eeda15?fm=jpg&q=80&w=1200&auto=format&fit=crop" }, 
             { nome: "Liquidificador", 
              foto: "https://images.unsplash.com/photo-1654064754916-e3edeb09c042?fm=jpg&q=80&w=1200&auto=format&fit=crop" }, 
             { nome: "Micro-ondas", 
              foto: "https://images.unsplash.com/photo-1589241534732-26031c00f37c?fm=jpg&q=80&w=1200&auto=format&fit=crop" }, ],
  },

  rsvp: {
    prazo: "Por favor confirme a sua presença até 28 de Outubro de 2026.",
    // Substitua por um endpoint Formspree/EmailJS quando quiser receber respostas.
    endpoint: "",
  },

  musica: "Music Background: [Artista – Faixa]",
  negocio: {
    autor: "Shelton Barreto",
    whatsapp: "847404160",
    email: "sheltonbarreto79@gmail.com",
  },

  fotos: {
    capa: foto1.url,
    noivos: foto2.url,
    contador: foto3.url,
    fecho: foto4.url,
    galeria: [foto1.url, foto2.url, foto3.url, foto4.url, foto7.url, foto5.url],
  },
};
