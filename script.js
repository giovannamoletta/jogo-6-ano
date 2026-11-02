"use strict";

/* ===== BANCO DE PERGUNTAS (conteúdo do 6º ano) ===== */
const BANCO = [
  { tema: "Divisão", q: "Quanto é 48 ÷ 6?", certa: "8", erradas: ["6", "7", "9"], dica: "6 × 8 = 48, então 48 ÷ 6 = 8." },
  { tema: "Adição", q: "Quanto é 60 + 7?", certa: "67", erradas: ["13", "76", "607"], dica: "60 + 7 = 67. Olha o 67 aí!" },
  { tema: "Subtração", q: "Quanto é 100 − 33?", certa: "67", erradas: ["77", "63", "57"], dica: "100 − 33 = 67." },
  { tema: "Tabuada", q: "Quanto é 6 × 7?", certa: "42", erradas: ["13", "36", "48"], dica: "6 × 7 = 42. Seis… sete!" },
  { tema: "MMC", q: "Qual é o MMC de 4 e 6?", certa: "12", erradas: ["2", "24", "10"], dica: "Múltiplos de 4: 4, 8, 12… Múltiplos de 6: 6, 12… O menor em comum é 12." },
  { tema: "MDC", q: "Qual é o MDC de 12 e 18?", certa: "6", erradas: ["3", "12", "36"], dica: "Divisores comuns: 1, 2, 3 e 6. O maior é 6." },
  { tema: "Frações", q: "Quanto é 3/4 de 20?", certa: "15", erradas: ["12", "5", "16"], dica: "20 ÷ 4 = 5 e 5 × 3 = 15." },
  { tema: "Frações", q: "Qual fração é equivalente a 1/2?", certa: "3/6", erradas: ["2/6", "1/3", "3/5"], dica: "3/6: dividindo em cima e embaixo por 3 dá 1/2." },
  { tema: "Frações", q: "Quanto é 1/2 + 1/4?", certa: "3/4", erradas: ["2/6", "1/6", "2/4"], dica: "1/2 = 2/4. Então 2/4 + 1/4 = 3/4." },
  { tema: "Perímetro", q: "Um quadrado tem lado de 7 cm. Qual é o perímetro?", certa: "28 cm", erradas: ["14 cm", "49 cm", "21 cm"], dica: "Perímetro = 4 × 7 = 28 cm." },
  { tema: "Área", q: "Um retângulo mede 6 cm por 7 cm. Qual é a área?", certa: "42 cm²", erradas: ["26 cm²", "13 cm²", "36 cm²"], dica: "Área = 6 × 7 = 42 cm²." },
  { tema: "Potências", q: "Quanto é 2³ ?", certa: "8", erradas: ["6", "5", "9"], dica: "2³ = 2 × 2 × 2 = 8." },
  { tema: "Potências", q: "Quanto é 7² ?", certa: "49", erradas: ["14", "42", "77"], dica: "7² = 7 × 7 = 49." },
  { tema: "Números primos", q: "Qual destes números é primo?", certa: "13", erradas: ["9", "15", "21"], dica: "13 só se divide por 1 e por ele mesmo." },
  { tema: "Múltiplos", q: "Qual destes números é múltiplo de 7?", certa: "42", erradas: ["40", "45", "50"], dica: "7 × 6 = 42." },
  { tema: "Divisores", q: "Quantos divisores o número 6 tem?", certa: "4", erradas: ["2", "3", "6"], dica: "Os divisores de 6 são 1, 2, 3 e 6." },
  { tema: "Decimais", q: "Quanto é 0,5 + 0,25?", certa: "0,75", erradas: ["0,30", "0,525", "0,55"], dica: "0,50 + 0,25 = 0,75." },
  { tema: "Decimais", q: "Quanto é 5,6 − 2,3?", certa: "3,3", erradas: ["3,7", "2,3", "4,3"], dica: "56 décimos − 23 décimos = 33 décimos = 3,3." },
  { tema: "Decimais", q: "Arredondando 6,7 para o inteiro mais próximo, temos:", certa: "7", erradas: ["6", "8", "6,5"], dica: "6,7 está mais perto de 7 do que de 6." },
  { tema: "Porcentagem", q: "Quanto é 25% de 80?", certa: "20", erradas: ["25", "40", "16"], dica: "25% é 1/4. 80 ÷ 4 = 20." },
  { tema: "Expressões", q: "Quanto é 2 + 3 × 4?", certa: "14", erradas: ["20", "24", "10"], dica: "Primeiro a multiplicação: 3 × 4 = 12. Depois 2 + 12 = 14." },
  { tema: "Geometria", q: "Quantos graus mede um ângulo reto?", certa: "90°", erradas: ["45°", "180°", "60°"], dica: "O ângulo reto forma um 'cantinho' de 90°." },
  { tema: "Geometria", q: "Quanto vale a soma dos ângulos de um triângulo?", certa: "180°", erradas: ["90°", "360°", "100°"], dica: "Em qualquer triângulo, a soma é sempre 180°." }
];

const TOTAL = 10;
const PONTOS_ACERTO = 10;
const BONUS_67 = 67;

