let audio;

const timerRadius = 180;
const innerCircleRadius = 125;

let idOfCurrentTrack;
let lineWidthOfTimerCircle;
let changingRadiusForTransofrmation;

const timeOfTimerTransform = 700;

 function initial()
{
    audio = document.getElementById("audio");
    const firstTrackId = getAllTracks()[0].id;
    document.getElementById("backgroundImageMain").style.backgroundColor =
        "black";

    initializeVariabels();
    initListOfTracks(firstTrackId);

    setTrack(firstTrackId);

    drawCircle("canvasInnerCircle", innerCircleRadius);
    drawCircle("canvasCircleUnderTimer", timerRadius);

    addListeners();

    // TODO back to 1
    audio.volume = 1;
    audio.autoplay = true;
}

function drawCircle(id, radius)
{ 
    const { ctx, size } = prepareCanvas(id, radius);

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
        const { ctx, size, element } = prepareCanvas("canvasCircleTimer", timerRadius);
        this.ctx = ctx;
        this.size = size;
        this.element = element;
    }

    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    drawTimeCircleByContext(this.ctx, this.size, timerRadius, onPause);
}

function transformTimeCircle ()
{
    const { ctx, size } = prepareCanvas("canvasCircleTimerTransform", timerRadius, sizeOfTimerInList);

    lineWidthOfTimerCircle = 5 - this.coefficentForWidthOfTimerTransformation > 1 ? 5 - this.coefficentForWidthOfTimerTransformation : 1;

    ctx.strokeStyle ="white";
    ctx.lineWidth = lineWidthOfTimerCircle;
    ctx.beginPath();
    // todo do full circle
    ctx.arc(sizeOfTimerInList/2, size/2 + changingRadiusForTransofrmation, timerRadius + changingRadiusForTransofrmation, 
        -(0.5 + this.currentTimeOfTransformation)*Math.PI,
        -(0.5 - this.currentTimeOfTransformation)*Math.PI
    );
    ctx.stroke();

    drawTimeCircle();

    const frequencyOfDrawing = 30;
    this.currentTimeOfTransformation += 1/(changingRadiusForTransofrmation+0.1)/20;
    this.coefficentForWidthOfTimerTransformation += 0.4;

    this.timerForTransofrmCircle = setTimeout( () => {
        transformTimeCircle();
        this.timeAnimationExecution += frequencyOfDrawing;
        changingRadiusForTransofrmation += this.timeAnimationExecution > frequencyOfDrawing*5
            ? 1250
            : 100;
    }, frequencyOfDrawing );
}

// TODO
// file:///C:/projects/itChallenge_player/index.html
function endTransformationTimeCircle()
{
    prepareCanvas("canvasCircleTimerTransform", timerRadius);
    initializeVariabels();
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
    ctx.lineWidth = lineWidthOfTimerCircle;
    ctx.beginPath();
    ctx.arc(size/2, size/2, radius, -Math.PI/2, 2 * Math.PI * (currentTime/durationOfMusic) - Math.PI/2);
    ctx.stroke();
}

function prepareCanvas(id, radius, width)
{
    const marginOfButtons = 10;
    const sizeOfButtons = 20; 
    const size = radius * 2 + sizeOfButtons + marginOfButtons;
    const element = document.getElementById(id);
    element.width = width || size;
    element.height = size;
    return { ctx: element.getContext("2d"), size, element };
}

function setTrack(idOfTrack)
{
    if (idOfTrack === idOfCurrentTrack)
    {
        onPausePlay();
        return;
    }

    const defaultTime = "00:00";
    changeTrackInList(idOfTrack);
    idOfCurrentTrack = idOfTrack;
    audio.src = findTrackPathById(idOfCurrentTrack);
    document.getElementById("nameOfComposition").innerText = findTrackNameById(idOfCurrentTrack);
    document.getElementById("timeOfTrack").innerText = defaultTime;
    document.getElementById("authorOfComposition").innerText = findTrackAuthorById(idOfCurrentTrack);
    setBackground(findBackgroundById(idOfCurrentTrack));
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

function initializeVariabels()
{
    this.timeAnimationExecution = 0;    
    changingRadiusForTransofrmation = 0;
    this.currentTimeOfTransformation = 0;
    this.coefficentForWidthOfTimerTransformation = 0;
    lineWidthOfTimerCircle = 5;
}

function changingOpacityForPlayerIsFinished(oldElement, oldId, newId)
{
    const oldElements = oldElement.querySelectorAll(":not(#canvasCircleTimerTransform):not(#audio):not(#playerControlFlexContainer)");
    for (let key = 0; key < oldElements.length; key++)
    {
        oldElements[key].style.opacity = oldElements[key].style.opacity ? +oldElements[key].style.opacity - 0.1 : 0.9;
    }


    if (oldElements[0].style.opacity > 0)
    {
        setTimeout(() => {
            toggleMainScreen(oldId, newId);
        }, timeOfTimerTransform / 10 );
        
        return false;
    }

    endTransformationTimeCircle();

    for (let key = 0; key < oldElements.length; key++)
    {
        oldElements[key].style.opacity = 1;
    }

    return true;
}

function moveSlider(path) {
     const elem = document.getElementById("backgroundImageLeft");
     const value = parseInt(elem.style.left, 10);
     const shift = 10;

     elem.style.left = (value - shift) + "%";
     if (value - shift === 0)
     {
         document.getElementById("backgroundImageMain").style.backgroundImage = `url(${path})`;
         elem.style.left = "100%";
     }
     else
     {
         setTimeout(() => {
             moveSlider(path);
         }, 15);
     }
}

function setBackground(path)
{
    document.getElementById("backgroundImageLeft").style.backgroundImage = `url(${path})`;

    moveSlider(path);
}