
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
    const newIdOfCurrentTrack =
        newIdOfTrack !== undefined
        ? newIdOfTrack
        : idOfCurrentTrack === getAllTracks().length - 1
            ? 0
            : ++idOfCurrentTrack;

    setTrack(newIdOfCurrentTrack);
}

function onPrevTrack(newIdOfTrack)
{
    const newIdOfCurrentTrack =
        newIdOfTrack  !== undefined
        ? newIdOfTrack
        : idOfCurrentTrack === 0
            ? getAllTracks().length - 1
            : --idOfCurrentTrack;

    setTrack(newIdOfCurrentTrack);
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
    const oldTrack = document.getElementsByClassName(`itemOfList-${idOfCurrentTrack}`)[0];

    oldTrack.classList.remove("selectedElement");
    event.currentTarget.classList.add("selectedElement");

    idOfCurrentTrack < idOfTrack
    ? onPrevTrack(idOfTrack)
    : onNextTrack(idOfTrack);
}

function onAudioEnd()
{
    onNextTrack();
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