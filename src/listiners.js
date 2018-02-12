
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
    // movingElementUpAndHide("playerControl");
    // movingElementDownAndOpen("tracksList");
    
    toggleMainScreen("playerControl", "tracksList");    
    transformTimeCircle();

    
    setTimeout( () => {
        // endTransformationTimeCircle();
    }, timeOfTimerTransform);
}

function onCloseListOfTracks()
{
    toggleMainScreen("tracksList", "playerControl");   

    const tracksList = document.getElementById("tracksList");
    const playerControl = document.getElementById("playerControl");
    tracksList.style.display = "none";
    playerControl.style.display = "block";
    
    
    setTimeout( () => {
        
    }, timeOfTimerTransform);
}

function toggleMainScreen(oldId, newId)
{
    const oldElement = document.getElementById(oldId);

    if (oldId === "playerControl")
    {
        // todo create fun in player
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
            
            return;
        }

        endTransformationTimeCircle();

        for (let key = 0; key < oldElements.length; key++)
        {
            oldElements[key].style.opacity = 1;
        }
    }
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


function movingElementUpAndHide(id)
{
    let element = document.getElementById(id);
    element.style.marginBottom = +element.style.marginBottom + 1;
    element.style.opacity = +element.style.opacity - 0.1;
    if (element.style.opacity > 0.1)
    {
        setTimeout(() => {
            movingElementUpAndHide(id);
        }, timeOfTimerTransform / 11 );
    } 
    else
    {
        element.style.display = "none";
        element.style.marginBottom = 0;
        element.style.opacity = 1;
    }
}
