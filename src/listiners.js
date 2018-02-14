
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

function onNextTrack(newIdOfTrack)
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

function onPrevTrack(newIdOfTrack)
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

function onOpenListOfTracks()
{  
    toggleMainScreen("playerControl", "tracksList");    
    transformTimeCircle();
}

function onCloseListOfTracks()
{
    toggleMainScreen("tracksList", "playerControl");   

    const tracksList = document.getElementById("tracksList");
    const playerControl = document.getElementById("playerControl");
    tracksList.style.display = "none";
    playerControl.style.display = "block";
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

function clickOnTrack(event)
{
    const idOfTrack = +(event.currentTarget.attributes["innerid"].value);
    setTrack(idOfTrack);
}

function changeTrackInList(idOfTrack)
{
    // TODO on click to previous\next track, selected element didn't changes

    if (idOfTrack === idOfCurrentTrack)
    {
        return;
    }

    const oldTrack = document.getElementsByClassName(`itemOfList-${idOfCurrentTrack}`)[0];
    const newTrack = document.getElementsByClassName(`itemOfList-${idOfTrack}`)[0];
// add getting element instead  event.currentTarget
    oldTrack && oldTrack.classList.remove("selectedElement");
    newTrack && newTrack.classList.add("selectedElement");

    // idOfCurrentTrack < idOfTrack
    // ? onNextTrack(idOfTrack)
    // : onPrevTrack(idOfTrack);
}

function onAudioEnd()
{
    onNextTrack(nextTrackId);
}

function addListiners()
{
    addListiner("pausePlay", onPausePlay);
    addListiner("listOfTracksButton", onOpenListOfTracks);
    addListiner("nextButton", () => { onNextTrack() });
    addListiner("prevButton", () => { onPrevTrack() });
    addListiner("closeListButton", onCloseListOfTracks);
    audio.onended = onAudioEnd;
    audio.oncanplaythrough = () => { drawTimeCircle() };

    for (let i = 0; i < getAllTracks().length; i++)
    {
        addListiner("itemOfList-" + i, clickOnTrack);
    }
}

function addListiner(id, callback)
{
    const element = document.getElementsByClassName(id)[0];
    element.addEventListener("click", callback);
}