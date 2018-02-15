let audio;

let idOfCurrentTrack;
let drawTimeCircleTimeoutId;
let timeInPlayerSetTimeoutId;

function initial()
{
    audio = document.getElementById("audio");
    const firstTrackId = getAllTracks()[0].id;

    initializeVariables();
    initListOfTracks(firstTrackId);

    setTrack(firstTrackId);

    drawCircle("canvasInnerCircle", INNER_CIRCLE_RADIUS);
    drawCircle("canvasCircleUnderTimer", TIMER_RADIUS);

    addListeners();

    audio.autoplay = true;
    document.addEventListener("keydown", onPressSpace);
}

function onPressSpace(event)
{
    if (event.keyCode == 32) {
        onPausePlay();
    }
}
