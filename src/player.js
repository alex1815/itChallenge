const TIMER_RADIUS = 180;
const INNER_CIRCLE_RADIUS = 125;
const TIME_OF_TIMER_TRANSFORMATION = 700;

let lineWidthOfTimerCircle;
let changingRadiusForTransformation;

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
        const { ctx, size, element } = prepareCanvas("canvasCircleTimer", TIMER_RADIUS);
        this.ctx = ctx;
        this.size = size;
        this.element = element;
    }

    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    drawTimeCircleByContext(this.ctx, this.size, TIMER_RADIUS, onPause);
}

function transformTimeCircle ()
{
    const { ctx, size } = prepareCanvas("canvasCircleTimerTransform", TIMER_RADIUS, SIZE_OF_TIMER_IN_LIST);

    lineWidthOfTimerCircle = 5 - this.coefficentForWidthOfTimerTransformation > 1 ? 5 - this.coefficentForWidthOfTimerTransformation : 1;

    ctx.strokeStyle ="white";
    ctx.lineWidth = lineWidthOfTimerCircle;
    ctx.beginPath();
    ctx.arc(SIZE_OF_TIMER_IN_LIST/2, size/2 + changingRadiusForTransformation, TIMER_RADIUS + changingRadiusForTransformation,
        -(0.5 + this.currentTimeOfTransformation)*Math.PI,
        -(0.5 - this.currentTimeOfTransformation)*Math.PI
    );
    ctx.stroke();

    drawTimeCircle();

    const frequencyOfDrawing = 30;
    this.currentTimeOfTransformation += 1/(changingRadiusForTransformation+0.1)/20;
    this.coefficentForWidthOfTimerTransformation += 0.4;

    this.timerForTransofrmCircle = setTimeout( () => {
        transformTimeCircle();
        this.timeAnimationExecution += frequencyOfDrawing;
        changingRadiusForTransformation += this.timeAnimationExecution > frequencyOfDrawing*5
            ? 1250
            : 100;
    }, frequencyOfDrawing );
}

function endTransformationTimeCircle()
{
    prepareCanvas("canvasCircleTimerTransform", TIMER_RADIUS);
    initializeVariables();
    clearTimeout(this.timerForTransofrmCircle);
}

function drawTimeCircleByContext(ctx, size, radius, onPause)
{
    if (drawTimeCircleTimeoutId)
    {
        clearTimeout(drawTimeCircleTimeoutId);
    }

    if (!onPause)
    {
        _draw();
        _drawByTimer();
    }

    function _draw ()
    {
        drawCircleWithMoving(this.ctx, this.size, radius, audio.duration, audio.currentTime);
    }

    function _drawByTimer() {
        drawTimeCircleTimeoutId = setTimeout(() => {
            _draw();
            _drawByTimer();
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

function drawTime()
{
    if (timeInPlayerSetTimeoutId)
    {
        clearTimeout(timeInPlayerSetTimeoutId);
    }

    const timer = document.getElementById("time-of-track");

    _setTime();
    _nextTick();

    function _setTime() {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.ceil(audio.currentTime % 60);

        const minutesStr = minutes >= 10
            ? minutes
            : "0" + minutes;

        const secondsStr = seconds >= 10
            ? seconds
            : "0" + seconds;

        timer.innerText = `${minutesStr}:${secondsStr}`;
    }

    function _nextTick() {
        timeInPlayerSetTimeoutId = setTimeout(() => {
            _setTime();
            _nextTick();
        }, 1000);
    }
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
        }, TIME_OF_TIMER_TRANSFORMATION / 10 );
        
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