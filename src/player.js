let audio;

const timerRadius = 180;
const innerCircleRadius = 125;

let idOfcurrentTrack;

 function initial()
{
    audio = document.getElementById("audio");
    idOfcurrentTrack = getAllTracks()[0].id;
    setTrack(idOfcurrentTrack);
    audio.autoplay = false;
    // TODO back to true
    audio.autoplay = true;
   
    initListOfTracks();

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
    ctx.lineWidth = 2;
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