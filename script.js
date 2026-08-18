/* =========================================================
   CURSOR
========================================================= */

const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

});


/* =========================================================
   PARTICULAS
========================================================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.3;

        this.speedY =
            (Math.random() - 0.5) * 0.3;

        this.opacity =
            Math.random() * 0.6;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0,255,240,${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 60
            : 120;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================================================
   MOUSE PARALLAX
========================================================= */

const heroContent =
    document.querySelector(".hero-content");

const fiberVisual =
    document.querySelector(".fiber-visual");


document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX /
                window.innerWidth -
                0.5);

        const y =
            (event.clientY /
                window.innerHeight -
                0.5);


        if (heroContent) {

            heroContent.style.transform =
                `translate(
                    ${x * -8}px,
                    ${y * -8}px
                )`;

        }


        if (fiberVisual) {

            fiberVisual.style.transform =
                `translateY(-50%)
                 translate(
                    ${x * 20}px,
                    ${y * 20}px
                 )`;

        }

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);


document.querySelectorAll(
    ".mobile-menu a"
).forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    }
);


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 200;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   TILT DOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(
        ".big-card, .theme-card"
    );


cards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    20;

                const rotateY =
                    (centerX - x) /
                    20;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   FLASHCARDS
========================================================= */

const factCards =
    document.querySelectorAll(
        ".fact-card"
    );


factCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "flipped"
                );

            }
        );

    }
);


/* =========================================================
   SIMULAÇÃO DA FIBRA
========================================================= */

const sendSignal =
    document.getElementById(
        "sendSignal"
    );

const simulationSignal =
    document.getElementById(
        "simulationSignal"
    );


sendSignal.addEventListener(
    "click",
    () => {

        simulationSignal.classList.remove(
            "run"
        );


        void simulationSignal.offsetWidth;


        simulationSignal.classList.add(
            "run"
        );


        sendSignal.querySelector("span")
            ?.replaceWith();


    }
);


/* =========================================================
   CONTADORES
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-counter]"
    );


let countersStarted = false;


function animateCounters() {

    if (countersStarted)
        return;

    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    if (!statsSection)
        return;


    const rect =
        statsSection.getBoundingClientRect();


    if (
        rect.top <
        window.innerHeight * 0.8
    ) {

        countersStarted = true;


        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.counter
                    );

                let current = 0;

                const increment =
                    target / 100;


                const timer =
                    setInterval(
                        () => {

                            current +=
                                increment;


                            if (
                                current >=
                                target
                            ) {

                                current =
                                    target;

                                clearInterval(
                                    timer
                                );

                            }


                            counter.textContent =
                                Math.floor(
                                    current
                                ).toLocaleString(
                                    "pt-BR"
                                );

                        },
                        20
                    );

            }
        );

    }

}


window.addEventListener(
    "scroll",
    animateCounters
);

animateCounters();


/* =========================================================
   QUIZ
========================================================= */

