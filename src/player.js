let audio;
const listOfMusic = [
    "./assets/music/chopin-mazurka-in-d-major-b4.mp3",
    "./assets/music/chopin-mazurka-in-d-major-b71.mp3",
    "./assets/music/chopin-spring.mp3",
    "./assets/music/chopin-tarantelle-op43.mp3",
];

const nameOfTracks = [
    "Mazurka in D major, B. 4",
    // "Mazurka in D major, B. 4 dddddddddddddd",
    "Mazurka in D major, B. 71",
    "Andantino 'Spring', B. 117",
    "Tarantelle, Op. 43",
];

const timerRadius = 180;
const innerCircleRadius = 140;

let indexOfcurrentTrack;

 function initial()
{
    audio = document.getElementById("audio");
    indexOfcurrentTrack = 0;
    setTrack(indexOfcurrentTrack);
    audio.autoplay = true;
    // audio.autoplay = false;
   
    drawCircle("canvasInnerCircle", innerCircleRadius);
    drawCircle("canvasCircleUnderTimer", timerRadius);

    addListiners();
}

function drawCircle(id, radius)
{ 
    const { ctx, size } = preapareCanvas(id, radius);

    ctx.strokeStyle ="grey";
    ctx.beginPath();
    ctx.arc(size/2, size/2, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawTimeCircle(duration, currentPostion, onPause)
{
    if (!this.ctx)
    {
        const { ctx, size, element } = preapareCanvas("canvasCircleTimer", timerRadius);
        this.ctx = ctx;
        this.size = size;
        this.element = element;
    }

    this.ctx.clearRect(0, 0, element.width, element.height);

    drawTimeCircleByContext(this.ctx, this.size, duration, timerRadius, currentPostion, onPause);
}

function drawTimeCircleByContext(ctx, size, duration, radius, currentPostion = 0, onPause = false)
{
    if (this.intervalId)
    {
        clearInterval(this.intervalId);
    }

    if (onPause)
    {
        drawCircleWithMoving(this.ctx, this.size, radius, duration, currentPostion);
    }
    else
    {
        const func = () =>
        {
            drawCircleWithMoving(this.ctx, this.size, radius, duration, currentPostion);
            currentPostion++;;
        }

        func();
        this.intervalId = setInterval(() => {
            func();
        }, 1000);
    }
}

function drawCircleWithMoving(ctx, size, radius, durationOfMusic, currentPosition)
{
    ctx.strokeStyle ="red";
    ctx.beginPath();
    ctx.arc(size/2, size/2, radius, -Math.PI/2, 2 * Math.PI * (currentPosition/durationOfMusic) - Math.PI/2);
    ctx.stroke();
}

function preapareCanvas(id, radius)
{
    const marginOfButtons = 10;
    const sizeOfButtons = 20; 
    const size = radius * 2 + sizeOfButtons + marginOfButtons;
    const element = document.getElementById(id);
    element.width = size;
    element.height = size;
    return { ctx: element.getContext("2d"), size, element };
}