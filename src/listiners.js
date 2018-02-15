function onPausePlay()
{
    if (audio.paused)
    {
        audio.play().then(() => {
            drawTimeCircle(false);
            drawTime();
        });
    }
    else
    {
        clearTimeout(drawTimeCircleTimeoutId);
        clearTimeout(timeInPlayerSetTimeoutId);
        audio.pause();
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

function addListeners()
{
    addListener("pause-play", onPausePlay);
    addListener("list-of-tracks-button", onOpenListOfTracks);
    addListenerToMouseUpDown("next-button", onLongPressToNextButton, () => { onNextTrack() });
    addListenerToMouseUpDown("prev-button", onLongPressToPrevButton, () => { onPrevTrack() });

    addListener("close-list-button", onCloseListOfTracks);
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
            onLongPressToButton(event);
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
