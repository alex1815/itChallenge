
function onPausePlay(event)
{
    if (audio.paused)
    {
        audio.play();
        drawTimeCircle(audio.duration, audio.currentTime);
    }
    else {
        audio.pause();
        drawTimeCircle(audio.duration, audio.currentTime, true);
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

function setTrack(idOfTrack)
{
    const defaultTime = "00:00";
    idOfcurrentTrack = idOfTrack;
    audio.src = findTrackPathById(idOfcurrentTrack);
    document.getElementById("nameOfComposition").innerText = findTrackNameById(idOfcurrentTrack);
    document.getElementById("timeOfTrack").innerText = defaultTime;
    drawTimeCircle(audio.duration);

    clearInterval(this.timeTimer);
    this.timeTimer = setInterval(() => {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.ceil(audio.currentTime % 60);

        const minutesStr = minutes >= 10
            ? minutes
            : "0" + minutes;

        const secondsStr = seconds >= 10
            ? seconds
            : "0" + seconds;

        document.getElementById("timeOfTrack").innerText = `${minutesStr}:${secondsStr}`;
    }, 1000);
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
    let player = document.getElementById("playerControl");
    let list = document.getElementById("tracksList");

    const currentState = player.style.display;
    player.style.display = list.style.display;
    list.style.display = currentState; 
}

function clickOnTrack(idOfTrack)
{
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
    audio.oncanplaythrough = () => { drawTimeCircle(audio.duration) };

    for (let i = 0; i < getAllTracks().length; i++)
    {
        addListiner("itemOfList-" + i, () => { clickOnTrack(i) });
    }
}

function addListiner(id, callback)
{
    const element = document.getElementsByClassName(id)[0];
    element.addEventListener("click", callback);
}
