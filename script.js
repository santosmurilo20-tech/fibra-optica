/* =========================================================
   FIBRA ÓPTICA
   JAVASCRIPT DO SITE
========================================================= */


/* =========================================================
   PARTICULAS
========================================================= */

const particleContainer = document.querySelector(".particles");

function createParticles() {

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("span");

        particle.style.position = "absolute";
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;

        particle.style.borderRadius = "50%";

        particle.style.background = "#00eaff";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.style.opacity = Math.random() * .6 + .2;

        particle.style.boxShadow =
            "0 0 10px rgba(0,234,255,.8)";

        particle.style.animation =
            `particleRandom ${Math.random() * 8 + 5}s ease-in-out infinite`;

        particle.style.animationDelay =
            `${Math.random() * 5}s`;

        particleContainer.appendChild(particle);
    }
}

createParticles();


/* =========================================================
   ANIMAÇÃO DAS PARTICULAS
========================================================= */

const particleStyle = document.createElement("style");

particleStyle.innerHTML = `

@keyframes particleRandom {

    0% {
        transform: translate3d(0, 0, 0);
        opacity: .2;
    }

    25% {
        transform: translate3d(20px, -30px, 0);
        opacity: .8;
    }

    50% {
        transform: translate3d(-20px, -60px, 0);
        opacity: .3;
    }

    75% {
        transform: translate3d(30px, -30px, 0);
        opacity: .8;
    }

    100% {
        transform: translate3d(0, 0, 0);
        opacity: .2;
    }

}

`;

document.head.appendChild(particleStyle);


/* =========================================================
   FLASHCARDS
========================================================= */

const flashcards =
    document.querySelectorAll(".flashcard");

flashcards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backTop =
    document.getElementById("backTop");

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


/* =========================================================
   QUIZ
========================================================= */

const questions = [

    {
        question:
            "O que é transmitido através da fibra óptica?",

        answers: [
            "Apenas eletricidade",
            "Sinais luminosos que representam informações",
            "Apenas ondas sonoras",
            "Apenas imagens"
        ],

        correct: 1
    },


    {
        question:
            "Qual é a principal função do núcleo da fibra?",

        answers: [
            "Proteger o cabo contra chuva",
            "Transportar a luz",
            "Produzir eletricidade",
            "Resfriar o cabo"
        ],

        correct: 1
    },


    {
        question:
            "O que ajuda a manter a luz dentro do núcleo?",

        answers: [
            "Reflexão interna total",
            "Eletricidade",
            "Magnetismo",
            "Calor"
        ],

        correct: 0
    },


    {
        question:
            "Uma das principais vantagens da fibra óptica é:",

        answers: [
            "Baixa velocidade",
            "Grande perda de sinal",
            "Alta capacidade de transmissão",
            "Produção de calor"
        ],

        correct: 2
    },


    {
        question:
            "A fibra óptica é utilizada principalmente para:",

        answers: [
            "Transmissão de informações",
            "Produzir combustível",
            "Aquecer ambientes",
            "Produzir alimentos"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const progress =
    document.getElementById("progress");

const quizContent =
    document.getElementById("quizContent");

const quizResult =
    document.getElementById("quizResult");

const scoreElement =
    document.getElementById("score");

const restartButton =
    document.getElementById("restartQuiz");


totalQuestions.textContent =
    questions.length;


/* =========================================================
   CARREGAR QUESTÃO
========================================================= */

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    questionElement.textContent =
        question.question;


    questionNumber.textContent =
        currentQuestion + 1;


    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersElement.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.textContent =
            `${String.fromCharCode(65 + index)}) ${answer}`;

        button.dataset.answer = index;

        button.addEventListener(
            "click",
            () => selectAnswer(button, index)
        );

        answersElement.appendChild(button);

    });

}


/* =========================================================
   SELECIONAR RESPOSTA
========================================================= */

