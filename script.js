console.log("Welcome to Jana");

//Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterSongName = document.getElementById('masterSongName'); 
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem =Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {songName: "Bawara Mann", filePath: "songs/1.mp3",coverPath:"cover/bawra_mann.jpg"},
    {songName: "Darmiyaan", filePath: "songs/2.mp3",coverPath:"cover/Darmiyaan.jpg"},
    {songName: "Sarkaare", filePath:"songs/3.mp3",coverPath:"cover/sarkaare.jpg"},
    {songName: "Kaise Mujhe", filePath:"songs/4.mp3",coverPath:"cover/kaise.jpg"},
    {songName: "Heeriye", filePath:"songs/5.mp3",coverPath:"cover/heeriye.jpg"},
    {songName: "Tujhme Rab Dikhta Hai", filePath:"songs/6.mp3",coverPath:"cover/rab.jpg"},
    {songName: "Chaleya", filePath:"songs/7.mp3",coverPath:"cover/chaleya.jpg"},
    {songName: "Satrangaa", filePath:"songs/8.mp3",coverPath:"cover/satranga.jpg"},
    {songName: "Tum Se", filePath:"songs/9.mp3",coverPath:"cover/tum se.jpg"},
    {songName: "Sang Rahiyo", filePath:"songs/10.mp3",coverPath:"cover/sang.jpg"},
]

songItem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Liten to events
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');    
})
}
songItemPlay.forEach((element)=>{
    let pause = true;
    element.addEventListener('click',(e)=>{
       if(pause){
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        pause = false;
    }else{
        pause=true;
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }

    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;    
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;     
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
