---
title: Shipping code to server is way too hard
---






from cloud hosting to cloud native

api gateway
networking
observability and analysis
load balancer and reverse proxy

[cloudnativejs](https://cloudnativejs.io/)



at the heart of the microservices revolution

how to take a Node.js app and ...

packages an application so that is into a self-contained container so that lets
containers run on any OS



Orchestration tools such as Kubernetes pgrade unique microservices without any downtime.

kubernetes operator ingress podman



deploy it to kubernetes(orchestration layer) using helm



run it at sacle with multiple instance




self-healing using health checks

metrics monitor with prometheus and grafana

request tracing, logging using openTracing, Zipkin and Jaeger

martin fowler


## Localstack

- data msut persist
- live source code update
- effective corss-container communicaton
- env variable inject


Dockerizing the React SPA
```bash
# mvoing React SPA into a container
$ docker build -t reactfrontend
$ docker run --name reactweb --rm -p 3000:3000 -it reactweb
# execute in browser, endpoint can be reached
```

Dockerizing the Vue SPA
Dockerizing the Nextjs SSA



local dev environment with docker
setup local go dev environment with docker compose(or docker run)
setup local python dev environment with docker compose


###  setup local node server dev environment

```Dockerfile
ENV DB_USER=root
ENV DB_PASS=pass
ENV DB_URL=

WORKDIR /app

EXPOSE 80

# survive on container shotdown, not removal
# removal via Docker CLI
# rmmoval on host fs
# readonly volumes $(PWD):/app:ro
VOLUME ["/app/node_modules"]

# snapshot of source code
COPY . .

# ENTRYPOINT ["node"]
ENTRYPOINT ["npm"]

# CMD ["server.js"]
CMD ["--watch", "server.js"]
```


```Dokceringnore
node_modules
.git
Dockerfile
```

with docker compose


mongodb/mongodb-community-server

### setup mongodb dev environment

```bash
# data store internally
$ docker run --name mongodb mongodb/mongodb-community-server \
    -v $(pwd)/data:/datadb \
     --network fintech-transaction \
     -e MONGO_INITDB_ROOT_PASSWORD=pass \
     -e MONGO_INITDB_ROOT_USERNAME=user


# expose a port using the -p argument if you need access the MongoDB server from another application running locally
# persist the data on your local machine, you can mount a volume using the -v argument.
# If your application is running inside a container itself, you can run MongoDB as part of the same Container network

# Using environment variables,  connect to mongodb, cloud-based or locally
 docker stop mongodb && docker rm mongodb
```

#### Using mongodb with Docker Compose

```yaml
serivces
  mongodb:
    image: mongodb/mongodb-community-server:6.0-ubi8
    environment:
      - MONGO_INITDB_ROOT_USERNAME=user
      - MONGO_INITDB_ROOT_PASSWORD=pass
    volumes:
      - type: bind
        source: ./data
        target: /data/db

```



## container  network


coreDNS

resolve service name

resolve  container to IP address

from container to other container
`docker inspect <container-name>`

```bash
# container ip lookup and resolved automatically
# delgate the heavy lifting to docker dameon to resolve IP address
# resolv container name as address
# sever discovery and montior engine
$ docker network ls
$ docker network create
```
from container to host machine

```
# use `host.docker.interneal` as address


```
from container to  external public network
container send request www(world wide web)
no special setup(work out of box) forn inside dockerlized application

## node process management for contaienrs

nodemon, pm2, forever

healthcheck

server, reverse-proxy, multi-thread shared cluster
server, reverse-proxy, single instance nodeserver
multi-replicas of the node server
standalone node server

PID 1

zombie process and handle the shutdown

signal (SINGINT/SINGTERM/SIGNKILL)




Database-as-a-Service
mongodb atlas




Severless: Backend-as-a-Service, Function-as-a-Service
Auth0, Firebase, Supabase
Scales per request, Never pay for idle

FaaS providers
AWS Lambda

Google Cloud Functions

Azure Functions

IBM Cloud Functions

Auth0 Webtask

Iron.io

Serverless Framework



## optiomize for production

### data storage mechanism
container
local host machine
remote host machine

volume are host machine drive/fs manged by docker, mounted into container
container write data into a volume and read data from it.

temporal runtime data, stores in container
(data is lost when we remove the container, not when we stop/shutdown the container)

sourcecode, read-only stored in image
permantent appcontainers and volumes

anoonymous volume is managed by docker dameon

COPY is just snapshot
mount presist if container shuts down



#### build-time arg and runtime Envrionment variables
docker run argument
-v
--env
--env-file

docker build argument
--build-arg
```dockerfile
ARG DEFAULT_PROT=80
ENV PORT $DEFAULT_PORT
EXPOSE $PORT

```

microservice criteria benchmark

IO speed
performance
scale

startup
availability
scaling

memomry overhead
efficiency
cost

chrome://inspect

## Quickstart

```bash
pnpm init
curl -o `https://raw.githubusercontent.com/$USER/$REPO/refs/heads/${BRANCH}/$FILE`
cp -rf $OS-$ARCH/$DIR ./$PROEJCT_DIR
```

```bash

#  docker-credential-helpers
bat $HOME/.docker/config.json

docker build -t nodeserver-run -f Dockerfile-run .
docker tag nodeserver-run opus0x13f/nodeserver:1.0.0
docker push opus0x13f/nodeserver:1.0.0
docker pull opus0x13f/nodeserver:1.0.0

```

## kubernets

self-healing
liveness and readiness check

live and ready to receive request

```http
<!-- request line -->
GET /ready HTTP/1.1
<!-- status line -->
HTTP/1.1 200 OK
<!-- unable to handling incoming request -->
HTTP/1.1 503 Service Unavailable
```

```yml values.yaml
image:
    repository: $HUB_USER/$IAMGE
    tag: $TAG_VERSION
    pullPolicy: IfNotPresent
    resources:
        requests:
            cpu: 200m
            memory: 300Mi
    readinessProbe:
        httpGet:
            path: /ready
            prot: 3000
        initialDelaySeconds: 3
        periodSeconds:3
    livenessProbe:
        httpGet:
            path: /live
            port: 3000
        intiialDelaySeconds: 40
        periodSeconds: 10
service:
    name: node
    type: NodePort
    servicePort: 3000

```

api gateway
pass authenitcaton
rate limiting/throttling
protocol translation

## tls enctryption channel

```bash
# untrusted self signed  certificate
openssl req -nodes -new -x509 -keyout secrets/private-key.pem -out secrets/certificate.pem -days 7 -config secrets/san.cnf
# install local ca and then self-signed
chmod +x scripts/generate-cert.sh
# cert sign request(CSR)
```

## security with hemlet.js

xss protection
https enforcement
clickjacking prevention
mime type sniffing protection
referr policy control
dns prefetching control

reverse proxy
load balancing
auth
cache

v8 node-binding
libuv asyncio networkio fsio

helmet
memcache

## authN/Z best practice

[lucida-example](https://github.com/orgs/lucia-auth/repositories?q=astro)
` v3.lucia-auth.com` or `lucida-auth.com`

auth/public api/service

session based
token based

api key rotation

[permit](https://www.permit.io/)

## endpoint routing and load balancing and proxy bypass

serverpool
mulit-thread work distribution

```bash
# benchmark test
# tcp connection = 100
# worker thread = 6
autocannon --connections 100 --duration 10 https://localhost:3000
```

serverpool loadbalancing

### routing schema

header-based
path-based
query-based
http method-base
host-based
content-based

development setup

QA/stage environment

product environment




## internal

 `chroot` command was introduced as part of the operating system, which changes the root directory of a process and its children


Control Groups(cgroups)

process containers


Containerization vs Virtualization

hypervisor: (hareware-level virtualization)host os -> guest os

containerization, also referred to as OS-level virtualization,


Docker is optimized for the deployment of applications, as opposed to machines


portable,transferable,across machines deployment,
