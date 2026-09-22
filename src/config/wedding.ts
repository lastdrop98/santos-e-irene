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
    nome: "Santos Viriato Bonde",
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
    { titulo: "Cerimónia Civil", hora: "14h" },
    { titulo: "Cerimónia Religiosa", hora: "A confirmar" },
    { titulo: "Copo d'Água", hora: "15h" },
  ],

  igreja: {
    nome: "Igreja São Pedro São Paulo",
    morada: "Bairro 25 de Junho — Maputo",
    mapa: "https://maps.app.goo.gl/e4aJvbcpS9VZjETM7",
  },

  local: {
    nome: "Gabriela Eventos",
    morada: "Intaka, Talhão 340, Parcela 161 — Maputo",
    mapa: "https://maps.app.goo.gl/Pvr9ExuBzVLBN2ve9",
  },
  xiguiane: { 
    dataExtenso: "Domingo, 29 de Novembro de 2026", 
    hora: "15h", 
    local: { 
      nome: "Paróquia Nossa Senhora do Rosário", 
      morada: "Hulene B, Maputo (Salão do Xiguiane)", 
      mapa: "https://maps.app.goo.gl/ZsdaNjYiUqCqaeZ17", },
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
      "Lista de presentes disponível na Casa das Loiças. Nome da lista: Casamento do Santos e da Irene.",
    contas: [
      { banco: "BIM", nib: "0001 0000 0017 8994 3925 7", titular: "Santos" },
      { banco: "BCI", nib: "0008 0000 6029 2145 1012 8", titular: "Irene" },
      { banco: "e-Mola", numero: "877 878 636", titular: "Viriato Santos" },
    ],
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