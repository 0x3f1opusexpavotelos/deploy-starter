from cloud hosting to cloud native

api gateway
networking
observability and analysis
load balancer and reverse proxy

[cloudnativejs](https://cloudnativejs.io/)

be comfortable with

how to take a Node.js app and ...

package an applcation so that is can run in a self-contained container using Dockerfile

deploy it to kubernetes(orchestration layer) using helm

run it at sacle with multiple instance

self-healing using health checks

metrics monitor with prometheus and grafana

request tracing, logging using openTracing, Zipkin and Jaeger

martin fowler

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
