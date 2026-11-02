"use strict";

/* ===== BANCO DE PERGUNTAS FIXAS (conteúdo do 6º ano) ===== */
const BANCO = [
  { tema: "MMC", q: "Qual é o MMC de 4 e 6?", certa: "12", erradas: ["2", "24", "10"], dica: "Múltiplos de 4: 4, 8, 12… Múltiplos de 6: 6, 12… O menor em comum é 12." },
  { tema: "MDC", q: "Qual é o MDC de 20 e 30?", certa: "10", erradas: ["5", "60", "2"], dica: "Os divisores comuns são 1, 2, 5 e 10. O maior é 10." },
  { tema: "Frações", q: "Qual fração é equivalente a 1/2?", certa: "3/6", erradas: ["2/6", "1/3", "3/5"], dica: "Em 3/6, dividindo em cima e embaixo por 3, dá 1/2." },
  { tema: "Frações", q: "Quanto é 1/2 + 1/4?", certa: "3/4", erradas: ["2/6", "1/6", "2/4"], dica: "1/2 = 2/4. Então 2/4 + 1/4 = 3/4." },
  { tema: "Múltiplos", q: "Qual destes números é múltiplo de 9?", certa: "54", erradas: ["52", "56", "58"], dica: "9 × 6 = 54." },
  { tema: "Números primos", q: "Qual destes números é primo?", certa: "13", erradas: ["9", "15", "21"], dica: "13 só se divide por 1 e por ele mesmo." },
  { tema: "Divisores", q: "Quantos divisores o número 10 tem?", certa: "4", erradas: ["2", "3", "5"], dica: "Os divisores de 10 são 1, 2, 5 e 10." },
  { tema: "Decimais", q: "Quanto é 0,5 + 0,25?", certa: "0,75", erradas: ["0,30", "0,525", "0,55"], dica: "0,50 + 0,25 = 0,75." },
  { tema: "Decimais", q: "Qual destes números decimais é o maior?", certa: "0,5", erradas: ["0,45", "0,05", "0,4"], dica: "0,5 = 0,50, que é maior que 0,45." },
  { tema: "Decimais", q: "Arredondando 3,6 para o inteiro mais próximo, temos:", certa: "4", erradas: ["3", "5", "3,5"], dica: "3,6 está mais perto de 4 do que de 3." },
  { tema: "Expressões", q: "Quanto é 2 + 3 × 4?", certa: "14", erradas: ["20", "24", "10"], dica: "Primeiro a multiplicação: 3 × 4 = 12. Depois 2 + 12 = 14." },
  { tema: "Potências", q: "Quanto é 5² ?", certa: "25", erradas: ["10", "7", "52"], dica: "5² = 5 × 5 = 25." },
  { tema: "Geometria", q: "Quantos graus mede um ângulo reto?", certa: "90°", erradas: ["45°", "180°", "60°"], dica: "O ângulo reto forma um 'cantinho' de 90°." },
  { tema: "Geometria", q: "Quanto vale a soma dos ângulos de um triângulo?", certa: "180°", erradas: ["90°", "360°", "100°"], dica: "Em qualquer triângulo, a soma é sempre 180°." },
  { tema: "Geometria", q: "Quantos lados tem um pentágono?", certa: "5", erradas: ["4", "6", "8"], dica: "Penta significa cinco: o pentágono tem 5 lados." },
  { tema: "Tempo", q: "Quantos minutos há em 2 horas e meia?", certa: "150", erradas: ["120", "130", "160"], dica: "2 h = 120 min. Mais 30 min = 150 min." },
  { tema: "Números romanos", q: "Qual número é representado por XIV?", certa: "14", erradas: ["16", "24", "4"], dica: "X = 10 e IV = 4. Juntos: 14." }
];

/* ===== GERADORES (números sorteados a cada partida) ===== */
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

function montar(tema, q, valor, dica, fmt = String, passos = [1, 2, 5, 10]) {
  const erradas = new Set();
  while (erradas.size < 3) {
    const p = passos[rnd(0, passos.length - 1)];
    const d = valor + (Math.random() < 0.5 ? -p : p);
    if (d > 0 && d !== valor) erradas.add(d);
  }
  return { tema, q, certa: fmt(valor), erradas: [...erradas].map(fmt), dica };
}

