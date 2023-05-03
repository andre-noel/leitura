// Globais
let qtdPalavras = 0;
let nPalavra = 0;
let tm;
let texto;

const buttonPlay = document.getElementById('play');
const buttonPause = document.getElementById('pause');
const buttonStop = document.getElementById('stop');
const mensagem = document.querySelector('#dinamica span');
const progresso = document.querySelector('#progresso .valor');
const done = document.querySelector('#progresso .done');
const textEntry = document.getElementById('texto');
const tempo = document.getElementById('tempo');
const speed = document.getElementById('speed');

const clearText = (text) => 
  text.trim()
    .replace(/^w/g, " ")
    .replace(/\s/g, " ")
    .replace(/  /g, " ")
    .split(" ");

const msgSpeed = (nWords, speed) =>
  `${nWords} palavras em ${((speed * nWords)/1000)} segundos`;

const updateProgress = (progress) => {
  progresso.innerHTML = `${progress}%`;
  done.style.width = `${progress}%`;
};

const playReading = () => {
  buttonPlay.disabled = true;
  buttonPause.disabled = false;
  buttonStop.disabled = false;
        
  let velocidade = speed.value;
  
  if (sessionStorage.getItem('qtdPalavras') != null) {
      qtdPalavras = sessionStorage.getItem('qtdPalavras');
      nPalavra = sessionStorage.getItem('nPalavra');
      updateProgress(Math.floor((nPalavra/qtdPalavras)*100));
      sessionStorage.removeItem('nPalavra');
      sessionStorage.removeItem('qtdPalavras');
  } else {
      texto = clearText(textEntry.value);
      qtdPalavras = texto.length;
      nPalavra = 0;
      updateProgress(0);
  }

  tempo.innerHTML = msgSpeed(qtdPalavras, velocidade);

  mensagem.classList.add('prepare');
  mensagem.innerHTML = 'Prepare-se!';
  setTimeout(() => {
    mensagem.classList.remove('prepare');
    tm = setInterval(function(){
      escreve();
    }, velocidade);
  }, 800);
  
  document.body.style.scrollTop = 0;
};

const pauseReading = () => {
  sessionStorage.setItem('nPalavra', nPalavra);
  sessionStorage.setItem('qtdPalavras', qtdPalavras);
  clearInterval(tm);
  buttonPlay.disabled = false;
  buttonPause.disabled = true;
};

const stopReading = () => {
  buttonPlay.disabled = false;
  buttonPause.disabled = true;
  buttonStop.disabled = true;
  sessionStorage.removeItem('nPalavra');
  sessionStorage.removeItem('qtdPalavras');
  clearInterval(tm);
};

const escreve = () => {
  if (nPalavra >= texto.length) {
    stopReading();
    return true;
  }

  mensagem.innerHTML = texto[nPalavra];
  nPalavra++;
  
  updateProgress(Math.floor((nPalavra/qtdPalavras)*100));
}

speed.addEventListener('change', ({ target }) => {
  const velocity = document.querySelector('.velocity .value');
  velocity.innerHTML = target.value;
  const text = clearText(textEntry.value);
  const qtdPalavras = text.length;
  tempo.innerHTML = msgSpeed(qtdPalavras, velocity.innerHTML);
});

buttonPlay.addEventListener('click', playReading);
buttonPause.addEventListener('click', pauseReading);
buttonStop.addEventListener('click', stopReading);

updateProgress(0);
