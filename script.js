// =============================================
// ATELIÊ ELEMENTAL — script.js
// Lógica de Geração de Cores, Partículas e Efeito "Tinta na Água"
// =============================================

// -----------------------------------------------
// TABELA DE CORES ALQUÍMICAS
// Verificado e Mapeado com Precisão de RGB
// Cada cor reflete perfeitamente a estética mágica
// -----------------------------------------------
const CORES_ALQUIMICAS = [
  // Fogos, Sangues e Paixões (Vermelhos/Rosados)
  { nome: 'Sangue de Dragão',          r: 180, g:  20, b:  20 },
  { nome: 'Carmesim Ritualístico',     r: 220, g:  20, b:  60 },
  { nome: 'Elixir de Romã',            r: 128, g:   0, b:  32 },
  { nome: 'Bordô Obscuro',             r: 100, g:   0, b:  30 },
  { nome: 'Essência de Ninfa',         r: 255, g: 105, b: 180 },
  { nome: 'Cinza da Névoa Alquímica',  r: 188, g: 143, b: 143 },
  { nome: 'Salmão Rúnico',             r: 250, g: 128, b: 114 },
  { nome: 'Coral dos Recifes Mágicos', r: 255, g: 127, b:  80 },
  { nome: 'Pó de Rubi',                r: 227, g:  11, b:  93 },
  { nome: 'Fogo de Fênix',             r: 255, g:  69, b:   0 }, // RedOrange
  { nome: 'Néctar de Ambrósia',        r: 255, g: 110, b: 120 }, // Rosa quente
  { nome: 'Sombra de Vênus',           r: 219, g: 112, b: 147 }, // PaleVioletRed
  { nome: 'Vinho de Baco',             r: 114, g:  47, b:  55 }, // Vinho escuro

  // Chamais, Ouros e Luzes (Laranjas/Amarelos)
  { nome: 'Chama Eterna',              r: 255, g: 140, b:   0 },
  { nome: 'Âmbar Engarrafado',         r: 255, g: 191, b:   0 },
  { nome: 'Ouro Transmutado',          r: 218, g: 165, b:  32 },
  { nome: 'Sol Líquido',               r: 255, g: 215, b:   0 },
  { nome: 'Creme de Mandrágora',       r: 255, g: 253, b: 208 },
  { nome: 'Areia do Tempo',            r: 245, g: 245, b: 220 },
  { nome: 'Pergaminho Milenar',        r: 189, g: 183, b: 107 },
  { nome: 'Enxofre Purificado',        r: 238, g: 232, b: 170 }, // PaleGoldenrod
  { nome: 'Luz de Vaga-lume',          r: 250, g: 250, b: 210 }, // LightGoldenrodYellow
  { nome: 'Âmbar Pré-histórico',       r: 255, g: 154, b:   0 }, // Laranja âmbar

  // Ácidos, Florestas e Venenos (Verdes)
  { nome: 'Seiva de Yggdrasil',        r:   0, g: 200, b:   0 },
  { nome: 'Veneno de Basilisco',       r:  50, g: 205, b:  50 },
  { nome: 'Folha de Elfo',             r:  34, g: 139, b:  34 },
  { nome: 'Musgo de Pântano Místico',  r:  85, g: 107, b:  47 },
  { nome: 'Extrato de Oliva',          r: 107, g: 142, b:  35 },
  { nome: 'Água Pantanosa',            r:   0, g: 128, b: 128 },
  { nome: 'Esmeralda Lapidada',        r:   0, g: 201, b:  87 },
  { nome: 'Hálito de Mentira',         r: 152, g: 255, b: 152 },
  { nome: 'Bioma Primitivo',           r:  41, g: 171, b:  82 },
  { nome: 'Jade Imperial',             r:   0, g: 168, b: 107 }, 
  { nome: 'Clorofila Arcana',          r:  60, g: 179, b: 113 }, // MediumSeaGreen
  { nome: 'Orvalho de Floresta',       r: 144, g: 238, b: 144 }, // LightGreen

  // Abismos, Geadas e Éteres (Azuis)
  { nome: 'Lágrima de Leviatã',        r:  30, g: 100, b: 255 },
  { nome: 'Céu de Gelo',               r: 173, g: 216, b: 230 },
  { nome: 'Azul da Realeza',           r:  65, g: 105, b: 225 },
  { nome: 'Abismo Oceânico',           r:   0, g:   0, b: 128 },
  { nome: 'Cobalto Astral',            r:   0, g:  71, b: 171 },
  { nome: 'Éter Celeste',              r: 135, g: 206, b: 235 },
  { nome: 'Profundeza Abissal',        r:   0, g: 105, b: 148 },
  { nome: 'Orvalho Congelado',         r: 137, g: 207, b: 240 },
  { nome: 'Pedra da Ardósia Mística',  r: 106, g:  90, b: 205 },
  { nome: 'Prisma Turquesa',           r:  64, g: 224, b: 208 },
  { nome: 'Cristal de Gelo Eterno',    r: 175, g: 238, b: 238 }, // PaleTurquoise
  { nome: 'Céu Noturno Profundo',      r:  25, g:  25, b: 112 }, // MidnightBlue
  { nome: 'Luz de Sirius',             r: 176, g: 196, b: 222 }, // LightSteelBlue

  // Arcanos, Sombras e Baleias (Roxos/Escuros)
  { nome: 'Manto de Ilusão',           r: 128, g:   0, b: 128 },
  { nome: 'Violeta Arcano',            r: 238, g: 130, b: 238 },
  { nome: 'Extrato de Lavanda',        r: 230, g: 230, b: 250 },
  { nome: 'Lilás Feérico',             r: 200, g: 162, b: 200 },
  { nome: 'Tinta Índigo',              r:  75, g:   0, b: 130 },
  { nome: 'Pó de Ametista',            r: 153, g: 102, b: 204 },
  { nome: 'Orquídea Noturna',          r: 218, g: 112, b: 214 },
  { nome: 'Energia Corrompida',        r: 255, g:   0, b: 255 },
  { nome: 'Sombra do Eclipse',         r:  48, g:  25, b:  52 }, // Roxo quase preto
  { nome: 'Bruma Púrpura',             r: 147, g: 112, b: 219 }, // MediumSlateBlue
  { nome: 'Nebulosa de Órion',         r:  72, g:  61, b: 139 }, // DarkSlateBlue
  { nome: 'Pó de Estrela Obscura',     r:  75, g:   0, b: 130 },

  // Terras, Ruínas e Antiguidades (Marrons/Cinzas)
  { nome: 'Terra de Gólem',            r: 139, g:  69, b:  19 },
  { nome: 'Barro Moldado',             r: 210, g: 105, b:  30 },
  { nome: 'Raiz Seca',                 r: 196, g: 127, b:  23 },
  { nome: 'Argila Vermelha',           r: 204, g:  78, b:  92 },
  { nome: 'Siena Queimada',            r: 160, g:  82, b:  45 },
  { nome: 'Cobre Oxidado',             r: 184, g: 115, b:  51 },
  { nome: 'Ferrugem Sobrenatural',     r: 183, g:  65, b:  14 },
  { nome: 'Ocre do Deserto',           r: 204, g: 119, b:  34 },
  { nome: 'Madeira de Ébano',          r:  61, g:  43, b:  31 },
  { nome: 'Cinza de Vulcão',           r:  79, g:  79, b:  79 },
  { nome: 'Antiguidade de Bronze',     r: 139, g: 115, b:  85 }, // Burlywood dark

  // Vazios e Opalas (Pretos/Brancos)
  { nome: 'Prata Derretida',           r: 211, g: 211, b: 211 },
  { nome: 'Chumbo Transmutável',       r: 128, g: 128, b: 128 },
  { nome: 'Cinza Gárgula',             r:  64, g:  64, b:  64 },
  { nome: 'Carvão de Forja',           r:  54, g:  69, b:  79 },
  { nome: 'Opalina Brilhante',         r: 255, g: 255, b: 255 },
  { nome: 'Vazio Primordial',          r:   0, g:   0, b:   0 },
  { nome: 'Marfim Ancestral',          r: 255, g: 255, b: 240 },
  { nome: 'Essência de Estrela Cadente', r: 240, g: 248, b: 255 }, // AliceBlue
  { nome: 'Orvalho de Lua Nova',       r: 245, g: 245, b: 245 }
];

