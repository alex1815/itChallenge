
// TODO rename all const to uppercase

function onPausePlay()
{
    if (audio.paused)
    {
        audio.play().then(() => drawTimeCircle(false));
    }
    else {
        audio.pause();
        drawTimeCircle(true);
    }
}

function onPrevTrack(newIdOfTrack)
{
    if (newIdOfTrack !== undefined)
    {
        setTrack(newIdOfTrack);
        return;
    }

    const index = getIndexOfTrackById(idOfCurrentTrack);
    const tracks = getAllTracks();

    const prevTrackId = (index === 0)
        ? tracks[tracks.length-1].id
        : tracks[index - 1].id;

    setTrack(prevTrackId);
}

function onNextTrack(newIdOfTrack)
{
    if (newIdOfTrack !== undefined)
    {
        setTrack(newIdOfTrack);
        return;
    }

    const index = getIndexOfTrackById(idOfCurrentTrack);
    const tracks = getAllTracks();

    const nextTrackId = (index === tracks.length-1)
        ? tracks[0].id
        : tracks[index + 1].id;

    setTrack(nextTrackId);
}

function onLongPressToNextButton() {
    audio.currentTime += 4;
    if (audio.currentTime >= audio.duration)
    {
        onNextTrack();
    }
}

function onLongPressToPrevButton() {
    const changingOfTime = 6;
    audio.currentTime -= changingOfTime;
    if (audio.currentTime < changingOfTime)
    {
        onPrevTrack();
    }
}

function toggleMainScreen(oldId, newId)
{
    const oldElement = document.getElementById(oldId);

    if (oldId === "playerControl")
    {
        if (!changingOpacityForPlayerIsFinished(oldElement, oldId, newId))
        {
            return;
        }
    }

    oldElement.style.display = "none";
    oldElement.style.opacity = 1;

    const newElem = document.getElementById(newId);
    newElem.style.display = "block";
}

function onAudioEnd()
{
    onNextTrack();
}

// function onChangeTime (event)
// {
//     const x = event.offsetX;
//     const y = event.offsetY;
//
//     const { element } = prepareCanvas("canvasCircleTimer", timerRadius);
//
//     const angleRadians = Math.atan2(y, x - element.width/2) * 180 / Math.PI;
//     audio.currentTime = angleRadians/180*Math.PI /Math.PI * audio.duration;
//     console.log(angleRadians);
// }

function addListeners()
{
    addListener("pausePlay", onPausePlay);
    addListener("listOfTracksButton", onOpenListOfTracks);
    // addListener("nextButton", () => { onNextTrack() });
    // addListener("prevButton", () => { onPrevTrack() });
    addListenerToMouseUpDown("nextButton", onLongPressToNextButton, () => { onNextTrack() });
    addListenerToMouseUpDown("prevButton", onLongPressToPrevButton, () => { onPrevTrack() });

    addListener("closeListButton", onCloseListOfTracks);
    //addListenerById("canvasCircleTimer", onChangeTime);
    audio.onended = onAudioEnd;
    audio.oncanplaythrough = () => { drawTimeCircle() };

    for (let i = 0; i < getAllTracks().length; i++)
    {
        addListener("itemOfList-" + i, clickOnTrack);
    }
}

function addListener(id, callback)
{
    const element = document.getElementsByClassName(id)[0];
    element.addEventListener("click", callback);
}

function addListenerToMouseUpDown(id, onLongPressToButton, onClick) {
    const element = document.getElementsByClassName(id)[0];
    let pressTimer, longPressExecution;
    let longPress = false;

    element.addEventListener("mousedown", (event) =>
    {
        pressTimer = setTimeout(() => {
            longPress = true;
            longPressExecution = setInterval(() => onLongPressToButton(event), 1000);
        }, 1000);
    });

    element.addEventListener("mouseup", (event) =>
    {
        clearTimeout(pressTimer);
        if (longPress)
        {
            clearInterval(longPressExecution);
            longPress = false;
            return;
        }

        onClick(event);
    });
}

// function addListenerById(id, callback) {
//     const element = document.getElementById(id);
//     element.addEventListener("click", callback);
// }