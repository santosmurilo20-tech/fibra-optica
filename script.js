/* =========================================================
   CURSOR FUTURISTA
========================================================= */

const cursor =
    document.getElementById(
        "cursor"
    );

const cursorRing =
    document.getElementById(
        "cursorRing"
    );


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        cursor.style.left =
            `${mouseX}px`;

        cursor.style.top =
            `${mouseY}px`;

    }
);


function animateCursor() {

    ringX +=
        (
            mouseX -
            ringX
        ) * .15;

    ringY +=
        (
            mouseY -
            ringY
        ) * .15;


    cursorRing.style.left =
        `${ringX}px`;

    cursorRing.style.top =
        `${ringY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   HOVER DO CURSOR
========================================================= */

const hoverElements =
    document.querySelectorAll(
        "a, button, .concept-card, .subtheme, .flashcard, .gallery-item"
    );


hoverElements.forEach(
    element => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


mobileMenu
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


/* =========================================================
   PARTÍCULAS
========================================================= */

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas.getContext(
        "2d"
    );


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];


    const amount =
        Math.min(
            120,
            Math.floor(
                window.innerWidth / 10
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                1.5 +
                .3,

            speed:
                Math.random() *
                .25 +
                .05,

            alpha:
                Math.random() *
                .5 +
                .1

        });

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

            particle.y -=
                particle.speed;


            if (
                particle.y < 0
            ) {

                particle.y =
                    canvas.height;

            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(0,246,255,${particle.alpha})`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =========================================================
   FLASHCARDS
========================================================= */

const flashcards =
    document.querySelectorAll(
        ".flashcard"
    );


flashcards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "flipped"
                );

            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter" ||

                    event.key ===
                    " "
                ) {

                    event.preventDefault();

                    card.classList.toggle(
                        "flipped"
                    );

                }

            }
        );

    }
);


/* =========================================================
   NETWORK LAB
========================================================= */

const networkMap =
    document.getElementById(
        "fiberMap"
    );

const fiberLines =
    document.getElementById(
        "fiberLines"
    );

const networkNodes =
    document.querySelectorAll(
        ".network-node"
    );

const networkMessage =
    document.getElementById(
        "networkMessage"
    );

const nextConnection =
    document.getElementById(
        "nextConnection"
    );

const resetNetwork =
    document.getElementById(
        "resetNetwork"
    );

const dataOrigin =
    document.getElementById(
        "dataOrigin"
    );

const dataDestination =
    document.getElementById(
        "dataDestination"
    );

const dataDistance =
    document.getElementById(
        "dataDistance"
    );

const dataTravelTime =
    document.getElementById(
        "dataTravelTime"
    );

const networkLatency =
    document.getElementById(
        "networkLatency"
    );

const travelingLight =
    document.getElementById(
        "travelingLight"
    );


/* =========================================================
   DADOS DAS CIDADES
========================================================= */

const networkData = {

    1: {

        name:
            "São Paulo",

        x:
            46,

        y:
            64

    },


    2: {

        name:
            "Rio de Janeiro",

        x:
            55,

        y:
            60

    },


    3: {

        name:
            "Belo Horizonte",

        x:
            52,

        y:
            49

    },


    4: {

        name:
            "Brasília",

        x:
            44,

        y:
            38

    },


    5: {

        name:
            "Salvador",

        x:
            67,

        y:
            38

    },


    6: {

        name:
            "Recife",

        x:
            70,

        y:
            25

    }

};


/* =========================================================
   COORDENADAS
========================================================= */

const cityCoordinates = {

    1: {

        lat:
            -23.5505,

        lon:
            -46.6333

    },


    2: {

        lat:
            -22.9068,

        lon:
            -43.1729

    },


    3: {

        lat:
            -19.9167,

        lon:
            -43.9345

    },


    4: {

        lat:
            -15.7975,

        lon:
            -47.8919

    },


    5: {

        lat:
            -12.9777,

        lon:
            -38.5016

    },


    6: {

        lat:
            -8.0476,

        lon:
            -34.8770

    }

};


/* =========================================================
   ESTADO
========================================================= */

let selectedNode =
    null;

let connections =
    [];


/* =========================================================
   DISTÂNCIA
========================================================= */

