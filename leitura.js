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

const updateProgress = (progress) => {
  progresso.innerHTML = `${progress}%`;
  done.style.width = `${progress}%`;
};

function escreve()
{
  if (nPalavra >= texto.length) {
    buttonPlay.classList.add('play');
    buttonPause.classList.remove('pause');
    buttonStop.classList.remove('stop');
    sessionStorage.removeItem('nPalavra');
    sessionStorage.removeItem('qtdPalavras');
    clearInterval(tm);
    return true;
  }

  mensagem.innerHTML = texto[nPalavra];
  nPalavra++;
  
  updateProgress(Math.floor((nPalavra/qtdPalavras)*100));
}

window.onload = () => {
  buttonPlay.addEventListener('click', () => {
    buttonPlay.classList.remove('play');
    buttonPause.classList.add('pause');
    buttonStop.classList.add('stop');
          
    let velocidade = document.getElementById('speed').value;
    
    if (sessionStorage.getItem('qtdPalavras') != null) {
        qtdPalavras = sessionStorage.getItem('qtdPalavras');
        nPalavra = sessionStorage.getItem('nPalavra');
        updateProgress(Math.floor((nPalavra/qtdPalavras)*100));
        sessionStorage.removeItem('nPalavra');
        sessionStorage.removeItem('qtdPalavras');
    } else {
        qtdPalavras = 0;
        texto = textEntry.value;
        texto = texto.trim().replace(/^w/g, " ").replace(/\s/g, " ").replace(/  /g, " ").split(" ");
        
        qtdPalavras = texto.length;
        nPalavra = 0;
        updateProgress(0);
    }

    tempo.innerHTML = qtdPalavras + ' palavras em ' + ((velocidade * qtdPalavras)/1000) + ' segundos';

    mensagem.classList.add('prepare');
    mensagem.innerHTML = 'Prepare-se!';
    setTimeout(() => {
      mensagem.classList.remove('prepare');
      tm = setInterval(function(){
        escreve();
      }, velocidade);
    }, 800);
    
    document.body.style.scrollTop = 0;
  });

  speed.addEventListener('change', ({ target }) => {
    const velocity = document.querySelector('.velocity .value');
    velocity.innerHTML = target.value;
  });

  buttonPause.addEventListener('click', () => {
    sessionStorage.setItem('nPalavra', nPalavra);
    sessionStorage.setItem('qtdPalavras', qtdPalavras);
    clearInterval(tm);
    buttonPlay.classList.add('play');
    buttonPause.classList.remove('pause');
    buttonStop.classList.remove('stop');
  });

  buttonStop.addEventListener('click', () => {
    clearInterval(tm);
    buttonPlay.classList.add('play');
    buttonPause.classList.remove('pause');
    buttonStop.classList.remove('stop');
  });

  updateProgress(0);
};
