console.log('welcome to spotify');

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName : 'Let me love You', filePath: 'songs/1.mp3' , coverPath: 'covers/1.jpg'},
    {songName : 'ABCD', filePath: 'songs/2.mp3' , coverPath: 'covers/2.jpg'},
    {songName : 'Nach meri Jana', filePath: 'songs/3.mp3' , coverPath: 'covers/3.jpg'},
    {songName : 'Salam-e-Ishq', filePath: 'songs/4.mp3' , coverPath: 'covers/4.jpg'},
    {songName : 'Bhula Dena', filePath: 'songs/5.mp3' , coverPath: 'covers/5.jpg'},
    {songName : 'Sakhiyaan', filePath: 'songs/6.mp3' , coverPath: 'covers/6.jpg'}
]

songItems.forEach((element, i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

})

// audioElement.play();


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime < 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.remove('fa-regular');
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.add('fa-solid');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.remove('fa-solid');
        masterPlay.classList.add('fa-regular'); 
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
       
    }
})


//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
});

function makeAllPlays(){
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause');
    element.classList.remove('fa-solid');
    element.classList.add('fa-regular');
    element.classList.add('fa-circle-play');
    
})
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target.className);
        makeAllPlays();
       
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-regular');
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-solid');
        e.target.classList.add('fa-pause');
        

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.remove('fa-regular');
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.add('fa-solid');


    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.remove('fa-regular');
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.add('fa-solid');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.remove('fa-regular');
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.add('fa-solid');
        
})


