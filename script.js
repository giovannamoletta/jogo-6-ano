const questions = [
    {
        question: "Qual ecossistema é famoso por ser a maior floresta tropical do mundo?",
        options: ["Caatinga", "Amazônia", "Cerrado", "Mata Atlântica"],
        answer: 1
    },
    {
        question: "Qual é a menor unidade viva responsável por formar todos os seres vivos?",
        options: ["Átomo", "Célula", "Molécula", "Órgão"],
        answer: 1
    },
    {
        question: "Qual planeta é conhecido como o 'Planeta Vermelho' no Nosso Sistema Solar?",
        options: ["Júpiter", "Vênus", "Marte", "Saturno"],
        answer: 2
    },
    {
        question: "O processo em que as plantas usam luz solar para produzir alimento chama-se:",
        options: ["Respiração", "Fotossíntese", "Digestão", "Germinação"],
        answer: 1
    },
    {
        question: "Qual é o gás essencial presente no ar que nós inspiramos para viver?",
        options: ["Gás Carbônico", "Nitrogênio", "Oxigênio", "Hélio"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Referências do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const feedback = document.getElementById('feedback');
const finalScoreText = document.getElementById('final-score-text');
const performanceMsg = document.getElementById('performance-msg');

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQ = questions[currentQuestionIndex];
    
    questionNumber.innerText = `Pergunta ${currentQuestionIndex + 1}/${questions.length}`;
    scoreDisplay.innerText = `Pontos: ${score}`;
    questionText.innerText = currentQ.question;

    currentQ.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, currentQ.answer, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    feedback.classList.add('hidden');
    feedback.innerText = '';
    optionsContainer.innerHTML = '';
}

function selectOption(selectedIndex, correctIndex, selectedBtn) {
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        score += 10;
        selectedBtn.classList.add('correct');
        feedback.innerText = "¡Parabéns! Resposta Correta! 🎉";
        feedback.className = "feedback-message correct";
    } else {
        selectedBtn.classList.add('wrong');
        allButtons[correctIndex].classList.add('correct');
        feedback.innerText = "Ops! Resposta Incorreta. 😅";
        feedback.className = "feedback-message wrong";
    }

    feedback.classList.remove('hidden');

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showEndScreen();
        }
    }, 1800);
}

function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    finalScoreText.innerText = `Você fez ${score} de ${questions.length * 10} pontos!`;
    
    if (score === questions.length * 10) {
        performanceMsg.innerText = "Incrível! Você é um verdadeiro Cientista! 🏆";
    } else if (score >= (questions.length * 10) / 2) {
        performanceMsg.innerText = "Muito bem! Você tem ótimos conhecimentos! 👍";
    } else {
        performanceMsg.innerText = "Continue estudando e tente novamente! 📚";
    }
}