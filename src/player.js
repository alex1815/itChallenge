let audio;

const timerRadius = 180;
const innerCircleRadius = 125;

let idOfcurrentTrack;


const timeOfTimerTransform = 800;

 function initial()
{
    audio = document.getElementById("audio");
    idOfcurrentTrack = getAllTracks()[0].id;
    setTrack(idOfcurrentTrack);
    // TODO back to 1
    audio.volume = 0.1;
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
    ctx.closePath();
}

function drawTimeCircle(onPause = false)
{
    if (!this.ctx)
    {
        const { ctx, size, element } = preapareCanvas("canvasCircleTimer", timerRadius);
        this.ctx = ctx;
        this.size = size;
        this.element = element;
    }

    ctx.clearRect(0, 0, element.width, element.height);
    drawTimeCircleByContext(this.ctx, this.size, timerRadius, onPause);
}


let changingRadiusForTransofrmation = 0;
this.currentTimeOfTransformation = 0;
this.coefficentForWidthOfTimerTransformation = 0;

function transformTimeCircle ()
{
    const { ctx, size } = preapareCanvas("canvasCircleTimerTransform", timerRadius);

    // ctx.strokeStyle ="red";
    // ctx.beginPath();
    // ctx.arc(size/2, size/2 + changingRadiusForTransofrmation - 5, timerRadius+changingRadiusForTransofrmation, 0, Math.PI*2);
    // ctx.closePath();
    // ctx.stroke();

    ctx.strokeStyle ="white";
    ctx.lineWidth = 5 - this.coefficentForWidthOfTimerTransformation > 1 ? 5 - this.coefficentForWidthOfTimerTransformation : 1;
    ctx.beginPath();
    let startAngle, endAngle;
    if (audio.duration/2 > audio.currentTime)
    {
        startAngle = //-(0.5 + 1/(changingRadiusForTransofrmation ? changingRadiusForTransofrmation+50 : 50))*Math.PI;
        -(0.5 + this.currentTimeOfTransformation)*Math.PI;
        endAngle = -0.5*Math.PI;
    } 
    else
    {
        startAngle = //-(0.5 + 1/(changingRadiusForTransofrmation ? changingRadiusForTransofrmation : 10))*Math.PI;
                //-(0.5 + changingRadiusForTransofrmation)*Math.PI;
                -(0.5 + this.currentTimeOfTransformation)*Math.PI;
        endAngle = //-(0.5 + (1/(changingRadiusForTransofrmation ? changingRadiusForTransofrmation : 10))*(audio.currentTime/audio.duration))*Math.PI
        Math.PI*1.5 - (0.5 + 1/(this.currentTimeOfTransformation ? (this.currentTimeOfTransformation+100) : 100))*Math.PI;
    }
        
    ctx.arc(size/2, size/2 + changingRadiusForTransofrmation, timerRadius + changingRadiusForTransofrmation, 
    // ctx.arc(size/2, size/2 , timerRadius, 
        //-(0.5 + this.changingRadiusForTransofrmation)*Math.PI,
        startAngle,
        //-( this.currentTimeOfTransformation/timeOfTimerTransform)*Math.PI/2/changingRadiusForTransofrmation,
        endAngle

        //2 * Math.PI * (currentTime/durationOfMusic) - Math.PI/2
        //  Math.PI - ( this.currentTimeOfTransformation/timeOfTimerTransform)*Math.PI/2/changingRadiusForTransofrmation
    );

    //ctx.closePath();
    ctx.stroke();

    const duration = 70;
    this.currentTimeOfTransformation += 1/(changingRadiusForTransofrmation+0.1)/20;
    this.coefficentForWidthOfTimerTransformation += 0.4;

    this.timerForTransofrmCircle = setTimeout( () => {
        transformTimeCircle();
        changingRadiusForTransofrmation += this.timerForTransofrmCircle > 0.75
            ? 150
            : 3;
    }, duration ); // 70
}

// TODO
// file:///C:/projects/itChallenge_player/index.html
function endTransformationTimeCircle()
{
    const { ctx, element } = preapareCanvas("canvasCircleTimerTransform", timerRadius);
    // ctx.clearRect(0, 0, element.width, element.height);
    changingRadiusForTransofrmation = 0;
    this.currentTimeOfTransformation = 0;
    this.coefficentForWidthOfTimerTransformation = 0;
    clearTimeout(this.timerForTransofrmCircle);
}

function drawTimeCircleByContext(ctx, size, radius, onPause)
{
    if (this.intervalId)
    {
        clearInterval(this.intervalId);
    }

    if (onPause)
    {
        drawCircleWithMoving(this.ctx, this.size, radius, audio.duration, audio.currentTime);
    }
    else
    {
        function func ()
        {
            drawCircleWithMoving(this.ctx, this.size, radius, audio.duration, audio.currentTime);
        }

        func();
        this.intervalId = setInterval(() => {
            func();
        }, 1000);
    }
}

function drawCircleWithMoving(ctx, size, radius, durationOfMusic, currentTime)
{
    ctx.strokeStyle ="white";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(size/2, size/2, radius, -Math.PI/2, 2 * Math.PI * (currentTime/durationOfMusic) - Math.PI/2);
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

function setTrack(idOfTrack)
{
    const defaultTime = "00:00";
    idOfcurrentTrack = idOfTrack;
    audio.src = findTrackPathById(idOfcurrentTrack);
    document.getElementById("nameOfComposition").innerText = findTrackNameById(idOfcurrentTrack);
    document.getElementById("timeOfTrack").innerText = defaultTime;
    document.getElementById("authorOfComposition").innerText = findTrackAuthorById(idOfcurrentTrack);
    document.getElementsByTagName("body")[0].style.backgroundImage = `url(${findBackgroundById(idOfcurrentTrack)})`;
    drawTimeCircle();

    if (this.timeTimer)
    {
        clearInterval(this.timeTimer);
    }

    this.timeTimer = setInterval(() => {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.ceil(audio.currentTime % 60);

        const minutesStr = minutes >= 10
            ? minutes
            : "0" + minutes;

        const secondsStr = seconds >= 10
            ? seconds
            : "0" + seconds;

        document.getElementById("timeOfTrack").innerText = `${minutesStr}:${secondsStr}`;
    }, 1000);
}