const quizData = [

    {
        question:
            "O que é utilizado para transportar informações dentro de uma fibra óptica?",

        answers: [
            "Corrente elétrica",
            "Pulsos de luz",
            "Ondas sonoras",
            "Calor"
        ],

        correct: 1
    },


    {
        question:
            "Qual material é normalmente utilizado no núcleo das fibras ópticas?",

        answers: [
            "Vidro ou material semelhante",
            "Ferro",
            "Cobre",
            "Alumínio"
        ],

        correct: 0
    },


    {
        question:
            "Qual fenômeno permite que a luz percorra o interior da fibra?",

        answers: [
            "Reflexão interna total",
            "Combustão",
            "Magnetismo",
            "Evaporação"
        ],

        correct: 0
    },


    {
        question:
            "Onde podemos encontrar grandes redes de fibra óptica?",

        answers: [
            "Somente em computadores",
            "Apenas em televisores",
            "Em redes de comunicação",
            "Somente em satélites"
        ],

        correct: 2
    },


    {
        question:
            "Qual é uma das principais vantagens da fibra óptica?",

        answers: [
            "Baixa capacidade",
            "Alta velocidade e capacidade",
            "Maior interferência",
            "Necessidade de eletricidade no núcleo"
        ],

        correct: 1
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const questionText =
    document.getElementById(
        "questionText"
    );

const answersContainer =
    document.getElementById(
        "answers"
    );

const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const quizScore =
    document.getElementById(
        "quizScore"
    );

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


function loadQuestion() {

    answered = false;

    quizResult.textContent = "";

    nextQuestion.classList.remove(
        "show"
    );


    const question =
        quizData[
            currentQuestion
        ];


    questionText.textContent =
        question.question;


    questionNumber.textContent =
        `QUESTÃO
        ${String(currentQuestion + 1).padStart(2, "0")}
        / ${quizData.length}`;


    quizProgress.style.width =
        `${(
            (currentQuestion + 1) /
            quizData.length
        ) * 100}%`;


    answersContainer.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () =>
                    selectAnswer(
                        index,
                        button
                    )
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


function selectAnswer(
    selected,
    button
) {

    if (answered)
        return;


    answered = true;


    const question =
        quizData[
            currentQuestion
        ];


    const buttons =
        answersContainer.querySelectorAll(
            "button"
        );


    buttons.forEach(
        (btn, index) => {

            if (
                index ===
                question.correct
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        score++;

        button.classList.add(
            "correct"
        );

        quizResult.textContent =
            "✓ RESPOSTA CORRETA!";

    } else {

        button.classList.add(
            "wrong"
        );

        quizResult.textContent =
            "✕ RESPOSTA INCORRETA.";

    }


    quizScore.textContent =
        `PONTOS: ${score}`;


    nextQuestion.classList.add(
        "show"
    );

}


nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            quizData.length
        ) {

            showQuizEnd();

        } else {

            loadQuestion();

        }

    }
);


function showQuizEnd() {

    questionText.textContent =
        "QUIZ FINALIZADO!";


    answersContainer.innerHTML = "";


    quizResult.innerHTML =
        `VOCÊ MARCOU
        <strong>${score}</strong>
        DE
        <strong>${quizData.length}</strong>
        PONTOS.`;


    questionNumber.textContent =
        "RESULTADO";


    quizProgress.style.width =
        "100%";


    nextQuestion.textContent =
        "REFAZER QUIZ";


    nextQuestion.classList.add(
        "show"
    );


    nextQuestion.onclick =
        () => {

            currentQuestion = 0;

            score = 0;

            quizScore.textContent =
                "PONTOS: 0";

            nextQuestion.textContent =
                "PRÓXIMA QUESTÃO →";

            loadQuestion();

        };

}


loadQuestion();


/* =========================================================
   MINI GAME
========================================================= */

const gameNodes =
    document.querySelectorAll(
        ".game-node"
    );

const gameScore =
    document.getElementById(
        "gameScore"
    );

const gameTime =
    document.getElementById(
        "gameTime"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );

const restartGame =
    document.getElementById(
        "restartGame"
    );


let gameCurrent = 1;

let gamePoints = 0;

let timeLeft = 30;

let gameInterval = null;

let gameStarted = false;


function startGame() {

    gameCurrent = 1;

    gamePoints = 0;

    timeLeft = 30;

    gameStarted = true;


    gameScore.textContent =
        gamePoints;

    gameTime.textContent =
        timeLeft;


    gameNodes.forEach(
        node => {

            node.classList.remove(
                "clicked"
            );

        }
    );


    gameMessage.textContent =
        "CLIQUE NO NÓ 01";


    clearInterval(
        gameInterval
    );


    gameInterval =
        setInterval(
            () => {

                timeLeft--;

                gameTime.textContent =
                    timeLeft;


                if (
                    timeLeft <= 0
                ) {

                    endGame(
                        "TEMPO ESGOTADO!"
                    );

                }

            },
            1000
        );

}


function endGame(message) {

    gameStarted = false;

    clearInterval(
        gameInterval
    );

    gameMessage.textContent =
        `${message} PONTOS: ${gamePoints}`;

}


gameNodes.forEach(
    node => {

        node.addEventListener(
            "click",
            () => {

                if (!gameStarted)
                    return;


                const number =
                    Number(
                        node.dataset.node
                    );


                if (
                    number ===
                    gameCurrent
                ) {

                    node.classList.add(
                        "clicked"
                    );


                    gamePoints += 100;

                    gameScore.textContent =
                        gamePoints;


                    gameCurrent++;


                    if (
                        gameCurrent >
                        5
                    ) {

                        endGame(
                            "✓ CONEXÃO COMPLETA!"
                        );

                    } else {

                        gameMessage.textContent =
                            `AGORA CLIQUE NO NÓ
                            0${gameCurrent}`;

                    }

                } else {

                    gameMessage.textContent =
                        `ERRO! PROCURE O NÓ
                        0${gameCurrent}`;

                    gamePoints =
                        Math.max(
                            0,
                            gamePoints - 50
                        );

                    gameScore.textContent =
                        gamePoints;

                }

            }
        );

    }
);


restartGame.addEventListener(
    "click",
    startGame
);


/* =========================================================
   EFEITO DE HOVER NOS BOTÕES
========================================================= */

const interactiveElements =
    document.querySelectorAll(
        "button, .primary-button, .secondary-button, .nav-link"
    );


interactiveElements.forEach(
    element => {

        element.addEventListener(
            "mouseenter",
            () => {

                if (cursor) {

                    cursor.style.transform =
                        "translate(-50%, -50%) scale(2.5)";

                }

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                if (cursor) {

                    cursor.style.transform =
                        "translate(-50%, -50%) scale(1)";

                }

            }
        );

    }
);


/* =========================================================
   REVEAL AO SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".big-card, .theme-card, .fact-card, .process-step, .gallery-item"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   EFEITO DE CLIQUE NO SITE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const ripple =
            document.createElement(
                "span"
            );


        ripple.style.position =
            "fixed";

        ripple.style.left =
            `${event.clientX}px`;

        ripple.style.top =
            `${event.clientY}px`;

        ripple.style.width =
            "5px";

        ripple.style.height =
            "5px";

        ripple.style.borderRadius =
            "50%";

        ripple.style.border =
            "1px solid #00fff0";

        ripple.style.pointerEvents =
            "none";

        ripple.style.zIndex =
            "9998";

        ripple.style.transform =
            "translate(-50%, -50%)";

        ripple.style.boxShadow =
            "0 0 15px #00fff0";

        document.body.appendChild(
            ripple
        );


        ripple.animate(
            [
                {
                    width: "5px",
                    height: "5px",
                    opacity: 1
                },

                {
                    width: "80px",
                    height: "80px",
                    opacity: 0
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );


        setTimeout(
            () => {

                ripple.remove();

            },
            500
        );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c FIBRA ∞ ",
    "color:#00fff0;font-size:30px;font-weight:bold;"
);

console.log(
    "%c O Futuro da Comunicação ",
    "color:#7a5cff;font-size:16px;"
);

console.log(
    "Projeto escolar — C.E. Padre Claudio Morelli"
);