const GERADORES = [
  () => { const a = rnd(120, 890), b = rnd(15, 99);
    return montar("Adição", `Quanto é ${a} + ${b}?`, a + b, `${a} + ${b} = ${a + b}.`, String, [1, 10, 100]); },
  () => { const a = rnd(300, 900), b = rnd(25, 190);
    return montar("Subtração", `Quanto é ${a} − ${b}?`, a - b, `${a} − ${b} = ${a - b}.`, String, [1, 10, 100]); },
  () => { const a = rnd(3, 12), b = rnd(4, 12);
    return montar("Multiplicação", `Quanto é ${a} × ${b}?`, a * b, `${a} × ${b} = ${a * b}.`, String, [1, 2, a, b]); },
  () => { const b = rnd(3, 12), r = rnd(3, 12);
    return montar("Divisão", `Quanto é ${b * r} ÷ ${b}?`, r, `${b} × ${r} = ${b * r}, então ${b * r} ÷ ${b} = ${r}.`, String, [1, 2, 3]); },
  () => { const den = [2, 3, 4, 5, 10][rnd(0, 4)], num = rnd(1, den - 1), k = rnd(2, 9), base = den * k;
    return montar("Frações", `Quanto é ${num}/${den} de ${base}?`, k * num, `${base} ÷ ${den} = ${k}, e ${k} × ${num} = ${k * num}.`, String, [1, 2, k]); },
  () => { const l = rnd(3, 15), c = rnd(3, 15);
    return montar("Perímetro", `Um retângulo mede ${l} cm por ${c} cm. Qual é o perímetro?`, 2 * (l + c), `Perímetro = 2 × (${l} + ${c}) = ${2 * (l + c)} cm.`, (v) => v + " cm", [2, 4, 6, 10]); },
  () => { const l = rnd(3, 12), c = rnd(3, 12);
    return montar("Área", `Um retângulo mede ${l} cm por ${c} cm. Qual é a área?`, l * c, `Área = ${l} × ${c} = ${l * c} cm².`, (v) => v + " cm²", [2, 4, l, c]); },
  () => { const b = rnd(2, 9), e = rnd(2, 3), v = Math.pow(b, e);
    return montar("Potências", `Quanto é ${b}${e === 2 ? "²" : "³"} ?`, v, `${b}${e === 2 ? "²" : "³"} = ${Array(e).fill(b).join(" × ")} = ${v}.`, String, [b, 2, 4, 10]); },
  () => { const [a, b] = [[2, 3], [3, 5], [4, 10], [6, 8], [5, 6], [8, 12], [9, 6], [4, 14]][rnd(0, 7)];
    let m = Math.max(a, b); while (m % a || m % b) m++;
    return montar("MMC", `Qual é o MMC de ${a} e ${b}?`, m, `O menor número que é múltiplo de ${a} e de ${b} é ${m}.`, String, [Math.min(a, b), 2, 6, 10]); },
  () => { const p = [10, 25, 50][rnd(0, 2)], base = 20 * rnd(2, 10), v = base * p / 100;
    return montar("Porcentagem", `Quanto é ${p}% de ${base}?`, v, `${p}% de ${base} é ${v}.`, String, [5, 10, 2]); },
  () => { const a = rnd(11, 59), b = rnd(11, 59), f = (v) => (v / 10).toFixed(1).replace(".", ",");
    return montar("Decimais", `Quanto é ${f(a)} + ${f(b)}?`, a + b, `${f(a)} + ${f(b)} = ${f(a + b)}.`, f, [1, 2, 10]); }
];

function aceitavel(item) { return !/67/.test(JSON.stringify(item)); }

function sortearPerguntas() {
  const fixas = embaralhar(BANCO).slice(0, 5);
  const geradas = embaralhar(GERADORES).slice(0, 5).map((g) => {
    let item; let t = 0;
    do { item = g(); t++; } while (!aceitavel(item) && t < 20);
    return item;
  });
  return embaralhar([...fixas, ...geradas]);
}

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
  lista = sortearPerguntas();
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

    if (sequencia === 7) {
      pontos += BONUS_67;
      explosao67();
      sequencia = 0; // recomeça a contagem para tentar de novo
    } else {
      festa();
      if (sequencia === 6) avisar("6… falta só mais uma!");
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

const ELOGIOS = ["Mandou bem!", "Isso aí!", "Brabo!", "Calculou tudo!", "Que craque!", "Perfeito!", "Arrasou!"];

function festa() {
  const el = $("festa");
  $("festa-frase").textContent = ELOGIOS[rnd(0, ELOGIOS.length - 1)];
  el.hidden = true;
  void el.offsetWidth; // reinicia a animação
  el.hidden = false;
  clearTimeout(festa.t);
  festa.t = setTimeout(() => { el.hidden = true; }, 2000);
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