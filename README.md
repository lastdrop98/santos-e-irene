# Elegant Wedding Invite

Prompt para o Lovable — Convite de Casamento Digital (estilo Limintso)

Cola este prompt completo de uma só vez no Lovable. Está escrito para gerar tudo em uma única passagem e poupar créditos — evita pedir alterações uma a uma.

PROMPT (copiar tudo a partir daqui)

Cria um site de convite de casamento digital, mobile-first, de página única com scroll vertical, em React + Tailwind CSS. O estilo é elegante, clássico e luxuoso, em tons de dourado/champagne e branco. Segue exatamente esta estrutura, paleta e comportamento:

Paleta e tipografia

Cores: fundo branco/creme (#FFFDF8), dourado principal (#C6A15B / #B8935A), dourado mais escuro para texto de destaque (#9C7A3E), texto secundário em cinza-quente (#6B6B6B), uma secção em fundo dourado sólido (#C6A15B) com texto branco/creme.

Título de nomes e secções: fonte script/caligráfica elegante (ex: "Great Vibes", "Alex Brush" ou "Playfair Display Italic" via Google Fonts), sempre em dourado.

Títulos normais (Agenda, R.S.V.P.): fonte serifada elegante (ex: "Playfair Display" ou "Cormorant Garamond").

Texto corrido: fonte sans-serif fina e legível (ex: "Jost" ou "Montserrat Light").

Estrutura da página (secções na ordem, com scroll-snap suave)

Capa (hero) — foto do casal em full-bleed com overlay escuro gradiente (mais escuro no topo), brasão/monograma com as iniciais do casal no centro-topo, texto "A UNIÃO MATRIMONIAL DE", nome do casal em fonte script grande (ex: "Nome & Nome"), data por baixo em formato "DD · MM · AAAA", e um botão pill dourado "VER CONVITE" que faz scroll suave até à secção seguinte. Animação de fade-in nos elementos ao carregar.

Versículo bíblico — fundo branco, texto centrado, itálico, com a referência por baixo (placeholder, editável).

Os Noivos — título em script dourado "Os Noivos", foto do casal dentro de uma moldura em arco (topo arredondado tipo portal), com animação de entrada (fade + slide up) ao entrar no ecrã (usar IntersectionObserver ou Framer Motion whileInView).

Pais dos noivos — nome da noiva em script dourado, "Filha de [Nome] e [Nome]", ícone de coração dourado a separar, nome do noivo em script dourado, "Filho de [Nome] e [Nome]".

Agenda — cartão branco arredondado com sombra suave, flutuando sobre fundo dourado. Ícone de calendário no topo, título "Agenda" em serifada, data do casamento, e lista de eventos separados por linhas finas com ícone de diamante entre secções: "CERIMÓNIA CIVIL — HH:MM", "CERIMÓNIA RELIGIOSA — HH:MM".

Localização — dentro do mesmo cartão ou seguinte: ícone de seta/pin dourado com linha divisória, nome do local em negrito serifado, morada, botão pill cinza "📍 MAPA" (link externo para Google Maps). Como a cerimónia e a receção são no mesmo local, usa apenas UM bloco de localização (não dupliques para "Copo d'Água").

Amigos e Família — secção em fundo dourado sólido, texto branco, título "Amigos e Família" em script, parágrafo: "Se recebeu este convite significa que é nosso convidado de honra e a sua presença é importante para nós. Por favor confirme a sua presença para melhor nos organizarmos."

Contador regressivo — foto do casal em moldura de arco, por baixo 4 caixas brancas arredondadas lado a lado com sombra: Dias / Horas / Minutos / Segundos, a atualizar em tempo real via JavaScript (data alvo configurável no topo do código).

R.S.V.P. — título "R.S.V.P." em script dourado, formulário simples: campo "Nome e Apelido", campo de confirmação (ex: select "Vou comparecer" / "Não poderei comparecer"), campo número de acompanhantes, botão cinza-escuro "Submeter" (largura total, cantos arredondados). Estrutura o formulário para ser fácil de ligar depois a um serviço tipo Formspree/EmailJS — não precisas de backend funcional agora.

Presente de Casamento — cartão branco, ícone de presente dourado, título "Presente de Casamento" em script, texto curto com dados bancários/lista de presentes (placeholder).

Mais Um Passo Na Nossa Jornada — secção branca centrada, título em script dourado, versículo bíblico por baixo (ex: Mateus 19:6, placeholder editável).

Galeria de fotos — grelha de 2 colunas com fotos do casal em vários tamanhos (masonry-like), cantos ligeiramente arredondados, espaçamento pequeno entre fotos.

Fecho — foto full-bleed do casal com overlay escuro, mensagem centrada em dourado: "Estamos ansiosos para recebê-lo no dia do nosso casamento.", por baixo texto pequeno cinza "Music Background: [Artista – Faixa]" (placeholder), e no rodapé "UM PRODUTO DA [NOME DO NEGÓCIO]" com logótipo placeholder.

Navegação fixa (barra inferior)

Barra fixa no fundo do ecrã, pill arredondada nas pontas superiores, fundo branco com borda dourada fina, sempre visível durante o scroll, com 5 ícones (usar lucide-react): início/capa, pessoas (noivos/família), imagem (galeria), presente (RSVP/presente), calendário (agenda). Cada ícone faz scroll suave até à secção correspondente e fica destacado em dourado quando essa secção está ativa no ecrã.

Animações

Fade-in + slide-up subtil em cada secção ao entrar no viewport (usar Framer Motion, threshold baixo, duração ~0.6s).

Botão "VER CONVITE" com leve efeito de pulso ou hover.

Transições suaves de scroll entre secções (scroll-behavior: smooth).

Nada de exagero — animações discretas e elegantes, sem ser "flashy".

Dados editáveis (deixar como constantes no topo do ficheiro principal)

Cria um objeto de configuração no topo do código com: nomes dos noivos, data do casamento, nomes dos pais, horários e locais da cerimónia/copo d'água, links de mapa, texto do versículo, dados de presente, link de música — para eu poder editar tudo num único sítio sem mexer no resto do código.

Usa já estes dados reais como valores desse objeto de configuração (em vez de placeholders genéricos):

Noivo: Santos Viniato Bonde

Noiva: Irene Fernanda Pequenino

Data do casamento: 28 de Novembro de 2026 (usar esta data no contador regressivo)

Hashtag do casamento: #SantosEIrene2026 (mostrar discretamente perto da capa ou do fecho, estilo "partilhe os seus momentos com #SantosEIrene2026")

Contacto noivo: +258 82 787 8636

Contacto noiva: +258 84 656 8622

Local único (cerimónia e receção no mesmo lugar — remove a secção separada de "Copo d'Água" e usa apenas UM bloco de localização): Gabriela Eventos, Intak, Talhão 340, Parcela 161 — Maputo

Link do botão MAPA: https://maps.google.com/?q=Intak+Talhao+340+Parcela+161+Maputo

Horários da cerimónia e receção: "A confirmar" (placeholder de texto, substituis a mostrar "A confirmar" em vez de uma hora)

Versículo (secção "Os Noivos" ou "Mais Um Passo Na Nossa Jornada"): "Acima de tudo, porém, revesti-vos do amor, que é o vínculo da perfeição." — Colossenses 3:14

Prazo de confirmação de presença (RSVP): mostrar por baixo do formulário R.S.V.P. o texto "Por favor confirme a sua presença até 28 de Outubro de 2026."

Requisitos técnicos

Mobile-first, mas responsivo até desktop (centra o conteúdo tipo "cartão de telemóvel" em ecrãs largos, com fundo neutro à volta).

Usa imagens placeholder (via URL de placeholder ou upload) nos espaços de foto — vou substituir pelas fotos reais depois.

Código limpo, organizado em componentes por secção, para eu conseguir pedir ajustes pontuais sem regenerar tudo.

Não uses nenhuma marca "Limintso" — usa apenas placeholders genéricos (ex: "[NOME DO NEGÓCIO]") que eu substituo depois.

Gera o site completo numa só vez, com todas as secções acima, prontas a receber os meus textos e fotos finais.

Depois de gerar (para poupar créditos)

Junta todas as alterações que quiseres num único pedido de cada vez (ex: "substitui as fotos X, Y, Z e muda o nome para Isis & Valdez e a data para DD/MM/AAAA") em vez de pedir uma coisa de cada vez — cada pedido no Lovable consome créditos mesmo que seja pequeno. quero que seja exatamente como no video

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://santos-e-irene.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/be77b429-d6b3-4c5c-8c6a-f71eb6681e8e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
