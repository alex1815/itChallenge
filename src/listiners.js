
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

function onNextTrack()
{
    indexOfcurrentTrack = indexOfcurrentTrack === listOfMusic.length - 1
        ? 0
        : ++indexOfcurrentTrack;

    setTrack(indexOfcurrentTrack);
}

function onPrevTrack()
{
    indexOfcurrentTrack = indexOfcurrentTrack === 0
    ? listOfMusic.length - 1
    : --indexOfcurrentTrack;

    setTrack(indexOfcurrentTrack);
}

function setTrack(indexOfTrack)
{
    audio.src = listOfMusic[indexOfcurrentTrack];
    drawTimeCircle(audio.duration);
}

function onlistOfTracks()
{

}

function onAudioEnd()
{
    onNextTrack();
}

function addListiners()
{
    addListiner("pausePlay", onPausePlay);
    addListiner("listOfTracksButton", onlistOfTracks);
    addListiner("nextButton", onNextTrack);
    addListiner("prevButton", onPrevTrack);
    audio.onended = onAudioEnd;
    audio.oncanplaythrough = () => {drawTimeCircle(audio.duration)};
}

function addListiner(id, callback)
{
    const element = document.getElementsByClassName(id)[0];
    element.addEventListener("click", callback);
}
