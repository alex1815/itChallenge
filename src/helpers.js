function findTrackById(id)
{
    return _listOfTracks.find( (item)=> {
        return item.id === id;
    });
}

function findTrackPathById(id)
{
    return findTrackById(id).path;
}

function findTrackAuthorById(id)
{
    return findTrackById(id).author;
}

function findTrackNameById(id)
{
    return findTrackById(id).name;
}

function findBackgroundById(id)
{
    return findTrackById(id).background;
}

function getAllTracks()
{
    return _listOfTracks;
}

function getIndexOfTrackById(id) {
    const tracks = getAllTracks();
    return tracks.findIndex((track) => {
        return track.id === id;
    });
}