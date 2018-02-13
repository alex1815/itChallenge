const sizeOfTimerInList = 300;

function initListOfTracks()
{
    const tracks = getAllTracks();
    const list = document.getElementById("listOfTrack");
    let items = "";

    tracks.map( (item) => {
        items += 
        `<div class="nameAndAuthor itemOfList-${item.id} ${item.id === idOfCurrentTrack ? 'selectedElement' : null }" innerid=${item.id} >
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

( () => {
    setInterval( () => {
        setTimeForTimerInList(audio.duration, audio.currentTime)
    }, 1000);
})();