function calculateDistance(
    pointA,
    pointB
) {

    const earthRadius =
        6371;


    const lat1 =
        cityCoordinates[pointA].lat *
        Math.PI /
        180;


    const lat2 =
        cityCoordinates[pointB].lat *
        Math.PI /
        180;


    const deltaLat =
        (
            cityCoordinates[pointB].lat -
            cityCoordinates[pointA].lat
        ) *
        Math.PI /
        180;


    const deltaLon =
        (
            cityCoordinates[pointB].lon -
            cityCoordinates[pointA].lon
        ) *
        Math.PI /
        180;


    const a =
        Math.sin(
            deltaLat / 2
        ) ** 2 +

        Math.cos(lat1) *
        Math.cos(lat2) *

        Math.sin(
            deltaLon / 2
        ) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return (
        earthRadius *
        c
    );

}


/* =========================================================
   TEMPO DE PROPAGAÇÃO
========================================================= */

function calculateTravelTime(
    distanceKm
) {

    const fiberSpeed =
        200000;


    const seconds =
        distanceKm /
        fiberSpeed;


    return {

        seconds,

        milliseconds:
            seconds * 1000,

        microseconds:
            seconds * 1000000,

        nanoseconds:
            seconds * 1000000000

    };

}


/* =========================================================
   FORMATA TEMPO
========================================================= */

function formatTravelTime(
    time
) {

    if (
        time.nanoseconds < 1000
    ) {

        return (
            time.nanoseconds
                .toFixed(2) +
            " ns"
        );

    }


    if (
        time.microseconds < 1000
    ) {

        return (
            time.microseconds
                .toFixed(2) +
            " μs"
        );

    }


    return (
        time.milliseconds
            .toFixed(4) +
        " ms"
    );

}


/* =========================================================
   CRIAR FIBRA
========================================================= */

function createFiberConnection(
    from,
    to
) {

    const fromData =
        networkData[from];

    const toData =
        networkData[to];


    const width =
        networkMap.clientWidth;

    const height =
        networkMap.clientHeight;


    /*
       Como o SVG utiliza viewBox
       1000 x 650, usamos o mesmo
       sistema de coordenadas.
    */

    const x1 =
        fromData.x *
        10;

    const y1 =
        fromData.y *
        6.5;


    const x2 =
        toData.x *
        10;

    const y2 =
        toData.y *
        6.5;


    const middleX =
        (x1 + x2) / 2;


    const middleY =
        Math.min(
            y1,
            y2
        ) - 60;


    const pathData = `
        M ${x1} ${y1}
        Q ${middleX} ${middleY}
        ${x2} ${y2}
    `;


    /* ================================================
       CAMADA EXTERNA DA FIBRA
    ================================================ */

    const backgroundPath =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    backgroundPath.setAttribute(
        "d",
        pathData
    );


    backgroundPath.classList.add(
        "fiber-path-bg"
    );


    fiberLines.appendChild(
        backgroundPath
    );


    /* ================================================
       FIO LUMINOSO
    ================================================ */

    const fiber =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    fiber.setAttribute(
        "d",
        pathData
    );


    fiber.classList.add(
        "fiber-path"
    );


    fiberLines.appendChild(
        fiber
    );


    /*
       Animação de entrada do fio.
    */

    const length =
        fiber.getTotalLength();


    fiber.style.strokeDasharray =
        `${length} ${length}`;

    fiber.style.strokeDashoffset =
        length;


    requestAnimationFrame(
        () => {

            fiber.style.transition =
                "stroke-dashoffset 1.2s ease";

            fiber.style.strokeDashoffset =
                "0";

        }
    );


    return {

        path:
            fiber,

        from,
        to

    };

}


/* =========================================================
   ANIMAR LUZ
========================================================= */

function animateLight(
    connection
) {

    const path =
        connection.path;


    const totalLength =
        path.getTotalLength();


    const startTime =
        performance.now();


    const duration =
        1800;


    travelingLight.style.opacity =
        "1";


    function animate(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        /*
           Ease in/out.
        */

        const eased =
            progress *
            progress *
            (
                3 -
                2 *
                progress
            );


        const point =
            path.getPointAtLength(
                totalLength *
                eased
            );


        /*
           O SVG usa viewBox 1000x650.
           Convertendo para pixels reais.
        */

        const x =
            point.x *
            networkMap.clientWidth /
            1000;


        const y =
            point.y *
            networkMap.clientHeight /
            650;


        travelingLight.style.left =
            `${x}px`;


        travelingLight.style.top =
            `${y}px`;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                animate
            );

        } else {

            travelingLight.style.opacity =
                "0";

        }

    }


    requestAnimationFrame(
        animate
    );

}


/* =========================================================
   PAINEL TÉCNICO
========================================================= */

