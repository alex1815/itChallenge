function initListOfTracks()
{
    
}

function setTimeForTimerInList (duration, currentTime)
{
    const element = document.getElementById("timerInList");
    element.width = 300;
    let ctx = element.getContext("2d");

    ctx.strokeStyle ="red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo((currentTime/duration) *  element.width, 0);
    ctx.stroke();
}

( () => {
    setInterval( () => {
        setTimeForTimerInList(audio.duration, audio.currentTime)
    }, 1000);
})();