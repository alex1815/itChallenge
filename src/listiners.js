
function onPausePlay(event)
{
    if (audio.paused)
    {
        audio.play();
        drawTimeCircle(false);
    }
    else {
        audio.pause();
        drawTimeCircle(true);
    }
}

function onNextTrack(newIdOfTrack)
{
    const newidOfcurrentTrack = 
        newIdOfTrack !== undefined
        ? newIdOfTrack
        : idOfcurrentTrack === getAllTracks().length - 1
            ? 0
            : ++idOfcurrentTrack;

    setTrack(newidOfcurrentTrack);
}

function onPrevTrack(newIdOfTrack)
{
    const newidOfcurrentTrack = 
        newIdOfTrack  !== undefined
        ? newIdOfTrack
        : idOfcurrentTrack === 0
            ? getAllTracks().length - 1
            : --idOfcurrentTrack;

    setTrack(newidOfcurrentTrack);
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
    // TODO
    // else
    // {
    //     // todo create func in list
    //     const oldElements = oldElement.querySelectorAll(":not(#timerInList)");

    //     for (let key = 0; key < oldElements.length; key++)
    //     {
    //         oldElements[key].style.opacity = oldElements[key].style.opacity ? +oldElements[key].style.opacity + 0.1 : 0.1;
    //     }

    //     if (oldElements[0].style.opacity < 1)
    //     {
    //         setTimeout(() => {
    //             toggleMainScreen(oldId, newId);
    //         }, timeOfTimerTransform / 10 );

    //         return;
    //     }

    //     for (let key = 0; key < oldElements.length; key++)
    //     {
    //         oldElements[key].style.opacity = 0;
    //     }
    // }

    oldElement.style.display = "none";
    oldElement.style.opacity = 1;

    const newElem = document.getElementById(newId);
    newElem.style.display = "block";
}

function clickOnTrack(event)
{
    const idOfTrack = +(event.currentTarget.attributes["innerId"].value);
    idOfcurrentTrack < idOfTrack
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