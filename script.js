/* =========================================================
   CURSOR FUTURISTA
========================================================= */

const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }

});

function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================================================
   HOVER DO CURSOR
========================================================= */

function activateCursorHover() {

    const hoverElements = document.querySelectorAll(
        "a, button, .concept-card, .subtheme, .flashcard, .application-card, .reference-card"
    );

    hoverElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });

    });

}

activateCursorHover();


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

}


/* =========================================================
   EFEITO CASCATA
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            } else {

                /*
                    Remove a classe quando o elemento sai
                    da tela para que a animação aconteça
                    novamente ao retornar.
                */

                entry.target.classList.remove("visible");

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   PARTÍCULAS
========================================================= */

const canvas = document.getElementById("particles");

let ctx = null;
let particles = [];

if (canvas) {

    ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    function createParticles() {

        particles = [];

        const amount = Math.min(
            130,
            Math.floor(window.innerWidth / 9)
        );

        for (let i = 0; i < amount; i++) {

            particles.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                size: Math.random() * 1.5 + .3,

                speed: Math.random() * .25 + .05,

                alpha: Math.random() * .5 + .1

            });

        }

    }

    createParticles();


    function animateParticles() {

        if (!ctx) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.y -= particle.speed;

            if (particle.y < 0) {
                particle.y = canvas.height;
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
                `rgba(0,234,255,${particle.alpha})`;

            ctx.fill();

        });

        requestAnimationFrame(animateParticles);

    }

    animateParticles();

}


/* =========================================================
   FLASHCARDS
========================================================= */

const flashcards =
    document.querySelectorAll(".flashcard");

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


/* =========================================================
   NETWORK LAB
========================================================= */

const networkMap =
    document.getElementById("fiberMap");

const fiberLines =
    document.getElementById("fiberLines");

const networkNodes =
    document.querySelectorAll(".network-node");

const networkMessage =
    document.getElementById("networkMessage");

const nextConnection =
    document.getElementById("nextConnection");

const resetNetwork =
    document.getElementById("resetNetwork");

const dataOrigin =
    document.getElementById("dataOrigin");

const dataDestination =
    document.getElementById("dataDestination");

const dataDistance =
    document.getElementById("dataDistance");

const dataTravelTime =
    document.getElementById("dataTravelTime");

const networkLatency =
    document.getElementById("networkLatency");

const travelingLight =
    document.getElementById("travelingLight");


/* =========================================================
   DADOS DAS CIDADES
========================================================= */

const networkData = {

    1: {
        name: "Curitiba",
        country: "Brasil",
        flag: "🇧🇷",
        x: 25,
        y: 68,
        lat: -25.4284,
        lon: -49.2733
    },

    2: {
        name: "Nova York",
        country: "Estados Unidos",
        flag: "🇺🇸",
        x: 44,
        y: 32,
        lat: 40.7128,
        lon: -74.0060
    },

    3: {
        name: "Paris",
        country: "França",
        flag: "🇫🇷",
        x: 55,
        y: 31,
        lat: 48.8566,
        lon: 2.3522
    },

    4: {
        name: "Tóquio",
        country: "Japão",
        flag: "🇯🇵",
        x: 85,
        y: 40,
        lat: 35.6762,
        lon: 139.6503
    },

    5: {
        name: "Moscou",
        country: "Rússia",
        flag: "🇷🇺",
        x: 69,
        y: 22,
        lat: 55.7558,
        lon: 37.6173
    },

    6: {
        name: "Londres",
        country: "Reino Unido",
        flag: "🇬🇧",
        x: 53,
        y: 26,
        lat: 51.5074,
        lon: -0.1278
    }

};


/* =========================================================
   ESTADO DA REDE
========================================================= */

let selectedNode = null;
let connections = [];


/* =========================================================
   DISTÂNCIA — HAVERSINE
========================================================= */

