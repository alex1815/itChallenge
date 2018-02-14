const SIZE_OF_TIMER_IN_LIST = 300;

function initListOfTracks(firstTrackId)
{
    const tracks = getAllTracks();
    const list = document.getElementById("list-of-tracks");
    let items = "";

    tracks.map( (item) => {
        items += 
        `<div class="name-and-author itemOfList-${item.id} ${item.id === firstTrackId ? 'selected-element' : '' }" innerid=${item.id} >
            <h3 class="name-of-composition">${item.name}</h3>
            <h4 class="author">${item.author}</h4>
        </div>`;
        
    });

    list.innerHTML = items;
}

function setTimeForTimerInList (duration, currentTime)
{
    const element = document.getElementById("timer-in-list");
    element.width = SIZE_OF_TIMER_IN_LIST;
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

    oldTrack && oldTrack.classList.remove("selected-element");
    newTrack && newTrack.classList.add("selected-element");
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
