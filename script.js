/* =========================================================
   O FUTURO DA COMUNICAÇÃO
   C.E. Padre Claudio Morelli
   Script principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURAÇÕES
       ===================================================== */

    const CONFIG = {
        velocidadeLuzVacio: 299792458, // m/s
        indiceRefracaoFibra: 1.468,
        velocidadeFibra: 299792458 / 1.468
    };


    /* =====================================================
       MENU / NAVEGAÇÃO
       ===================================================== */

    const menuLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    menuLinks.forEach(link => {

        link.addEventListener("click", event => {

            const destino = link.getAttribute("href");

            if (!destino || destino === "#") return;

            const elemento = document.querySelector(destino);

            if (!elemento) return;

            event.preventDefault();

            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HEADER AO ROLAR
       ===================================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =====================================================
       EFEITO DE CURSOR
       ===================================================== */

    const cursor = document.querySelector(".cursor");

    if (cursor) {

        document.addEventListener("mousemove", event => {

            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;

        });

        const elementosInterativos = document.querySelectorAll(
            "a, button, .card, .flashcard, .quiz-option, .interactive, input"
        );

        elementosInterativos.forEach(elemento => {

            elemento.addEventListener("mouseenter", () => {
                cursor.classList.add("active");
            });

            elemento.addEventListener("mouseleave", () => {
                cursor.classList.remove("active");
            });

        });

    }


    /* =====================================================
       EFEITO PARALLAX COM O MOUSE
       ===================================================== */

    const elementosParallax = document.querySelectorAll(
        "[data-parallax]"
    );

    document.addEventListener("mousemove", event => {

        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;

        elementosParallax.forEach(elemento => {

            const intensidade =
                Number(elemento.dataset.parallax) || 10;

            elemento.style.transform =
                `translate(${x * intensidade}px, ${y * intensidade}px)`;

        });

    });


    /* =====================================================
       REVEAL AO ENTRAR NA TELA
       ===================================================== */

    const elementosReveal = document.querySelectorAll(
        ".reveal, .fade-in, .section-reveal"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elementosReveal.forEach(elemento => {
            observer.observe(elemento);
        });

    } else {

        elementosReveal.forEach(elemento => {
            elemento.classList.add("visible");
        });

    }


    /* =====================================================
       ANIMAÇÃO DOS NÚMEROS / ESTATÍSTICAS
       ===================================================== */

    function animarNumero(elemento) {

        if (!elemento) return;

        const valorFinal =
            parseFloat(elemento.dataset.value || elemento.textContent);

        if (Number.isNaN(valorFinal)) return;

        const duracao = 1800;

        const inicio = performance.now();

        function atualizar(tempo) {

            const progresso =
                Math.min((tempo - inicio) / duracao, 1);

            const valor =
                Math.floor(progresso * valorFinal);

            elemento.textContent = valor.toLocaleString("pt-BR");

            if (progresso < 1) {
                requestAnimationFrame(atualizar);
            }

        }

        requestAnimationFrame(atualizar);

    }


    const estatisticas =
        document.querySelectorAll("[data-value]");

    if ("IntersectionObserver" in window) {

        const statsObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {

                        entry.target.dataset.animated = "true";

                        animarNumero(entry.target);

                    }

                });

            },
            {
                threshold: 0.7
            }
        );

        estatisticas.forEach(elemento => {
            statsObserver.observe(elemento);
        });

    }


    /* =====================================================
       FLASHCARDS
       ===================================================== */

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


    /* =====================================================
       GERAÇÃO DE PARTÍCULAS
       ===================================================== */

    const particleContainer =
        document.querySelector(".particles");

    if (particleContainer) {

        const quantidade = 45;

        for (let i = 0; i < quantidade; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.animationDuration =
                `${3 + Math.random() * 5}s`;

            particleContainer.appendChild(particle);

        }

    }


    /* =====================================================
       FIO ÓPTICO — ESTAÇÃO 01 → 02
       ===================================================== */

    const botaoFibra =
        document.querySelector("#connectFiber");

    const fiberCanvas =
        document.querySelector("#fiberCanvas");

    const fiberStatus =
        document.querySelector("#fiberStatus");

    const fiberProgress =
        document.querySelector("#fiberProgress");

    const fiberMessage =
        document.querySelector("#fiberMessage");

    let fiberAnimation = null;


    function desenharFibra() {

        if (!fiberCanvas) return;

        const ctx = fiberCanvas.getContext("2d");

        if (!ctx) return;

        const largura = fiberCanvas.width =
            fiberCanvas.clientWidth * window.devicePixelRatio;

        const altura = fiberCanvas.height =
            fiberCanvas.clientHeight * window.devicePixelRatio;

        ctx.scale(
            window.devicePixelRatio,
            window.devicePixelRatio
        );

        const w = fiberCanvas.clientWidth;
        const h = fiberCanvas.clientHeight;

        ctx.clearRect(0, 0, w, h);

        /*
         * Caminho curvo da fibra
         */

        const inicioX = 40;
        const inicioY = h / 2;

        const fimX = w - 40;
        const fimY = h / 2;

        const controle1X = w * 0.30;
        const controle1Y = h * 0.10;

        const controle2X = w * 0.70;
        const controle2Y = h * 0.90;

        /*
         * brilho externo
         */

        ctx.beginPath();

        ctx.moveTo(inicioX, inicioY);

        ctx.bezierCurveTo(
            controle1X,
            controle1Y,
            controle2X,
            controle2Y,
            fimX,
            fimY
        );

        ctx.lineWidth = 8;
        ctx.strokeStyle = "rgba(0, 220, 255, 0.12)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00d9ff";

        ctx.stroke();

        /*
         * núcleo da fibra
         */

        ctx.beginPath();

        ctx.moveTo(inicioX, inicioY);

        ctx.bezierCurveTo(
            controle1X,
            controle1Y,
            controle2X,
            controle2Y,
            fimX,
            fimY
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00eaff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00eaff";

        ctx.stroke();

        ctx.shadowBlur = 0;

        /*
         * pontos 01 e 02
         */

        ctx.beginPath();
        ctx.arc(
            inicioX,
            inicioY,
            7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00eaff";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
            fimX,
            fimY,
            7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00eaff";
        ctx.fill();

    }


    function iniciarFibra() {

        if (!fiberCanvas) return;

        const ctx = fiberCanvas.getContext("2d");

        if (!ctx) return;

        if (fiberAnimation) {
            cancelAnimationFrame(fiberAnimation);
        }

        const w = fiberCanvas.clientWidth;
        const h = fiberCanvas.clientHeight;

        const inicioX = 40;
        const inicioY = h / 2;

        const fimX = w - 40;
        const fimY = h / 2;

        const controle1X = w * 0.30;
        const controle1Y = h * 0.10;

        const controle2X = w * 0.70;
        const controle2Y = h * 0.90;

        let progresso = 0;

        function curva(t) {

            const x =
                Math.pow(1 - t, 3) * inicioX +
                3 * Math.pow(1 - t, 2) * t * controle1X +
                3 * (1 - t) * Math.pow(t, 2) * controle2X +
                Math.pow(t, 3) * fimX;

            const y =
                Math.pow(1 - t, 3) * inicioY +
                3 * Math.pow(1 - t, 2) * t * controle1Y +
                3 * (1 - t) * Math.pow(t, 2) * controle2Y +
                Math.pow(t, 3) * fimY;

            return { x, y };

        }


        function animar() {

            progresso += 0.006;

            if (progresso > 1) {
                progresso = 0;
            }

            desenharFibra();

            const ponto = curva(progresso);

            /*
             * Pacote de luz
             */

            ctx.beginPath();

            ctx.arc(
                ponto.x,
                ponto.y,
                9,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#ffffff";

            ctx.shadowBlur = 25;
            ctx.shadowColor = "#00eaff";

            ctx.fill();

            ctx.shadowBlur = 0;

            /*
             * segundo ponto menor
             */

            const ponto2 =
                curva(Math.max(0, progresso - 0.04));

            ctx.beginPath();

            ctx.arc(
                ponto2.x,
                ponto2.y,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#00aaff";

            ctx.fill();

            fiberAnimation =
                requestAnimationFrame(animar);

        }

        animar();

    }


    if (fiberCanvas) {

        desenharFibra();

        iniciarFibra();

        window.addEventListener(
            "resize",
            desenharFibra
        );

    }


    if (botaoFibra) {

        botaoFibra.addEventListener("click", () => {

            botaoFibra.classList.add("active");

            if (fiberStatus) {
                fiberStatus.textContent =
                    "CONEXÃO ESTABELECIDA";
            }

            if (fiberMessage) {
                fiberMessage.textContent =
                    "Pulso óptico transmitindo dados através da fibra...";
            }

            if (fiberProgress) {

                fiberProgress.style.width = "100%";

            }

            iniciarFibra();

        });

    }


    /* =====================================================
       SIMULADOR DE VELOCIDADE
       ===================================================== */

    const distanceInput =
        document.querySelector("#distanceInput");

    const distanceValue =
        document.querySelector("#distanceValue");

    const calculateButton =
        document.querySelector("#calculateSpeed");

    const speedResult =
        document.querySelector("#speedResult");

    const timeResult =
        document.querySelector("#timeResult");

    const fiberResult =
        document.querySelector("#fiberResult");


    function calcularVelocidadeFibra() {

        /*
         * velocidade = c / n
         */

        return CONFIG.velocidadeFibra;

    }


    function calcularTempo(distanciaKm) {

        const distanciaMetros =
            distanciaKm * 1000;

        const velocidade =
            calcularVelocidadeFibra();

        return distanciaMetros / velocidade;

    }


    function formatarTempo(segundos) {

        if (segundos < 0.001) {

            return `${(segundos * 1000000).toFixed(2)} μs`;

        }

        if (segundos < 1) {

            return `${(segundos * 1000).toFixed(3)} ms`;

        }

        return `${segundos.toFixed(6)} s`;

    }


    function atualizarSimulador() {

        if (!distanceInput) return;

        const distancia =
            parseFloat(distanceInput.value);

        if (Number.isNaN(distancia)) return;

        if (distanceValue) {

            distanceValue.textContent =
                `${distancia.toLocaleString("pt-BR")} km`;

        }

        const velocidade =
            calcularVelocidadeFibra();

        const tempo =
            calcularTempo(distancia);

        if (speedResult) {

            speedResult.textContent =
                `${(velocidade / 1000000).toFixed(2)} milhões de m/s`;

        }

        if (timeResult) {

            timeResult.textContent =
                formatarTempo(tempo);

        }

        if (fiberResult) {

            fiberResult.textContent =
                `Índice de refração: ${CONFIG.indiceRefracaoFibra}`;

        }

    }


    if (distanceInput) {

        distanceInput.addEventListener(
            "input",
            atualizarSimulador
        );

        atualizarSimulador();

    }


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            atualizarSimulador
        );

    }


    /* =====================================================
       MAPA / ROTAS
       ===================================================== */

    const routeButtons =
        document.querySelectorAll("[data-distance]");

    routeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const distancia =
                parseFloat(button.dataset.distance);

            if (
                Number.isNaN(distancia) ||
                !distanceInput
            ) return;

            distanceInput.value = distancia;

            atualizarSimulador();

            /*
             * anima o botão selecionado
             */

            routeButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

        });

    });


    /* =====================================================
       MAPA INTERATIVO — PONTO DE LUZ
       ===================================================== */

    const map =
        document.querySelector(".fiber-map");

    if (map) {

        map.addEventListener("mousemove", event => {

            const rect =
                map.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const luz =
                map.querySelector(".map-light");

            if (luz) {

                luz.style.left = `${x}px`;
                luz.style.top = `${y}px`;

            }

        });

    }


    /* =====================================================
       TERMINAL / CONSOLE FUTURISTA
       ===================================================== */

    const terminal =
        document.querySelector("#terminal");

    if (terminal) {

        const mensagens = [
            "Inicializando sistema óptico...",
            "Verificando núcleo da fibra...",
            "Comprimento de onda: 1550 nm",
            "Índice de refração: 1.468",
            "Calculando velocidade de propagação...",
            "Sistema operacional óptico: ONLINE",
            "Transmissão de dados estabelecida."
        ];

        let index = 0;

        function escreverTerminal() {

            if (index >= mensagens.length) {
                index = 0;
            }

            const linha =
                document.createElement("div");

            linha.className = "terminal-line";

            linha.textContent =
                `> ${mensagens[index]}`;

            terminal.appendChild(linha);

            /*
             * limita quantidade de linhas
             */

            while (terminal.children.length > 8) {
                terminal.removeChild(
                    terminal.firstChild
                );
            }

            index++;

        }

        escreverTerminal();

        setInterval(
            escreverTerminal,
            2200
        );

    }


    /* =====================================================
       QUIZ
       ===================================================== */

    const quiz =
        document.querySelector("#quiz");

    if (quiz) {

        const perguntas = [
            {
                pergunta:
                    "Qual fenômeno permite que a luz percorra a fibra óptica?",
                opcoes: [
                    "Reflexão interna total",
                    "Combustão",
                    "Magnetismo",
                    "Convecção"
                ],
                correta: 0
            },

            {
                pergunta:
                    "Qual é o principal material utilizado no núcleo da fibra óptica?",
                opcoes: [
                    "Cobre",
                    "Vidro ou sílica",
                    "Alumínio",
                    "Ferro"
                ],
                correta: 1
            },

            {
                pergunta:
                    "A fibra óptica transmite informações principalmente através de:",
                opcoes: [
                    "Ondas sonoras",
                    "Pulsos de luz",
                    "Corrente elétrica",
                    "Ondas mecânicas"
                ],
                correta: 1
            },

            {
                pergunta:
                    "A velocidade da luz na fibra é:",
                opcoes: [
                    "Maior que no vácuo",
                    "Igual à do som",
                    "Menor que no vácuo",
                    "Zero"
                ],
                correta: 2
            },

            {
                pergunta:
                    "Qual destas é uma vantagem da fibra óptica?",
                opcoes: [
                    "Alta capacidade de transmissão",
                    "Maior interferência eletromagnética",
                    "Alcance muito pequeno",
                    "Baixa velocidade"
                ],
                correta: 0
            },

            {
                pergunta:
                    "Qual equipamento pode transformar sinais elétricos em sinais ópticos?",
                opcoes: [
                    "Transmissor óptico",
                    "Alto-falante",
                    "Bateria comum",
                    "Microfone"
                ],
                correta: 0
            }
        ];


        let perguntaAtual = 0;
        let pontuacao = 0;


        const questionElement =
            quiz.querySelector(".quiz-question");

        const optionsElement =
            quiz.querySelector(".quiz-options");

        const nextButton =
            quiz.querySelector(".quiz-next");

        const scoreElement =
            quiz.querySelector(".quiz-score");


        function carregarPergunta() {

            const pergunta =
                perguntas[perguntaAtual];

            if (questionElement) {

                questionElement.textContent =
                    pergunta.pergunta;

            }

            if (!optionsElement) return;

            optionsElement.innerHTML = "";

            pergunta.opcoes.forEach(
                (opcao, indice) => {

                    const button =
                        document.createElement("button");

                    button.className =
                        "quiz-option";

                    button.textContent =
                        opcao;

                    button.dataset.index =
                        indice;

                    button.addEventListener(
                        "click",
                        () => {

                            responder(
                                indice,
                                button
                            );

                        }
                    );

                    optionsElement.appendChild(
                        button
                    );

                }
            );

            if (nextButton) {
                nextButton.disabled = true;
            }

        }


        function responder(indice, button) {

            const pergunta =
                perguntas[perguntaAtual];

            const botoes =
                optionsElement.querySelectorAll(
                    ".quiz-option"
                );

            botoes.forEach(botao => {
                botao.disabled = true;
            });


            if (indice === pergunta.correta) {

                pontuacao++;

                button.classList.add("correct");

            } else {

                button.classList.add("wrong");

                botoes[
                    pergunta.correta
                ].classList.add("correct");

            }

            if (nextButton) {
                nextButton.disabled = false;
            }

            if (scoreElement) {

                scoreElement.textContent =
                    `${pontuacao}/${perguntas.length}`;

            }

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    perguntaAtual++;

                    if (
                        perguntaAtual >=
                        perguntas.length
                    ) {

                        mostrarResultado();

                    } else {

                        carregarPergunta();

                    }

                }
            );

        }


        function mostrarResultado() {

            if (questionElement) {

                questionElement.textContent =
                    "QUIZ FINALIZADO";

            }

            if (optionsElement) {

                const porcentagem =
                    Math.round(
                        (pontuacao /
                            perguntas.length) *
                        100
                    );

                let mensagem;

                if (porcentagem >= 80) {

                    mensagem =
                        "Excelente! Você domina os conceitos da fibra óptica.";

                } else if (porcentagem >= 50) {

                    mensagem =
                        "Bom trabalho! Você já conhece os principais conceitos.";

                } else {

                    mensagem =
                        "Continue estudando. A tecnologia óptica tem muito mais a revelar.";

                }

                optionsElement.innerHTML = `
                    <div class="quiz-final">
                        <strong>${pontuacao}/${perguntas.length}</strong>
                        <span>${porcentagem}% de aproveitamento</span>
                        <p>${mensagem}</p>
                        <button class="quiz-restart">
                            REINICIAR QUIZ
                        </button>
                    </div>
                `;

                const restart =
                    optionsElement.querySelector(
                        ".quiz-restart"
                    );

                if (restart) {

                    restart.addEventListener(
                        "click",
                        () => {

                            perguntaAtual = 0;
                            pontuacao = 0;

                            if (scoreElement) {
                                scoreElement.textContent =
                                    "0/6";
                            }

                            carregarPergunta();

                        }
                    );

                }

            }

            if (nextButton) {
                nextButton.style.display = "none";
            }

        }


        carregarPergunta();

    }


    /* =====================================================
       MINI JOGO — CONECTE A FIBRA
       ===================================================== */

    const game =
        document.querySelector("#fiberGame");

    if (game) {

        const canvas =
            game.querySelector("canvas");

        const ctx =
            canvas ? canvas.getContext("2d") : null;

        const startButton =
            game.querySelector(".game-start");

        const score =
            game.querySelector(".game-score");

        if (canvas && ctx) {

            function ajustarCanvas() {

                const dpr =
                    window.devicePixelRatio || 1;

                const rect =
                    canvas.getBoundingClientRect();

                canvas.width =
                    rect.width * dpr;

                canvas.height =
                    rect.height * dpr;

                ctx.setTransform(
                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0
                );

            }

            ajustarCanvas();

            window.addEventListener(
                "resize",
                ajustarCanvas
            );


            let jogoAtivo = false;
            let pontos = 0;
            let fio = [];
            let destino = null;


            function gerarDestino() {

                destino = {

                    x:
                        80 +
                        Math.random() *
                        (canvas.clientWidth - 160),

                    y:
                        60 +
                        Math.random() *
                        (canvas.clientHeight - 120)

                };

            }


            function desenharJogo() {

                const w =
                    canvas.clientWidth;

                const h =
                    canvas.clientHeight;

                ctx.clearRect(
                    0,
                    0,
                    w,
                    h
                );


                /*
                 * grade
                 */

                ctx.strokeStyle =
                    "rgba(0, 200, 255, 0.08)";

                ctx.lineWidth = 1;

                const grid = 40;

                for (
                    let x = 0;
                    x < w;
                    x += grid
                ) {

                    ctx.beginPath();

                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h);

                    ctx.stroke();

                }

                for (
                    let y = 0;
                    y < h;
                    y += grid
                ) {

                    ctx.beginPath();

                    ctx.moveTo(0, y);
                    ctx.lineTo(w, y);

                    ctx.stroke();

                }


                /*
                 * destino
                 */

                if (destino) {

                    ctx.beginPath();

                    ctx.arc(
                        destino.x,
                        destino.y,
                        15,
                        0,
                        Math.PI * 2
                    );

                    ctx.strokeStyle =
                        "#00eaff";

                    ctx.lineWidth = 2;

                    ctx.shadowBlur = 15;
                    ctx.shadowColor =
                        "#00eaff";

                    ctx.stroke();

                    ctx.shadowBlur = 0;

                }


                /*
                 * fio criado pelo jogador
                 */

                if (fio.length > 1) {

                    ctx.beginPath();

                    ctx.moveTo(
                        fio[0].x,
                        fio[0].y
                    );

                    for (
                        let i = 1;
                        i < fio.length;
                        i++
                    ) {

                        ctx.lineTo(
                            fio[i].x,
                            fio[i].y
                        );

                    }

                    ctx.strokeStyle =
                        "#00eaff";

                    ctx.lineWidth = 3;

                    ctx.shadowBlur = 12;

                    ctx.shadowColor =
                        "#00eaff";

                    ctx.stroke();

                    ctx.shadowBlur = 0;

                }


                if (jogoAtivo) {

                    requestAnimationFrame(
                        desenharJogo
                    );

                }

            }


            function iniciarJogo() {

                jogoAtivo = true;

                pontos = 0;

                fio = [];

                gerarDestino();

                if (score) {
                    score.textContent =
                        "0";
                }

                desenharJogo();

            }


            canvas.addEventListener(
                "mousedown",
                event => {

                    if (!jogoAtivo) return;

                    const rect =
                        canvas.getBoundingClientRect();

                    fio = [

                        {
                            x:
                                event.clientX -
                                rect.left,

                            y:
                                event.clientY -
                                rect.top
                        }

                    ];

                    function mover(e) {

                        fio.push({

                            x:
                                e.clientX -
                                rect.left,

                            y:
                                e.clientY -
                                rect.top

                        });

                    }

                    function soltar() {

                        document.removeEventListener(
                            "mousemove",
                            mover
                        );

                        document.removeEventListener(
                            "mouseup",
                            soltar
                        );

                        verificarDestino();

                    }

                    document.addEventListener(
                        "mousemove",
                        mover
                    );

                    document.addEventListener(
                        "mouseup",
                        soltar
                    );

                }
            );


            function verificarDestino() {

                if (!destino || fio.length === 0) {
                    return;
                }

                const ultimo =
                    fio[fio.length - 1];

                const distancia =
                    Math.hypot(
                        ultimo.x - destino.x,
                        ultimo.y - destino.y
                    );


                if (distancia < 40) {

                    pontos++;

                    if (score) {

                        score.textContent =
                            pontos;

                    }

                    fio = [];

                    gerarDestino();

                } else {

                    fio = [];

                }

            }


            if (startButton) {

                startButton.addEventListener(
                    "click",
                    iniciarJogo
                );

            }

        }

    }


    /* =====================================================
       EFEITO DE TILT NOS CARDS
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centroX =
                    rect.width / 2;

                const centroY =
                    rect.height / 2;

                const rotacaoX =
                    ((y - centroY) /
                        centroY) *
                    -6;

                const rotacaoY =
                    ((x - centroX) /
                        centroX) *
                    6;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotacaoX}deg)
                     rotateY(${rotacaoY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       BARRAS DE PROGRESSO
       ===================================================== */

    const barras =
        document.querySelectorAll(
            ".progress-bar[data-progress]"
        );

    if ("IntersectionObserver" in window) {

        const progressObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const barra =
                                entry.target;

                            const progresso =
                                barra.dataset.progress;

                            barra.style.width =
                                `${progresso}%`;

                            progressObserver.unobserve(
                                barra
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        barras.forEach(barra => {

            barra.style.width = "0%";

            progressObserver.observe(
                barra
            );

        });

    }


    /* =====================================================
       BOTÕES DE ABRIR / FECHAR INFORMAÇÕES
       ===================================================== */

    const toggleButtons =
        document.querySelectorAll(
            "[data-toggle]"
        );

    toggleButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const alvo =
                    document.querySelector(
                        button.dataset.toggle
                    );

                if (!alvo) return;

                alvo.classList.toggle(
                    "open"
                );

                button.classList.toggle(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       EFEITO DE DIGITAÇÃO
       ===================================================== */

    const typeElements =
        document.querySelectorAll(
            "[data-type]"
        );

    typeElements.forEach(elemento => {

        const texto =
            elemento.dataset.type ||
            elemento.textContent;

        elemento.textContent = "";

        let index = 0;

        function digitar() {

            if (index >= texto.length) return;

            elemento.textContent +=
                texto[index];

            index++;

            setTimeout(
                digitar,
                45
            );

        }

        digitar();

    });


    /* =====================================================
       EFEITO DE GLITCH
       ===================================================== */

    const glitchElements =
        document.querySelectorAll(
            ".glitch"
        );

    glitchElements.forEach(elemento => {

        setInterval(() => {

            elemento.classList.add(
                "glitch-active"
            );

            setTimeout(() => {

                elemento.classList.remove(
                    "glitch-active"
                );

            }, 120);

        }, 4000);

    });


    /* =====================================================
       DATA / HORA DO SISTEMA
       ===================================================== */

    const clock =
        document.querySelector(
            "#systemClock"
        );

    if (clock) {

        function atualizarRelogio() {

            const agora =
                new Date();

            const horas =
                String(
                    agora.getHours()
                ).padStart(2, "0");

            const minutos =
                String(
                    agora.getMinutes()
                ).padStart(2, "0");

            const segundos =
                String(
                    agora.getSeconds()
                ).padStart(2, "0");

            clock.textContent =
                `${horas}:${minutos}:${segundos}`;

        }

        atualizarRelogio();

        setInterval(
            atualizarRelogio,
            1000
        );

    }


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
       ===================================================== */

    const topButton =
        document.querySelector(
            "#backToTop"
        );

    if (topButton) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    topButton.classList.add(
                        "visible"
                    );

                } else {

                    topButton.classList.remove(
                        "visible"
                    );

                }

            }
        );


        topButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CONSOLE DE INICIALIZAÇÃO
       ===================================================== */

    console.log(
        "%c O FUTURO DA COMUNICAÇÃO ",
        "background:#00141c;color:#00eaff;font-size:18px;font-weight:bold;padding:10px;"
    );

    console.log(
        "%c Sistema de fibra óptica inicializado.",
        "color:#00eaff;font-size:13px;"
    );

    console.log(
        `Velocidade estimada na fibra: ${(
            CONFIG.velocidadeFibra / 1000000
        ).toFixed(2)} milhões de m/s`
    );

});