const sizeOfTimerInList = 300;

function initListOfTracks(firstTrackId)
{
    const tracks = getAllTracks();
    const list = document.getElementById("listOfTrack");
    let items = "";

    tracks.map( (item) => {
        items += 
        `<div class="nameAndAuthor itemOfList-${item.id} ${item.id === firstTrackId ? 'selectedElement' : '' }" innerid=${item.id} >
            <h3 class="nameOfComposition">${item.name}</h3>
            <h4 class="author">${item.author}</h4>
        </div>`;
        
    });

    list.innerHTML = items;
}

function setTimeForTimerInList (duration, currentTime)
{
    const element = document.getElementById("timerInList");
    element.width = sizeOfTimerInList;
    let ctx = element.getContext("2d");

    ctx.strokeStyle ="white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo((currentTime/duration) *  element.width, 0);
    ctx.stroke();
    ctx.closePath();   
}

function clickOnTrack(event)
{
    const idOfTrack = +(event.currentTarget.attributes["innerid"].value);
    setTrack(idOfTrack);
}

function changeTrackInList(idOfTrack)
{
    if (idOfTrack === idOfCurrentTrack)
    {
        return;
    }

    const oldTrack = document.getElementsByClassName(`itemOfList-${idOfCurrentTrack}`)[0];
    const newTrack = document.getElementsByClassName(`itemOfList-${idOfTrack}`)[0];

    oldTrack && oldTrack.classList.remove("selectedElement");
    newTrack && newTrack.classList.add("selectedElement");
}

function onOpenListOfTracks()
{
    toggleMainScreen("playerControl", "tracksList");
    transformTimeCircle();
}

function onCloseListOfTracks()
{
    toggleMainScreen("tracksList", "playerControl");
}

( () => {
    setInterval( () => {
        setTimeForTimerInList(audio.duration, audio.currentTime)
    }, 1000);
})();
