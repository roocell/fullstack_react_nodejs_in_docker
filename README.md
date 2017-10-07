# fullstack_react_nodejs_in_docker
client and server side code running in separate containers. host mounted code.


backend and frontend dockerized
1. install "docker for mac" or "docker for windows" (requires win10pro)
2. build containers

```
docker build -f backendDockerfile -t roocell/backend .
docker build -f frontendDockerfile -t roocell/frontend .
<follow usage instruction to create your mysql container - in mysqlDockerfile>
```

3. run containers
```
docker run  -p 3306:3306 --name mysql -v $PWD/mysql/datadir:/var/lib/mysql -d osx_hostdb_mysql
docker run -it --name api -v $(PWD)/api/routes:/backend/routes --link mysql -p 3001:3001 -d roocell/backend
docker run -it --name client -v $(PWD)/client:/frontend/src --link api -p 3000:3000 -d roocell/frontend
docker run --name myadmin -d --link mysql:db -p 8080:80 phpmyadmin/phpmyadmin
```

4. open browser and goto http://192.168.99.100:3000 where you can get the IP from
```
docker-machine ls
```

5. edit "client/App.js" for client side

6. edit "api/*" for server side routes

NOTE:
- to remove containers
```
docker rm -f client
docker rm -f api
```
- to connect to containers
```
docker exec -it client bash
docker exec -it api bash
```
- if you run into problems running 'docker ps' then be sure to add the following to your .bash_profile
```
eval "$(docker-machine env default)"
```

To debug server API (ie - if you're editing API code and want to see JS errors)
```
docker run -it --name api -v $(PWD)/api/routes:/backend/routes --link mysql -p 3001:3001 roocell/backend bash
./backendInit.sh
```

