let audio;
const listOfMusic = [
    "./assets/music/chopin-mazurka-in-d-major-b4.mp3",
    "./assets/music/chopin-mazurka-in-d-major-b71.mp3",
    "./assets/music/chopin-spring.mp3",
    "./assets/music/chopin-tarantelle-op43.mp3",
];

let indexOfcurrentTrack;

 function initial()
{
    const timerRadius = 140;
    const aroundCircleRadius = 180;
   
    drawCircleWithMoving("canvasCircleTimer", timerRadius, 120, 20);
    drawCircle("canvasCircleAround", aroundCircleRadius);
    drawCircle("canvasCircleUnderTimer", timerRadius);

    addListiners();

    audio = document.getElementById("audio");
    indexOfcurrentTrack = 0;
    audio.src = listOfMusic[indexOfcurrentTrack];
    audio.play();
}

function drawCircleWithMoving(id, radius, durationOfMusic, currentPosition)
{
    const { ctx, size } = preapareCanvas(id, radius);

    setInterval(() => {
        ctx.strokeStyle ="black";
        ctx.beginPath();
        ctx.arc(size/2, size/2, radius, -Math.PI/2, 2 * Math.PI * (currentPosition/durationOfMusic));
        ctx.stroke();
        currentPosition++;
    }, 1000);
}

function drawCircle(id, radius)
{ 
    const { ctx, size } = preapareCanvas(id, radius);

    ctx.strokeStyle ="grey";
    ctx.beginPath();
    ctx.arc(size/2, size/2, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function preapareCanvas(id, radius)
{
    const marginOfButtons = 10;
    const sizeOfButtons = 20; 
    const size = radius * 2 + sizeOfButtons + marginOfButtons;
    const c = document.getElementById(id);
    c.width = size;
    c.height = size;
    return { ctx: c.getContext("2d"), size };
}

function onPausePlay(event)
{
    audio.paused
     ? audio.play()
     : audio.pause();
}

function onNextTrack()
{
    indexOfcurrentTrack = indexOfcurrentTrack === listOfMusic.length - 1
        ? 0
        : ++indexOfcurrentTrack;

    setTrack(indexOfcurrentTrack);
}

function onPrevTrack()
{
    indexOfcurrentTrack = indexOfcurrentTrack === 0
    ? listOfMusic.length - 1
    : --indexOfcurrentTrack;

    setTrack(indexOfcurrentTrack);
}

function setTrack(indexOfTrack)
{
    audio.src = listOfMusic[indexOfcurrentTrack];
    audio.play();
}

function onlistOfTracks()
{

}

function addListiners()
{
    addListiner("pausePlay", onPausePlay);
    addListiner("listOfTracksButton", onlistOfTracks);
    addListiner("nextButton", onNextTrack);
    addListiner("prevButton", onPrevTrack);
}

function addListiner(id, callback)
{
    const element = document.getElementsByClassName(id)[0];
    element.addEventListener("click", callback);
}