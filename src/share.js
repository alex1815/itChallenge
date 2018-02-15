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

function setTrack(idOfTrack)
{
    if (idOfTrack === idOfCurrentTrack)
    {
        onPausePlay();
        return;
    }

    const defaultTime = "00:00";
    changeTrackInList(idOfTrack);
    idOfCurrentTrack = idOfTrack;
    audio.src = findTrackPathById(idOfCurrentTrack);
    document.getElementById("name-of-composition").innerText = findTrackNameById(idOfCurrentTrack);
    document.getElementById("time-of-track").innerText = defaultTime;
    document.getElementById("authorOfComposition").innerText = findTrackAuthorById(idOfCurrentTrack);
    setBackground(findBackgroundById(idOfCurrentTrack));
    drawTimeCircle();
    drawTime();
}