/* ===== ELEMENTOS ===== */
const $ = (id) => document.getElementById(id);
const telas = { inicio: $("tela-inicio"), jogo: $("tela-jogo"), fim: $("tela-fim") };

/* ===== ESTADO ===== */
let lista = [];
let indice = 0;
let pontos = 0;
let acertos = 0;
let sequencia = 0;
let melhorSeq = 0;
let travado = false;

/* ===== FUNÇÕES AUXILIARES ===== */
function embaralhar(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function mostrarTela(nome) {
  Object.entries(telas).forEach(([chave, el]) => { el.hidden = chave !== nome; });
}

function lerRecorde() {
  try { return Number(localStorage.getItem("missao67-recorde")) || 0; }
  catch (e) { return 0; }
}

function salvarRecorde(valor) {
  try { localStorage.setItem("missao67-recorde", String(valor)); }
  catch (e) { /* sem armazenamento: segue o jogo */ }
}

/* ===== PONTINHOS DA SEQUÊNCIA (6 e 7 destacados) ===== */
function criarPontinhos() {
  const ol = $("pontinhos");
  ol.innerHTML = "";
  for (let n = 1; n <= 7; n++) {
    const li = document.createElement("li");
    li.textContent = n === 6 || n === 7 ? String(n) : "";
    if (n === 6) li.classList.add("seis");
    if (n === 7) li.classList.add("sete");
    ol.appendChild(li);
  }
}

function atualizarPontinhos() {
  [...$("pontinhos").children].forEach((li, i) => {
    li.classList.toggle("ativo", i < sequencia);
  });
}

/* ===== FLUXO DO JOGO ===== */
function iniciar() {
  lista = embaralhar(BANCO).slice(0, TOTAL);
  indice = 0;
  pontos = 0;
  acertos = 0;
  sequencia = 0;
  melhorSeq = 0;
  $("pontos").textContent = "0";
  criarPontinhos();
  mostrarTela("jogo");
  mostrarPergunta();
}

function mostrarPergunta() {
  const item = lista[indice];
  travado = false;

  $("num-pergunta").textContent = indice + 1;
  $("barra-prog").style.width = (indice / TOTAL) * 100 + "%";
  document.querySelector(".barra").setAttribute("aria-valuenow", indice);
  $("tema").textContent = item.tema;
  $("pergunta").textContent = item.q;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("btn-proxima").hidden = true;
  atualizarPontinhos();

  const box = $("opcoes");
  box.innerHTML = "";
  embaralhar([item.certa, ...item.erradas]).forEach((texto) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcao";
    b.textContent = texto;
    b.addEventListener("click", () => responder(b, texto));
    box.appendChild(b);
  });
}

function responder(botao, escolha) {
  if (travado) return;
  travado = true;

  const item = lista[indice];
  const acertou = escolha === item.certa;
  const feedback = $("feedback");

  document.querySelectorAll(".opcao").forEach((b) => {
    b.disabled = true;
    if (b.textContent === item.certa) b.classList.add("certa");
  });

  if (acertou) {
    acertos++;
    sequencia++;
    pontos += PONTOS_ACERTO;
    melhorSeq = Math.max(melhorSeq, sequencia);
    feedback.textContent = "Isso! " + item.dica;
    feedback.classList.add("ok");

    if (sequencia === 6) avisar("6… falta só mais uma!");
    if (sequencia === 7) {
      pontos += BONUS_67;
      explosao67();
      sequencia = 0; // recomeça a contagem para tentar de novo
    }
  } else {
    botao.classList.add("errada");
    sequencia = 0;
    feedback.textContent = "Quase! " + item.dica;
    feedback.classList.add("nao");
  }

  $("pontos").textContent = pontos;
  atualizarPontinhos();

  const ultima = indice === TOTAL - 1;
  const proxima = $("btn-proxima");
  proxima.textContent = ultima ? "Ver resultado" : "Próxima";
  proxima.hidden = false;
  proxima.focus();
}

function avancar() {
  if (indice === TOTAL - 1) return terminar();
  indice++;
  mostrarPergunta();
}

function terminar() {
  const recorde = lerRecorde();
  if (pontos > recorde) { salvarRecorde(pontos); $("recorde").textContent = pontos; }

  let patente = "Aprendiz dos Números";
  if (acertos >= 10) patente = "Lenda do 67";
  else if (acertos >= 8) patente = "Mestre da Matemática";
  else if (acertos >= 6) patente = "Craque dos Cálculos";

  $("fim-patente").textContent = patente;
  $("fim-acertos").textContent = acertos;
  $("fim-pontos").textContent = pontos;
  $("fim-seq").textContent = melhorSeq;
  $("barra-prog").style.width = "100%";
  mostrarTela("fim");
}

/* ===== EFEITOS DO MEME 67 ===== */
function explosao67() {
  const el = $("explosao");
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, 2200);
}

function avisar(texto) {
  const el = $("aviso");
  el.textContent = texto;
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, 1600);
}

/* ===== EVENTOS ===== */
$("btn-iniciar").addEventListener("click", iniciar);
$("btn-reiniciar").addEventListener("click", iniciar);
$("btn-proxima").addEventListener("click", avancar);
$("explosao").addEventListener("click", () => { $("explosao").hidden = true; });
$("recorde").textContent = lerRecorde();