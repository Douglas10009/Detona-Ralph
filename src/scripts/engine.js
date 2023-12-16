// View e Values
// View - somente variáveis que resultam em algo visual
// Values - somente variáveis que resultam em algo não visual

// Declarando as variáveis assim, fica mais fácil para visualização
const state = {
    // Coisa visuais do jogo
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    // Valores do jogo
    values: {
        gameVelocity: 700,
        dificultLevel: 10,
        result: 0,
        currentTime: 10,
    },
    // Para ações que serão utilizadas ao inicializar o state
    actions: {
        // Conta o tempo restante para acabar
        countDownTimerID: setInterval(countDown, 1000),
        // Coloca o ralph em um lugar diferente (função, velocidadeDoJogo)
        timerId: setInterval(randomSquare, 1000),
    }
}

function countDown() {
    state.values.currentTime --;

    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID)
        clearInterval(state.actions.timerId)
        alert('Game Over! Seu score é de: ' + state.values.result + ' Pontos!!')
    }
}

// Adicionar um quadrado aleatório que vai adicionar o enimigo
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add('enemy');
}

// Função para tocar audio
function playAudio(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play()
}


// Adiciona um listener (quem espera um evento) para verificar se o ralph foi clicado
function addListenerHitBox() {
    state.view.squares.forEach((square) => {

        // Por que usar o mouse down ao invés do clique?
        square.addEventListener('mousedown', () => { 
            if (square.classList.contains('enemy')) {
                state.view.score.innerText ++;
                state.values.result = state.view.score.innerText;
                square.classList.remove('enemy')
                playAudio('hit');

                // TODO - Aumentar o nível de dificuldade do jogo, diminuindo o tempo em que ele vai ficar parado, mas n funciona
                // if (state.view.score.innerText >= state.values.dificultLevel) {
                //     state.values.gameVelocity -= 50;
                //     state.values.dificultLevel += 10;

                //     // A cada 10 pontos feitos, ele reduz o tempo do ralph ficar parado em 50ms
                //     console.log(state.values.gameVelocity);
                //     console.log(state.values.dificultLevel);
                // }
            }
        });

    })
}

// Função principal
function main() {
    addListenerHitBox();
}

main();