function calculateDistance(pointA, pointB) {

    const earthRadius = 6371;

    const cityA = networkData[pointA];
    const cityB = networkData[pointB];

    if (!cityA || !cityB) {
        return 0;
    }

    const lat1 =
        cityA.lat * Math.PI / 180;

    const lat2 =
        cityB.lat * Math.PI / 180;

    const deltaLat =
        (cityB.lat - cityA.lat) *
        Math.PI / 180;

    const deltaLon =
        (cityB.lon - cityA.lon) *
        Math.PI / 180;

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadius * c;

}


/* =========================================================
   TEMPO DE PROPAGAÇÃO
========================================================= */

function calculateTravelTime(distanceKm) {

    const fiberSpeed = 200000;

    const seconds =
        distanceKm / fiberSpeed;

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
   FORMATAR TEMPO
========================================================= */

function formatTravelTime(time) {

    if (time.nanoseconds < 1000) {

        return (
            time.nanoseconds.toFixed(2) +
            " ns"
        );

    }

    if (time.microseconds < 1000) {

        return (
            time.microseconds.toFixed(2) +
            " μs"
        );

    }

    if (time.milliseconds < 1000) {

        return (
            time.milliseconds.toFixed(4) +
            " ms"
        );

    }

    return (
        time.seconds.toFixed(3) +
        " s"
    );

}


/* =========================================================
   CRIAR CONEXÃO
========================================================= */

function createFiberConnection(from, to) {

    if (!networkMap || !fiberLines) {
        return null;
    }

    const fromData = networkData[from];
    const toData = networkData[to];

    if (!fromData || !toData) {
        return null;
    }

    const x1 = fromData.x * 10;
    const y1 = fromData.y * 6.5;

    const x2 = toData.x * 10;
    const y2 = toData.y * 6.5;

    const middleX = (x1 + x2) / 2;

    const distanceVisual =
        Math.abs(y2 - y1);

    const middleY =
        Math.min(y1, y2) -
        Math.max(
            45,
            Math.min(
                100,
                distanceVisual * .25
            )
        );

    const pathData = `
        M ${x1} ${y1}
        Q ${middleX} ${middleY}
        ${x2} ${y2}
    `;


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


    let length = 1000;

    try {

        length =
            fiber.getTotalLength();

    } catch {

        length = 1000;

    }


    fiber.style.strokeDasharray =
        `${length} ${length}`;

    fiber.style.strokeDashoffset =
        length;


    requestAnimationFrame(() => {

        fiber.style.transition =
            "stroke-dashoffset 1.2s ease";

        fiber.style.strokeDashoffset =
            "0";

    });


    return {
        path: fiber,
        from,
        to
    };

}


/* =========================================================
   PULSO DE LUZ
========================================================= */

function animateLight(connection) {

    if (
        !connection ||
        !connection.path ||
        !travelingLight ||
        !networkMap
    ) {
        return;
    }

    const path = connection.path;

    let totalLength;

    try {

        totalLength =
            path.getTotalLength();

    } catch {

        return;

    }

    const startTime =
        performance.now();

    const duration = 1800;

    travelingLight.style.opacity = "1";


    function animate(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            progress *
            progress *
            (3 - 2 * progress);

        const point =
            path.getPointAtLength(
                totalLength * eased
            );

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


        if (progress < 1) {

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

function updateTechnicalPanel(from, to) {

    const distance =
        calculateDistance(from, to);

    const time =
        calculateTravelTime(distance);


    if (dataOrigin) {

        dataOrigin.textContent =
            `${networkData[from].flag} ${networkData[from].name}`;

    }


    if (dataDestination) {

        dataDestination.textContent =
            `${networkData[to].flag} ${networkData[to].name}`;

    }


    if (dataDistance) {

        dataDistance.textContent =
            `${distance.toFixed(1)} km`;

    }


    if (dataTravelTime) {

        dataTravelTime.textContent =
            formatTravelTime(time);

    }


    if (networkLatency) {

        networkLatency.textContent =
            `${time.nanoseconds.toFixed(2)} ns`;

    }

}


/* =========================================================
   CONECTAR CIDADES
========================================================= */

function connectNodes(from, to) {

    if (from === to) {
        return;
    }


    const alreadyConnected =
        connections.some(connection =>

            (
                connection.from === from &&
                connection.to === to
            ) ||

            (
                connection.from === to &&
                connection.to === from
            )

        );


    if (alreadyConnected) {

        if (networkMessage) {

            networkMessage.textContent =
                `ROTA ${networkData[from].name.toUpperCase()} ↔ ${networkData[to].name.toUpperCase()} JÁ ESTÁ ATIVA`;

        }

        return;

    }


    const connection =
        createFiberConnection(
            from,
            to
        );


    if (!connection) {
        return;
    }


    connections.push(connection);


    const fromNode =
        document.querySelector(
            `[data-node="${from}"]`
        );

    const toNode =
        document.querySelector(
            `[data-node="${to}"]`
        );


    if (fromNode) {
        fromNode.classList.add("connected");
    }

    if (toNode) {
        toNode.classList.add("connected");
    }


    updateTechnicalPanel(
        from,
        to
    );


    animateLight(
        connection
    );


    if (networkMessage) {

        networkMessage.textContent =
            `${networkData[from].flag} ${networkData[from].name.toUpperCase()} → ${networkData[to].flag} ${networkData[to].name.toUpperCase()} | PULSO ÓPTICO TRANSMITIDO`;

    }


    if (nextConnection) {

        nextConnection.textContent =
            `${networkData[to].name} → ?`;

    }

}


/* =========================================================
   CLIQUE NOS NÓS
========================================================= */

networkNodes.forEach(node => {

    node.addEventListener("click", () => {

        const number =
            Number(node.dataset.node);


        if (!networkData[number]) {
            return;
        }


        if (selectedNode === null) {

            selectedNode = number;


            networkNodes.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            node.classList.add(
                "selected"
            );


            if (networkMessage) {

                networkMessage.textContent =
                    `${networkData[number].flag} ${networkData[number].name.toUpperCase()} SELECIONADA — ESCOLHA O DESTINO`;

            }


            if (nextConnection) {

                nextConnection.textContent =
                    `${networkData[number].name} → ?`;

            }


            return;

        }


        if (number === selectedNode) {

            node.classList.remove(
                "selected"
            );

            selectedNode = null;


            if (networkMessage) {

                networkMessage.textContent =
                    "SELECIONE UMA CIDADE DE ORIGEM";

            }


            if (nextConnection) {

                nextConnection.textContent =
                    "ESCOLHA QUALQUER PONTO";

            }


            return;

        }


        const origin =
            selectedNode;

        const destination =
            number;


        connectNodes(
            origin,
            destination
        );


        networkNodes.forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


        node.classList.add(
            "selected"
        );


        selectedNode =
            destination;

    });

});


/* =========================================================
   RESET DA REDE
========================================================= */

if (resetNetwork) {

    resetNetwork.addEventListener(
        "click",
        () => {

            selectedNode = null;
            connections = [];


            if (fiberLines) {
                fiberLines.innerHTML = "";
            }


            networkNodes.forEach(node => {

                node.classList.remove(
                    "selected",
                    "connected"
                );

            });


            if (dataOrigin) {
                dataOrigin.textContent = "—";
            }

            if (dataDestination) {
                dataDestination.textContent = "—";
            }

            if (dataDistance) {
                dataDistance.textContent = "—";
            }

            if (dataTravelTime) {
                dataTravelTime.textContent = "—";
            }

            if (networkLatency) {
                networkLatency.textContent = "0.00 ns";
            }

            if (nextConnection) {
                nextConnection.textContent =
                    "ESCOLHA QUALQUER PONTO";
            }

            if (networkMessage) {
                networkMessage.textContent =
                    "CLIQUE EM QUALQUER PONTO PARA INICIAR";
            }

            if (travelingLight) {
                travelingLight.style.opacity = "0";
            }

        }
    );

}


/* =========================================================
   RECONSTRUIR ROTAS NO RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            connections.length === 0 ||
            !fiberLines
        ) {
            return;
        }


        const savedConnections =
            connections.map(connection => ({
                from: connection.from,
                to: connection.to
            }));


        fiberLines.innerHTML = "";

        connections = [];


        savedConnections.forEach(connection => {

            const newConnection =
                createFiberConnection(
                    connection.from,
                    connection.to
                );


            if (newConnection) {

                connections.push(
                    newConnection
                );

            }

        });

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

        answer: 1,

        explanation:
            "A fibra óptica transmite informações utilizando sinais luminosos."
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

        answer: 2,

        explanation:
            "A velocidade da luz no vácuo é aproximadamente 299.792 km/s."
    },

    {
        question:
            "O que ajuda a manter a luz confinada no núcleo da fibra?",

        options: [
            "Reflexão interna total",
            "Eletricidade",
            "Magnetismo",
            "Calor"
        ],

        answer: 0,

        explanation:
            "A reflexão interna total permite que a luz permaneça guiada no núcleo."
    },

    {
        question:
            "Qual material é normalmente utilizado no núcleo das fibras ópticas convencionais?",

        options: [
            "Ferro",
            "Cobre",
            "Vidro",
            "Alumínio"
        ],

        answer: 2,

        explanation:
            "Fibras ópticas convencionais utilizam principalmente vidro de alta pureza."
    },

    {
        question:
            "Por que a fibra óptica é importante para a internet moderna?",

        options: [
            "Porque oferece grande capacidade de transmissão",
            "Porque utiliza ondas sonoras",
            "Porque funciona apenas em curtas distâncias",
            "Porque não precisa de equipamentos"
        ],

        answer: 0,

        explanation:
            "A fibra possui grande capacidade e baixa perda de sinal, sendo essencial para redes modernas."
    }

];


let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;


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

    if (
        !quizQuestion ||
        !quizOptions ||
        !quizFeedback ||
        !quizNext ||
        !quizProgress ||
        !quizBar
    ) {
        return;
    }


    const question =
        quizQuestions[currentQuestion];


    quizAnswered = false;


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    quizFeedback.textContent =
        "";


    quizNext.style.display =
        "none";


    quizNext.innerHTML =
        "PRÓXIMA →";


    quizProgress.textContent =
        `${String(
            currentQuestion + 1
        ).padStart(2, "0")} / ${
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
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.type =
                "button";


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

    if (quizAnswered) {
        return;
    }


    quizAnswered = true;


    const question =
        quizQuestions[currentQuestion];


    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    options.forEach(button => {

        button.disabled = true;

    });


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


        if (
            options[
                question.answer
            ]
        ) {

            options[
                question.answer
            ].classList.add(
                "correct"
            );

        }


        quizFeedback.textContent =
            "✕ INCORRETO — " +
            question.explanation;

    }


    quizNext.style.display =
        "inline-flex";

}


if (quizNext) {

    quizNext.addEventListener(
        "click",
        () => {

            if (
                currentQuestion >=
                quizQuestions.length - 1
            ) {

                showQuizResult();

                return;

            }


            currentQuestion++;

            loadQuizQuestion();

        }
    );

}


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

    currentQuestion = 0;
    quizScore = 0;
    quizAnswered = false;


    quizNext.onclick = null;


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
            !heroVisual ||
            window.innerWidth < 800
        ) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            ) * 12;


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            ) * 12;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* =========================================================
   SISTEMA
========================================================= */

console.log(
    "%c FIBER OPTIC SYSTEM ONLINE ",
    "background:#001820;color:#00eaff;font-size:14px;font-weight:bold;padding:8px;"
);

console.log(
    "Pesquisa sobre fibra óptica carregada."
);

console.log(
    "Mapa mundial carregado."
);

console.log(
    "Sistema de animação em cascata ativado."
);

console.log(
    "Rede internacional pronta."
);