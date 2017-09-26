app.js is built into the docker container
if you add a new API js file (and/or modify app.js)
 - you need to rebuild the container

in order to observe backend JS errors you have to connect
to the docker container
   docker exec -it api bash
and then rerun webpack
   killall webpack; webpack --watch

got info from 
https://shellmonger.com/2016/02/02/automatic-builds-with-webpack/
