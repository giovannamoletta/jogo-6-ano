// Banco de perguntas (conteúdo do 6º ano: operações, múltiplos, primos, valor posicional, frações)
const banco = [
  { p: "Quanto é 6 × 7?", o: ["42", "13", "36", "48"], c: 0, e: "6 × 7 = 42." },
  { p: "Quanto é 60 + 7?", o: ["53", "76", "67", "13"], c: 2, e: "60 + 7 = 67." },
  { p: "Qual é o dobro de 67?", o: ["124", "134", "144", "127"], c: 1, e: "67 + 67 = 134." },
  { p: "O número 67 é par ou ímpar?", o: ["Par", "Ímpar"], c: 1, e: "Termina em 7, então é ímpar." },
  { p: "Arredondando 67 para a dezena mais próxima, temos:", o: ["60", "65", "70", "100"], c: 2, e: "67 está mais perto de 70 do que de 60." },
  { p: "Quanto falta para 67 chegar a 100?", o: ["23", "43", "33", "37"], c: 2, e: "100 − 67 = 33." },
  { p: "No número 67, qual é o valor do algarismo 6?", o: ["6", "60", "600", "7"], c: 1, e: "O 6 está na casa das dezenas: vale 60." },
  { p: "O número 67 é primo?", o: ["Sim, só divide por 1 e por 67", "Não, divide por 3", "Não, divide por 7", "Não, divide por 2"], c: 0, e: "67 só é divisível por 1 e por ele mesmo." },
  { p: "Qual é a metade de 134?", o: ["57", "77", "67", "62"], c: 2, e: "134 ÷ 2 = 67." },
  { p: "Quanto é 6 + 7 × 2?", o: ["26", "20", "19", "13"], c: 1, e: "Primeiro a multiplicação: 7 × 2 = 14. Depois 6 + 14 = 20." },
  { p: "Qual múltiplo de 7 está mais perto de 67?", o: ["63", "70", "77", "56"], c: 1, e: "70 = 7 × 10, a diferença para 67 é só 3." },
  { p: "Quanto é 67 × 10?", o: ["607", "67", "6.700", "670"], c: 3, e: "Multiplicar por 10 acrescenta um zero: 670." },
  { p: "Qual número completa a sequência: 61, 63, 65, ...?", o: ["66", "67", "68", "69"], c: 1, e: "A sequência soma 2 a cada passo." },
  { p: "A fração 67/100 está mais perto de:", o: ["0", "1/2", "1", "2"], c: 1, e: "67/100 = 0,67. Diferença até 0,5 é 0,17; até 1 é 0,33." }
];

const TOTAL = 10, ACERTO = 67, BONUS = 33, PENALIDADE = 20;
let perguntas, atual, pontos, seq, respondeu;

const $ = id => document.getElementById(id);
const telas = ["tela-inicio", "tela-jogo", "tela-fim"];

function mostrar(id) { telas.forEach(t => $(t).classList.toggle("ativa", t === id)); }
function embaralhar(v) { return [...v].sort(() => Math.random() - 0.5); }

function iniciar() {
  perguntas = embaralhar(banco).slice(0, TOTAL);
  atual = 0; pontos = 0; seq = 0;
  mostrar("tela-jogo");
  carregar();
}

function atualizarPlacar() {
  $("num").textContent = atual + 1;
  $("seq").textContent = seq;
  $("pontos").textContent = pontos;
  const max = TOTAL * ACERTO;
  $("barra").style.width = Math.min(100, (pontos / max) * 100) + "%";
  document.querySelector(".medidor").setAttribute("aria-valuenow", pontos);
}

function carregar() {
  respondeu = false;
  const q = perguntas[atual];
  $("pergunta").textContent = q.p;
  $("feedback").textContent = "";
  $("btn-prox").hidden = true;
  const box = $("opcoes");
  box.innerHTML = "";
  // guarda o texto da resposta certa antes de embaralhar
  const certa = q.o[q.c];
  embaralhar(q.o).forEach(txt => {
    const b = document.createElement("button");
    b.className = "op";
    b.textContent = txt;
    b.addEventListener("click", () => responder(b, txt === certa));
    box.appendChild(b);
  });
  atualizarPlacar();
}

function responder(botao, acertou) {
  if (respondeu) return;
  respondeu = true;
  const q = perguntas[atual];
  const certa = q.o[q.c];
  document.querySelectorAll(".op").forEach(b => {
    b.disabled = true;
    if (b.textContent === certa) b.classList.add("certa");
  });
  if (acertou) {
    seq++;
    const bonus = seq >= 3 ? BONUS : 0;
    pontos += ACERTO + bonus;
    $("feedback").textContent = `Aura +${ACERTO + bonus}! ${q.e}` + (bonus ? " Bônus de sequência!" : "");
    if (seq === 3) surgirPop();
  } else {
    seq = 0;
    pontos = Math.max(0, pontos - PENALIDADE);
    botao.classList.add("errada");
    $("feedback").textContent = `Aura −${PENALIDADE}. ${q.e}`;
  }
  atualizarPlacar();
  $("btn-prox").textContent = atual === TOTAL - 1 ? "Ver resultado" : "Próxima";
  $("btn-prox").hidden = false;
  $("btn-prox").focus();
}

function surgirPop() {
  const el = $("pop");
  el.classList.remove("mostrar");
  void el.offsetWidth; // reinicia a animação
  el.classList.add("mostrar");
}

function proxima() {
  atual++;
  if (atual < TOTAL) carregar(); else terminar();
}

function terminar() {
  mostrar("tela-fim");
  $("aura-final").textContent = pontos;
  let rank, msg;
  if (pontos >= 670) { rank = "Aura 67: Mestre do 67!"; msg = "Você dominou a matemática do 6º ano."; }
  else if (pontos >= 450) { rank = "Aura alta"; msg = "Mandou muito bem! Quase no topo."; }
  else if (pontos >= 200) { rank = "Aura em crescimento"; msg = "Está no caminho. Treine mais um pouco!"; }
  else { rank = "Aura iniciante"; msg = "Revise as explicações e tente de novo."; }
  $("rank").textContent = rank;
  $("msg-final").textContent = msg;
}

$("btn-iniciar").addEventListener("click", iniciar);
$("btn-prox").addEventListener("click", proxima);
$("btn-reiniciar").addEventListener("click", iniciar);