function updateTechnicalPanel(
    from,
    to
) {

    const distance =
        calculateDistance(
            from,
            to
        );


    const time =
        calculateTravelTime(
            distance
        );


    dataOrigin.textContent =
        networkData[from].name;


    dataDestination.textContent =
        networkData[to].name;


    dataDistance.textContent =
        `${distance.toFixed(1)} km`;


    dataTravelTime.textContent =
        formatTravelTime(
            time
        );


    networkLatency.textContent =
        `${time.nanoseconds.toFixed(2)} ns`;

}


/* =========================================================
   CONECTAR
========================================================= */

function connectNodes(
    from,
    to
) {

    const connection =
        createFiberConnection(
            from,
            to
        );


    connections.push(
        connection
    );


    document
        .querySelector(
            `[data-node="${from}"]`
        )
        .classList.add(
            "connected"
        );


    document
        .querySelector(
            `[data-node="${to}"]`
        )
        .classList.add(
            "connected"
        );


    updateTechnicalPanel(
        from,
        to
    );


    animateLight(
        connection
    );


    networkMessage.textContent =
        `${networkData[from].name}
        → ${networkData[to].name}
        | PULSO ÓPTICO TRANSMITIDO`;


    if (
        to < 6
    ) {

        nextConnection.textContent =
            `${String(to)
                .padStart(2,"0")}
            →
            ${String(to + 1)
                .padStart(2,"0")}`;

    } else {

        nextConnection.textContent =
            "REDE COMPLETA";


        networkMessage.textContent =
            "✓ REDE ÓPTICA COMPLETAMENTE CONECTADA";

    }

}


/* =========================================================
   CLIQUES DOS NÓS
========================================================= */

networkNodes.forEach(
    node => {

        node.addEventListener(
            "click",
            () => {

                const number =
                    Number(
                        node.dataset.node
                    );


                /*
                   Primeiro ponto precisa ser 01.
                */

                if (
                    selectedNode ===
                    null
                ) {

                    if (
                        number !== 1
                    ) {

                        networkMessage.textContent =
                            "ERRO: INICIE PELO PONTO 01";

                        return;

                    }


                    selectedNode =
                        1;


                    node.classList.add(
                        "selected"
                    );


                    networkMessage.textContent =
                        "PONTO 01 ATIVADO — SELECIONE O PONTO 02";

                    return;

                }


                /*
                   Não permite repetir.
                */

                if (
                    number ===
                    selectedNode
                ) {

                    return;

                }


                /*
                   Apenas sequência.
                */

                if (
                    number !==
                    selectedNode + 1
                ) {

                    networkMessage.textContent =
                        `SEQUÊNCIA INCORRETA — PRÓXIMO PONTO: ${String(
                            selectedNode + 1
                        ).padStart(2,"0")}`;

                    return;

                }


                /*
                   Cria conexão.
                */

                connectNodes(
                    selectedNode,
                    number
                );


                networkNodes.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                node.classList.add(
                    "selected"
                );


                selectedNode =
                    number;

            }
        );

    }
);


/* =========================================================
   RESET DA REDE
========================================================= */

resetNetwork.addEventListener(
    "click",
    () => {

        selectedNode =
            null;

        connections =
            [];


        fiberLines.innerHTML =
            "";


        networkNodes.forEach(
            node => {

                node.classList.remove(
                    "selected",
                    "connected"
                );

            }
        );


        dataOrigin.textContent =
            "—";


        dataDestination.textContent =
            "—";


        dataDistance.textContent =
            "—";


        dataTravelTime.textContent =
            "—";


        networkLatency.textContent =
            "0.00 ns";


        nextConnection.textContent =
            "01 → 02";


        networkMessage.textContent =
            "CLIQUE NO PONTO 01 PARA INICIAR";

    }
);


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {

        question:
            "Qual é o principal meio utilizado pela fibra óptica para transportar informações?",

        options: [

            "Corrente elétrica",

            "Pulsos de luz",

            "Ondas sonoras",

            "Campo magnético"

        ],

        answer:
            1,

        explanation:
            "A fibra óptica transmite informações através de sinais luminosos."

    },


    {

        question:
            "Qual é aproximadamente a velocidade da luz no vácuo?",

        options: [

            "3.000 km/s",

            "30.000 km/s",

            "299.792 km/s",

            "999.999 km/s"

        ],

        answer:
            2,

        explanation:
            "A velocidade da luz no vácuo é aproximadamente 299.792 km/s."

    },


    {

        question:
            "O que mantém a luz confinada dentro do núcleo da fibra?",

        options: [

            "Reflexão interna total",

            "Eletricidade",

            "Magnetismo",

            "Calor"

        ],

        answer:
            0,

        explanation:
            "A reflexão interna total mantém o sinal luminoso dentro do núcleo."

    },


    {

        question:
            "Qual material é normalmente utilizado no núcleo de fibras ópticas convencionais?",

        options: [

            "Ferro",

            "Cobre",

            "Vidro",

            "Alumínio"

        ],

        answer:
            2,

        explanation:
            "Fibras ópticas convencionais utilizam principalmente vidro de alta pureza."

    },


    {

        question:
            "Por que a fibra é importante para a internet moderna?",

        options: [

            "Porque transmite grandes quantidades de dados rapidamente",

            "Porque utiliza ondas sonoras",

            "Porque funciona apenas em curtas distâncias",

            "Porque não precisa de equipamentos"

        ],

        answer:
            0,

        explanation:
            "A fibra oferece alta capacidade e baixa perda, sendo fundamental para redes modernas."

    }

];


