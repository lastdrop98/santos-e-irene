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
      nome: "Paróquia Nossa Senhora do Rosário", 
      morada: "Hulene B, Maputo (Salão do Xiguiane)", 
      mapa: "https://maps.google.com/?q=Paroquia+Nossa+Senhora+do+Rosario+Hulene+B+Maputo", },
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
      "A vossa presença é o nosso maior presente. Caso queira nos agraciar com uma lembrança, deixamos abaixo os nossos dados ou uma sugestão de presentes:",
    contas: [
      { banco: "BIM", nib: "0001 0000 0017 8994 3925 7", titular: "Santos" },
      { banco: "BCI", nib: "0008 0000 6029 2145 1012 8", titular: "Irene" },
    ],
    notaLista: "Nota: estes artigos são da Casa das Loiças",
    lista: [
      { nome: "Jogo de Talheres", foto: "https://images.unsplash.com/photo-1676976527022-fdd058e44410?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Jogo de Panelas", foto: "https://images.unsplash.com/photo-1556911164-1297abe8527c?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Liquidificador", foto: "https://images.unsplash.com/photo-1654064754916-e3edeb09c042?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Tostadeira 2000W", foto: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Micro-ondas 34L", foto: "https://images.unsplash.com/photo-1589241534732-26031c00f37c?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Fogão a Gás (4 bocas a gás + 1 elétrica)", foto: "https://images.unsplash.com/photo-1629157319203-df69cdcfdbb9?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Geleira 2 Portas", foto: "https://images.unsplash.com/photo-1536353284924-9220c464e262?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Congelador 198L", foto: "https://images.unsplash.com/photo-1630459065645-549fe5a56db4?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "G Box 300W", foto: "https://images.unsplash.com/photo-1511499271651-073325718d90?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Grade de Copos", foto: "https://images.unsplash.com/photo-1522057306606-8d84daa75e87?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Ferro de Engomar a Vapor", foto: "https://images.unsplash.com/photo-1540544093-b0880061e1a5?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Máquina de Lavar Roupa", foto: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Jogo de Jantar", foto: "https://images.unsplash.com/photo-1594057096503-fb2d12c6c3d2?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Jogo de Pirex", foto: "https://images.unsplash.com/photo-1622428051717-dcd8412959de?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Pirex Oval Grande com Tampa Plástica", foto: "https://images.unsplash.com/photo-1622428051717-dcd8412959de?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { nome: "Taças (Água, Vinho, Champanhe)", foto: "https://images.unsplash.com/photo-1729420906097-64e4759b5265?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
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
