 function initial()
{
    const timerRadius = 140;
    const aroundCircleRadius = 180;

    let audio = new Audio("./assets/music/chopin-mazurka-in-d-major-b4.mp3");
    //audio.play();
   
    drawCircleWithMoving("canvasCircleTimer", timerRadius, 120, 20);
    drawCircle("canvasCircleAround", aroundCircleRadius);
    drawCircle("canvasCircleUnderTimer", timerRadius);
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