function selectAnswer(button, index) {

    if (answered) return;

    answered = true;


    const correctAnswer =
        questions[currentQuestion].correct;


    const allButtons =
        answersElement.querySelectorAll("button");


    if (index === correctAnswer) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allButtons[correctAnswer]
            .classList.add("correct");

    }


    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 1000);

}


/* =========================================================
   FINALIZAR QUIZ
========================================================= */

function finishQuiz() {

    quizContent.classList.add("hidden");

    quizResult.classList.remove("hidden");

    scoreElement.textContent =
        `${score} / ${questions.length}`;

}


/* =========================================================
   REINICIAR QUIZ
========================================================= */

restartButton.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    quizResult.classList.add("hidden");

    quizContent.classList.remove("hidden");

    loadQuestion();

});


loadQuestion();


/* =========================================================
   ANIMAÇÃO DE REVELAÇÃO AO ROLAR
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".research-card, " +
        ".structure-card, " +
        ".step, " +
        ".advantage-card, " +
        ".application-card, " +
        ".flashcard, " +
        ".evidence-box, " +
        ".source"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


const revealStyle =
    document.createElement("style");

revealStyle.innerHTML = `

.revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

`;

document.head.appendChild(revealStyle);


/* =========================================================
   EFEITO PARALLAX NO HERO
========================================================= */

const fiberContainer =
    document.querySelector(".fiber-container");

window.addEventListener("mousemove", event => {

    if (!fiberContainer) return;


    const x =
        (window.innerWidth / 2 - event.clientX) / 80;

    const y =
        (window.innerHeight / 2 - event.clientY) / 80;


    fiberContainer.style.transform =
        `perspective(1000px)
         rotateY(${x}deg)
         rotateX(${y}deg)`;

});


/* =========================================================
   RESET DO PARALLAX
========================================================= */

fiberContainer.addEventListener("mouseleave", () => {

    fiberContainer.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";

});


/* =========================================================
   EFEITO DE DIGITAÇÃO NO STATUS
========================================================= */

const statusText =
    document.querySelector(".status");

let statusToggle = true;


setInterval(() => {

    if (!statusText) return;

    statusToggle = !statusToggle;

    if (statusToggle) {

        statusText.innerHTML =
            `<span></span>SISTEMA ONLINE`;

    } else {

        statusText.innerHTML =
            `<span></span>CONEXÃO ESTÁVEL`;

    }

}, 3000);


/* =========================================================
   CURSOR / BRILHO NAS SEÇÕES
========================================================= */

document.querySelectorAll(
    ".advantage-card, .application-card, .evidence-box"
).forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0,234,255,.10),
                rgba(0,234,255,.015) 35%,
                transparent 70%
            )
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.background = "";

    });

});


/* =========================================================
   CONTADOR DE DADOS NO HERO
========================================================= */

const dataPackets =
    document.querySelectorAll(".data-packet");


setInterval(() => {

    dataPackets.forEach(packet => {

        const randomNumber =
            Math.floor(
                Math.random() * 999999
            )
            .toString()
            .padStart(6, "0");

        packet.textContent =
            randomNumber;

    });

}, 800);


/* =========================================================
   EFEITO DE LUZ NO MOUSE
========================================================= */

const mouseGlow =
    document.createElement("div");

mouseGlow.style.position = "fixed";

mouseGlow.style.width = "250px";
mouseGlow.style.height = "250px";

mouseGlow.style.borderRadius = "50%";

mouseGlow.style.pointerEvents = "none";

mouseGlow.style.zIndex = "-1";

mouseGlow.style.background =
    "radial-gradient(circle, rgba(0,234,255,.06), transparent 70%)";

mouseGlow.style.transform =
    "translate(-50%, -50%)";

document.body.appendChild(mouseGlow);


document.addEventListener("mousemove", event => {

    mouseGlow.style.left =
        `${event.clientX}px`;

    mouseGlow.style.top =
        `${event.clientY}px`;

});