let currentQuestion =
    0;

let quizScore =
    0;

let quizAnswered =
    false;


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

const quizNext =
    document.getElementById(
        "quizNext"
    );

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizBar =
    document.getElementById(
        "quizBar"
    );


function loadQuizQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    quizAnswered =
        false;


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    quizFeedback.textContent =
        "";


    quizNext.style.display =
        "none";


    quizProgress.textContent =
        `${String(
            currentQuestion + 1
        ).padStart(2,"0")} / ${
            quizQuestions.length
        }`;


    quizBar.style.width =
        `${
            (
                (
                    currentQuestion + 1
                ) /
                quizQuestions.length
            ) * 100
        }%`;


    question.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    answerQuestion(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function answerQuestion(
    selected,
    selectedButton
) {

    if (
        quizAnswered
    ) {

        return;

    }


    quizAnswered =
        true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    options.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    if (
        selected ===
        question.answer
    ) {

        selectedButton.classList.add(
            "correct"
        );


        quizScore++;


        quizFeedback.textContent =
            "✓ CORRETO — " +
            question.explanation;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        options[
            question.answer
        ].classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "✕ INCORRETO — " +
            question.explanation;

    }


    quizNext.style.display =
        "inline-flex";

}


quizNext.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showQuizResult();

            return;

        }


        loadQuizQuestion();

    }
);


function showQuizResult() {

    quizProgress.textContent =
        "RESULTADO";


    quizBar.style.width =
        "100%";


    quizQuestion.textContent =
        `VOCÊ ACERTOU ${quizScore} DE ${quizQuestions.length} QUESTÕES.`;


    quizOptions.innerHTML =
        "";


    quizFeedback.textContent =
        quizScore >= 4
            ? "EXCELENTE! Você domina os conceitos básicos de fibra óptica."
            : quizScore >= 3
                ? "MUITO BOM! Você já conhece bastante sobre o tema."
                : "CONTINUE ESTUDANDO! Explore novamente a pesquisa.";


    quizNext.style.display =
        "inline-flex";


    quizNext.innerHTML =
        "REFAZER QUIZ →";


    quizNext.onclick =
        restartQuiz;

}


function restartQuiz() {

    currentQuestion =
        0;

    quizScore =
        0;

    quizNext.innerHTML =
        "PRÓXIMA →";


    quizNext.onclick =
        null;


    quizNext.addEventListener(
        "click",
        () => {

            currentQuestion++;

        },
        {
            once:
                true
        }
    );


    loadQuizQuestion();

}


loadQuizQuestion();


/* =========================================================
   PARALLAXE DO HERO
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (
            !heroVisual
        ) {

            return;

        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            ) * 20;


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            ) * 20;


        heroVisual.style.transform =
            `translate(
                ${x}px,
                ${y}px
            )`;

    }
);


/* =========================================================
   RECONSTRUIR FIBRAS NO RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            connections.length === 0
        ) {

            return;

        }


        const savedConnections =
            connections.map(
                connection => ({

                    from:
                        connection.from,

                    to:
                        connection.to

                })
            );


        fiberLines.innerHTML =
            "";


        connections =
            [];


        savedConnections.forEach(
            connection => {

                const newConnection =
                    createFiberConnection(
                        connection.from,
                        connection.to
                    );


                connections.push(
                    newConnection
                );

            }
        );

    }
);