// -----------------------------------------------
// REFERÊNCIAS DO DOM E CANVAS
// -----------------------------------------------
const body      = document.body;
const elNome    = document.getElementById('nome-cor');
const elHex     = document.getElementById('hex-cor');
const elTooltip = document.getElementById('tooltip');
const btnGerar  = document.getElementById('btn-gerar');

// Canvas de Tinta (Efeito Splash/Água)
const canvasInk = document.getElementById('canvas-ink');
const ctxInk = canvasInk.getContext('2d', { alpha: false }); // Fundo opaco para performance e transição limpa
// Canvas de Partículas (Magia Elemental)
const canvasPart = document.getElementById('canvas-particles');
const ctxPart = canvasPart.getContext('2d');

let timerTooltip = null;

// Variáveis para a Animação de Tinta
let inkAnimating = false;
let inkMaxRadius = 0;
let inkRadius = 0;
let inkX = 0;
let inkY = 0;
let targetInkColor = '#1a100a'; // Cor inicial (madeira dark)

// Começamos o canvas de tinta preenchido com a cor inicial do CSS
ctxInk.fillStyle = targetInkColor;
ctxInk.fillRect(0, 0, window.innerWidth, window.innerHeight);

// =============================================
// AJUSTE DINÂMICO DOS CANVAS (RESIZE)
// =============================================
function resizeCanvas() {
  canvasInk.width = window.innerWidth;
  canvasInk.height = window.innerHeight;
  canvasPart.width = window.innerWidth;
  canvasPart.height = window.innerHeight;

  // Redesenha o fundo atual no canvas de tinta ao redimensionar
  ctxInk.fillStyle = targetInkColor;
  ctxInk.fillRect(0, 0, canvasInk.width, canvasInk.height);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializar dimensões

// =============================================
// SISTEMA DE PARTÍCULAS ELEMENTAIS
// =============================================
let particles = [];

class Particle {
  constructor(x, y, corBase) {
    this.x = x;
    this.y = y;
    this.cor = corBase;
    
    // Tamanho aleatório (um pouco maiores para impacto mágico)
    this.size = Math.random() * 5 + 3;
    
    // Velocidade de explosão omnidirecional
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    
    // Atrito simulado
    this.friction = 0.94;
    
    this.life = 1.0;
    this.decay = Math.random() * 0.02 + 0.015; // Velocidade em que somem
  }

  update() {
    this.speedX *= this.friction;
    this.speedY *= this.friction;
    this.x += this.speedX;
    this.y += this.speedY;

    // Efeito de "subida" tipo faísca leve
    this.y -= 0.5;

    this.life -= this.decay;
    this.size *= 0.96; // Encolhe gradualmente
  }

  draw(ctx) {
    ctx.globalAlpha = Math.max(0, this.life);
    
    // Brilho intenso no centro, dissipando (Efeito Cristal/Glowing)
    ctx.fillStyle = '#ffffff'; 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Halo com a cor real da partícula
    ctx.globalAlpha = Math.max(0, this.life * 0.6);
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  }
}

// Loop Principal de Animação
function renderLoop() {
  requestAnimationFrame(renderLoop);

  // 1. Limpar canvas de partículas a cada frame
  ctxPart.clearRect(0, 0, canvasPart.width, canvasPart.height);

  // 2. Atualizar e desenhar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.draw(ctxPart);
    if (p.life <= 0 || p.size < 0.2) {
      particles.splice(i, 1);
    }
  }

  // 3. Atualizar e desenhar explosão de tinta (Ink Spread)
  if (inkAnimating) {
    // Easing de velocidade: diminui a distância entre o raio atual e o máximo
    const ease = 0.08;
    const diff = inkMaxRadius - inkRadius;
    const velocity = diff * ease + 8; // Velocidade base mínima para não travar
    
    inkRadius += velocity;

    // Preenche o overlay de expansão
    ctxInk.beginPath();
    ctxInk.arc(inkX, inkY, inkRadius, 0, Math.PI * 2);
    ctxInk.fillStyle = targetInkColor;
    ctxInk.fill();

    // Se o círculo cobriu totalmente a tela (chegou no maxRadius)
    if (inkRadius >= inkMaxRadius) {
      inkAnimating = false;
      // Garante que o canvas inteiro foi totalmente preenchido
      ctxInk.fillStyle = targetInkColor;
      ctxInk.fillRect(0, 0, canvasInk.width, canvasInk.height);
    }
  }
}
// Iniciar engine gráfica
renderLoop();


