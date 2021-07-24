Tested in edge, chrome.

Names of track and paths should be according (in real app we will get these from DB in object like {src: pathToTrack, name: nameOfTrack}[] ).

As app very simple, we thinks that data from server always were gets before initialization.

In more complex app we should add _ or use modificator of access in TypeScript.

I didn't use any framework because it is overhead - we have just two simple component - player and listOfTrack. 
If it part of more complex app, we can do some refactoring:

1. Move these in according class (player and listOfTrack)
2. Encapsulate consts in class, expose audio and a few other const through a few public methods
3. Use a framework like React for integration component as part of app

![Demo](assets/demo.mov)