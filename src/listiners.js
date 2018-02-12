
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
    let oldElement = document.getElementById(oldId);
    oldElement.style.marginTop = (parseInt(oldElement.style.marginTop, 10) - 5) + "px";
    oldElement.style.opacity = +oldElement.style.opacity - 0.1;
    if (oldElement.style.opacity > 0)
    {
        setTimeout(() => {
            toggleMainScreen(oldId, newId);
        }, timeOfTimerTransform / 10 );
    } 
    else
    {
        if (oldId === "playerControl")
        {
            endTransformationTimeCircle();
        }
        oldElement.style.display = "none";
        oldElement.style.marginTop = "0";
        oldElement.style.opacity = 1;


        let elem = document.getElementById(newId);
        elem.style.display = "block";
        
    }
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

// function movingElementDownAndOpen(id, hideElemId)
// {
//     let element = document.getElementById(id);
//     element.style.marginBottom = 0;
//     element.style.opacity = +element.style.opacity + 0.1;
//     if (element.style.opacity < 0.9)
//     {
//         setTimeout(() => {
//             movingElementDownAndOpen(id);
//         }, timeOfTimerTransform / 10);
//     }
//     if (element.style.display === "none")
//     {
//         element.style.display = "flex";
//     }
// }