// =============================================
// FUNÇÃO: Cores e Nomes
// Gera cores sempre "diferenciadas" usando HSL
// =============================================

// Armazena a última matiz (hue) para garantir mudança drástica
let ultimaMatiz = -1;

// Set para garantir que NENHUMA cor se repita na sessão
const coresUsadas = new Set();

function gerarCorHex() {
  let hex, r, g, b, h;
  let tentativas = 0;
  const maxTentativas = 500; // Segurança contra loop infinito

  do {
    // 1. Gera uma Matiz (Hue) aleatória, mas garante que seja bem diferente da anterior
    do {
      h = Math.floor(Math.random() * 361);
    } while (ultimaMatiz !== -1 && Math.abs(h - ultimaMatiz) < 40 && Math.abs(h - ultimaMatiz) > 320);
    
    // 2. Saturação (Saturation) entre 60% e 90%
    const s = Math.floor(Math.random() * 31) + 60;

    // 3. Luminosidade (Lightness) entre 45% e 65%
    const l = Math.floor(Math.random() * 21) + 45;

    // 4. Converte HSL para RGB
    const rgb = hslToRgb(h / 360, s / 100, l / 100);
    r = rgb.r;
    g = rgb.g;
    b = rgb.b;

    hex = '#'
      + r.toString(16).padStart(2, '0')
      + g.toString(16).padStart(2, '0')
      + b.toString(16).padStart(2, '0');
    
    tentativas++;
    // Se por milagre estatístico a cor já foi usada, tenta de novo
    // (A menos que tenhamos esgotado as tentativas razoáveis)
  } while (coresUsadas.has(hex) && tentativas < maxTentativas);

  ultimaMatiz = h;
  coresUsadas.add(hex);

  return { hex, r, g, b };
}

