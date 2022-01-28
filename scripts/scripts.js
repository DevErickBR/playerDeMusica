let musicas = [
    {
        local: "./musics/SOD.mp3",
        artist: "System Of A Down",
        song: "Toxicity"
    },
    {
        local: "./musics/Queen.mp3",
        artist: "Queen",
        song: "I Want To Break Free"
    },
    {
        local: "./musics/RHCP.mp3",
        artist: "Red Hot Chilli Peppers",
        song: "Scar Tissue"
    }
];

let indexMusic = 0
let music = document.querySelector('audio');
let btnPlay = document.getElementById('btnPlay');
let btnPause = document.getElementById('btnPause');
let nomeArtista = document.getElementById('artist');
let nomeMusica = document.getElementById('music');
let next = document.getElementById('btnNextMusic');
let back = document.getElementById('btnBackMusic')

renderizarMusica(indexMusic);



btnPlay.addEventListener('click', playMusic);
btnPause.addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', attBarra);
back.addEventListener('click', () => {
    indexMusic--;
    if (indexMusic < 0){
        indexMusic = 2;
    }
    renderizarMusica(indexMusic);
    music.play();
});
next.addEventListener('click', prox);

function playMusic(){
    music.play()
    btnPause.style.display = "block";
    btnPlay.style.display = "none";
}

function pauseMusic(){
    music.pause()
    btnPause.style.display = "none";
    btnPlay.style.display = "block";
}

function attBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor(( music.currentTime / music.duration ) * 100) + '%';

    let tempoDecorrido = document.getElementsByClassName('inicio')[0];
    tempoDecorrido.textContent = formatarTempo(Math.floor(music.currentTime))

    let tempoTotal = document.getElementsByClassName('fim')[0];
    tempoTotal.textContent = formatarTempo(Math.floor(music.duration));

    if (formatarTempo(Math.floor(music.currentTime)) == formatarTempo(Math.floor(music.duration))){
        prox()
    }
               
}

function formatarTempo(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}

function renderizarMusica(index){
    music.setAttribute('src', musicas[index].local);
    music.addEventListener('loadeddata', () => {
        nomeArtista.textContent = musicas[index].artist;
        nomeMusica.textContent = musicas[index].song;
        let tempoTotal = document.getElementsByClassName('fim')[0];
        tempoTotal.textContent = formatarTempo(Math.floor(music.duration));
    });
}

function prox(){
    indexMusic++
    if (indexMusic > musicas.length){
        indexMusic = 0
    }
    renderizarMusica(indexMusic);
    music.play()
}
