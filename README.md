# fullstack_react_nodejs_in_docker
client and server side code running in separate containers. host mounted code.

backend and frontend dockerized
1. install "docker for mac" or "docker for windows" (requires win10pro)
2. build containers

    docker build -f backendDockerfile -t roocell/backend .
    docker build -f frontendDockerfile -t roocell/frontend .

3. run containers
    docker run -it --name api -v $(PWD)/server:/react-backend/routes -d roocell/backend
    docker run -it --name client -v $(PWD)/client:/frontend/src --link api -p 3000:3000 -d roocell/frontend

4. open browser and goto http://192.168.99.100:3000 where you can get the IP from
    docker-machine ls

5. edit "client/App.js" for client side

6. edit "server/*" for server side routes