// Algoritmo clássico de conversão HSL -> RGB
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function nomeProximo(r, g, b) {
  let menorDistancia = Infinity;
  let nomeSelecionado = 'Desconhecida';

  for (const cor of CORES_ALQUIMICAS) {
    const distancia =
      (cor.r - r) ** 2 +
      (cor.g - g) ** 2 +
      (cor.b - b) ** 2;

    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      nomeSelecionado = cor.nome;
    }
  }

  return nomeSelecionado;
}


// =============================================
// FUNÇÃO PRINCIPAL: Forjar a Cor
// =============================================
function forjarCor() {
  const { hex, r, g, b } = gerarCorHex();
  const nome = nomeProximo(r, g, b);

  targetInkColor = hex;

  // Modificar a variável CSS global para o brilho do cristal
  document.documentElement.style.setProperty('--current-color', hex);

  // Preparar coordenadas da animação da tinta, originária do centro do botão
  const rect = btnGerar.getBoundingClientRect();
  inkX = rect.left + rect.width / 2;
  inkY = rect.top + rect.height / 2;
  
  // O raio máximo necessário é a distância do botão ao canto mais distante da tela
  const distTL = Math.hypot(inkX, inkY);
  const distTR = Math.hypot(canvasInk.width - inkX, inkY);
  const distBL = Math.hypot(inkX, canvasInk.height - inkY);
  const distBR = Math.hypot(canvasInk.width - inkX, canvasInk.height - inkY);
  inkMaxRadius = Math.max(distTL, distTR, distBL, distBR) + 50; // +50 folga
  
  inkRadius = 10;
  inkAnimating = true;

  // "Onda de choque" de partículas coloridas partindo do botão
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(inkX, inkY, hex));
  }

  // Efeito de transição suave do texto
  elNome.style.opacity = 0;
  elHex.style.opacity = 0;
  
  setTimeout(() => {
    elNome.textContent = nome;
    elHex.textContent  = hex.toUpperCase();
    
    elNome.style.opacity = 1;
    elHex.style.opacity = 1;
  }, 300); // Sincronizado vagamente com a fluidez da animação visual
}


// =============================================
// FUNÇÃO: Copiar o código Hex transcrito
// =============================================
function copiarHex() {
  // Ignora se estiver invisível
  if (elHex.style.opacity === '0') return;

  const textoCopiar = elHex.textContent.trim();

  navigator.clipboard.writeText(textoCopiar)
    .then(() => mostrarTooltip())
    .catch(() => alert('Feitiço de transcrição falhou. Código: ' + textoCopiar));
}

function mostrarTooltip() {
  elTooltip.classList.remove('oculto');
  if (timerTooltip) clearTimeout(timerTooltip);

  timerTooltip = setTimeout(() => {
    elTooltip.classList.add('oculto');
  }, 1800);
}


// =============================================
// EVENTOS DE INTERAÇÃO
// =============================================

// Clique no botão "Runa"
btnGerar.addEventListener('click', forjarCor);

// Clique no código hex para copiar
elHex.addEventListener('click', copiarHex);

// Tecla de atalho (Barra de Espaço)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // Impede rolagem
    forjarCor();
    
    // Adiciona feedback visual à runa mesmo via teclado
    btnGerar.classList.add('active-keyboard');
    setTimeout(() => btnGerar.classList.remove('active-keyboard'), 150);
  }
});


// =============================================
// INICIALIZAÇÃO — Forjar a primeira cor arcana!
// =============================================
forjarCor();
