/* ============================
   MENU MOBILE
============================ */

const menuMobile = document.getElementById("menuMobile");
const navbar = document.querySelector(".navbar");

menuMobile.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


/* ============================
   FECHAR MENU AO CLICAR
============================ */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});


/* ============================
   FLASHCARDS
============================ */

const flashcards = document.querySelectorAll(".flashcard");

flashcards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });


    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            card.classList.toggle("flipped");

        }

    });

});


/* ============================
   QUIZ
============================ */

const questions = [

    {
        question:
            "Qual fenômeno óptico ajuda a manter a luz confinada no núcleo da fibra?",

        answers: [
            "A) Refração atmosférica",
            "B) Reflexão interna total",
            "C) Magnetismo",
            "D) Eletricidade estática"
        ],

        correct: 1
    },


    {
        question:
            "Qual elemento da fibra transporta principalmente o sinal luminoso?",

        answers: [
            "A) Núcleo",
            "B) Revestimento externo",
            "C) Conector metálico",
            "D) Antena"
        ],

        correct: 0
    },


    {
        question:
            "Em que ano foi desenvolvida a primeira fibra óptica de baixa perda para telecomunicações pela equipe da Corning?",

        answers: [
            "A) 1950",
            "B) 1962",
            "C) 1970",
            "D) 1990"
        ],

        correct: 2
    },


    {
        question:
            "O que é transmitido através da fibra óptica?",

        answers: [
            "A) Apenas eletricidade",
            "B) Sinais luminosos que representam informações",
            "C) Apenas ondas sonoras",
            "D) Apenas imagens"
        ],

        correct: 1
    },


    {
        question:
            "Qual é uma vantagem importante da fibra óptica?",

        answers: [
            "A) Baixa capacidade de transmissão",
            "B) Alta atenuação",
            "C) Grande capacidade de transmissão",
            "D) Necessidade de energia elétrica dentro do vidro"
        ],

        correct: 2
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const quizContent = document.getElementById("quizContent");

const quizFeedback = document.getElementById("quizFeedback");

const nextQuestion = document.getElementById("nextQuestion");

const quizResult = document.getElementById("quizResult");

const scoreElement = document.getElementById("score");

const resultText = document.getElementById("resultText");

const restartQuiz = document.getElementById("restartQuiz");


function loadQuestion() {

    answered = false;

    quizFeedback.textContent = "";

    nextQuestion.style.display = "none";


    const question = questions[currentQuestion];


    document.querySelector(".quiz-question span").textContent =
        `PERGUNTA ${currentQuestion + 1}`;


    document.querySelector(".quiz-question h3").textContent =
        question.question;


    const answersContainer =
        document.querySelector(".answers");


    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;


        button.addEventListener("click", () => {

            selectAnswer(button, index);

        });


        answersContainer.appendChild(button);

    });

}


function selectAnswer(button, index) {

    if (answered) return;

    answered = true;


    const question = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (index === question.correct) {

        button.classList.add("correct");

        quizFeedback.textContent =
            "✓ Correto! Você acertou.";

        quizFeedback.style.color = "#16a34a";

        score++;

    } else {

        button.classList.add("wrong");

        buttons[question.correct].classList.add("correct");

        quizFeedback.textContent =
            "✕ Não foi dessa vez. A resposta correta está destacada.";

        quizFeedback.style.color = "#dc2626";

    }


    nextQuestion.style.display = "inline-block";


    if (currentQuestion === questions.length - 1) {

        nextQuestion.textContent =
            "Ver resultado →";

    }

}


nextQuestion.addEventListener("click", () => {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showResult();

    }

});


function showResult() {

    quizContent.querySelector(".quiz-question").style.display = "none";

    quizContent.querySelector(".answers").style.display = "none";

    quizFeedback.style.display = "none";

    nextQuestion.style.display = "none";


    quizResult.style.display = "block";

    restartQuiz.style.display = "inline-block";


    scoreElement.textContent =
        `${score}/${questions.length}`;


    if (score === questions.length) {

        resultText.textContent =
            "Excelente! Você domina os principais conceitos da fibra óptica.";

    } else if (score >= 3) {

        resultText.textContent =
            "Muito bem! Você já conhece bastante sobre fibra óptica.";

    } else {

        resultText.textContent =
            "Continue pesquisando! A fibra óptica tem muitos conceitos interessantes.";

    }

}


restartQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;


    quizContent.querySelector(".quiz-question").style.display = "block";

    quizContent.querySelector(".answers").style.display = "grid";

    quizFeedback.style.display = "block";


    quizResult.style.display = "none";


    loadQuestion();

});


loadQuestion();


/* ============================
   BOTÃO VOLTAR AO TOPO
============================ */

const backTop = document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ============================
   ANIMAÇÃO AO ENTRAR NA TELA
============================ */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: .12
    }
);


document
    .querySelectorAll(
        ".topic-card, .step, .stat-card, .flashcard, .timeline-item"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform = "translateY(25px)";

        element.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });