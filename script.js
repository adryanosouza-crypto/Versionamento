// ======== ELEMENTOS DO DOM ========

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

const progressBar = document.getElementById("progress");

// ======== LISTA DE PERGUNTAS DO QUIZ ========

const quizQuestions = [
  {
    question: "Qual linguagem é mais utilizada para estruturar páginas web?",
    answers: [
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: false },
      { text: "HTML", correct: true },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "O que significa a sigla 'SQL' em bancos de dados?",
    answers: [
      { text: "Structured Query Language", correct: true },
      { text: "System Quality Language", correct: false },
      { text: "Simple Query Logic", correct: false },
      { text: "Secure Question List", correct: false },
    ],
  },
  {
    question: "Qual protocolo é utilizado para transferir páginas web pela internet?",
    answers: [
      { text: "FTP", correct: false },
      { text: "HTTP", correct: true },
      { text: "SMTP", correct: false },
      { text: "DNS", correct: false },
    ],
  },
  {
    question: "Qual das alternativas representa um tipo de ataque cibernético?",
    answers: [
      { text: "Firewall", correct: false },
      { text: "Phishing", correct: true },
      { text: "Backup", correct: false },
      { text: "Criptografia", correct: false },
    ],
  },
  {
    question: "Em CSS, qual propriedade é usada para mudar a cor do texto?",
    answers: [
      { text: "background-color", correct: false },
      { text: "font-size", correct: false },
      { text: "color", correct: true },
      { text: "text-align", correct: false },
    ],
  },
];

// ======== VARIÁVEIS DE ESTADO DO QUIZ ========

let currentQuestionIndex = 0; // Índice da pergunta atual
let score = 0; // Pontuação do usuário
let answersDisabled = false; // Evita múltiplos cliques nas respostas

// Define o total de perguntas na tela
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ======== EVENTOS ========

// Iniciar quiz ao clicar no botão
startButton.addEventListener("click", startQuiz);

// Recomeçar quiz ao final
restartButton.addEventListener("click", restartQuiz);

// ======== FUNÇÕES DO QUIZ ========

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  // Alterna telas: esconde início e mostra quiz
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  updateProgress();
  showQuestion();
}

function showQuestion() {
  answersContainer.innerHTML = "";
  answersDisabled = false;

  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  q.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans.text;
    btn.dataset.correct = ans.correct; // "true" ou "false"
    btn.type = "button";
    btn.addEventListener("click", () => selectAnswer(btn));
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(button) {
  if (answersDisabled) return;
  answersDisabled = true;

  const correct = button.dataset.correct === "true";

  // Marca seleções
  if (correct) {
    button.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    button.classList.add("incorrect");
    // mostra a correta
    Array.from(answersContainer.children).forEach((b) => {
      if (b.dataset.correct === "true") b.classList.add("correct");
    });
  }

  // desabilita botões
  Array.from(answersContainer.children).forEach((b) => (b.disabled = true));

  // Avança para próxima pergunta após curto atraso
  setTimeout(() => {
    currentQuestionIndex++;
    updateProgress();
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 800);
}

function updateProgress() {
  const percent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = percent + "%";
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  const ratio = score / quizQuestions.length;
  if (ratio === 1) resultMessage.textContent = "Perfeito! Você acertou todas.";
  else if (ratio >= 0.6) resultMessage.textContent = "Bom trabalho!";
  else resultMessage.textContent = "Continue praticando!";
}

function restartQuiz() {
  // volta para tela inicial
  resultScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  startScreen.classList.add("active");
}
