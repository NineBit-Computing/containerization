# Guide to bring up the containerized setup using Dockerfile & Compose

## Prepare for launching local Node WebServer container

Build the node webserver image
```bash
docker build --tag webserver_image:v1 .
```

Bring up the webserver container by running the webserver_image
```bash
docker run \
  -it -d \
  -p 80:9001 \
  -e WEB_SERVER_PORT=9001 \
  --name rest-server \
  webserver_image:v1
```

The static web page should be accessible here http://localhost:80

But the route that depends on database will fail http://localhost:80/askdb/james-bond

<br/>

## Prepare for launching local Mongo container

Create a network that our application and database will use to talk with each other
```bash
docker network create mynet
```

Create two volumnes - one for the data and one for configuration of MongoDB.
```bash
docker volume create mongodb
docker volume create mongodb_config
```

Pull and run the mongo container  
```bash
docker run \
	-it -d \
	-v mongodb:/data/db \
  -v mongodb_config:/data/configdb \
 	-p 27017:27017 \
  --network mynet\
  --name mynet \
  mongo
```

Confirm that the network is tied to mongo container
```bash
docker network inspect mynet
```

Run the node server again with network information
```bash
docker run \
  -it -d \
  -p 80:9001 \
	-e MONGO_NETWORK_HOST=mynet \
  -e WEB_SERVER_PORT=9001 \
  --network mynet\
  --name rest-server \
  webserver_image:v1
```

Access the route that depends on database http://localhost:80/askdb/james-bond

<br/>

## Run the compose process
Remove the containers, images, network and volumes that were created earlier. Docker compose will take care of creating them all.
```bash
docker compose -f docker-compose.yml up --build
```
