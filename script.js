const questions = [
  { question: "Qual expressão tem como resultado o número 67?", options: ["60 + 7", "50 + 12", "70 - 5", "6 * 10"], answer: 0 },
  { question: "Qual valor subtraído de 100 resulta em 67?", options: ["23", "33", "43", "37"], answer: 1 },
  { question: "O número 67 pertence a qual destas categorias?", options: ["Número Par", "Número Múltiplo de 5", "Número Primo", "Número Negativo"], answer: 2 },
  { question: "Em uma sequência numérica: 61, 63, 65, ..., qual é o próximo número?", options: ["66", "67", "68", "69"], answer: 1 }
];

let currentIndex = 0;
let score = 0;
let lives = 3;

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
  currentIndex = 0;
  score = 0;
  lives = 3;
  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  updateHUD();
  loadQuestion();
}

function updateHUD() {
  document.getElementById('score').textContent = `Pontos: ${score}`;
  document.getElementById('lives').textContent = `Vidas: ${'❤️'.repeat(lives)}`;
}

function loadQuestion() {
  const q = questions[currentIndex];
  document.getElementById('question-text').textContent = q.question;
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(idx);
    container.appendChild(btn);
  });
}

function selectOption(idx) {
  if (idx === questions[currentIndex].answer) {
    score += 10;
  } else {
    lives--;
  }

  currentIndex++;
  updateHUD();

  if (currentIndex < questions.length && lives > 0) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  document.getElementById('final-title').textContent = lives > 0 ? "Vitória! 🎉" : "Fim de Jogo! ❌";
  document.getElementById('final-score').textContent = `Sua pontuação final foi: ${score}`;
}