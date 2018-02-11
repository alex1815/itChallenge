
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
    toggleMainScreen();
}

function onCloseListOfTracks()
{
    toggleMainScreen();
}

function toggleMainScreen()
{
    transformTimeCircle();
    setTimeout( () => {
        endTransformationTimeCircle();

        let player = document.getElementById("playerControl");
        let list = document.getElementById("tracksList");

        const currentState = player.style.display;
        player.style.display = list.style.display;
        list.style.display = currentState; 
    }, timeOfTimerTransform);
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
