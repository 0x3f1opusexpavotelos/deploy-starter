## sever control panel

```bash
sudo docker run caddy caddy hash-password -p <secret>


# status
docker ps --format "table {{.Names}}\t{{.Status}}"
# Stats for all running containers
docker ps -q | xargs docker stats

# Remove all stopped containers
docker ps -aq --filter status=exited | xargs docker rm



# stop all running containers
docker stop $(docker ps -q)

# stop all running container start with coolify
docker ps --filter "name=^/coolify" --format "{{.ID}}" | xargs -r docker stop

# remove all containers
docker rm $(docker ps -aq)

# remove all image
docker rmi $(docker images -q)
# remove  filter
docker rmi $(docker images | grep tensorflow | awk "{print \$3}")
docker rm $(docker ps -a | grep tensorflow | awk "{print \$1}")
```


deploy a github repo with existing docker-compose file



docker internal network
resolve to hostname



```
version: '3'

services:
  reverse-proxy:
    image: traefik:alpine
    command: --api --docker
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  whoami:
    image: emilevauge/whoami
    labels:
      - "traefik.frontend.rule=Host:whoami.docker.localhost"

  monitoring:
    image: nicolargo/glances:latest
    restart: always
    pid: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      # Uncomment the below line if you want glances to display host OS detail instead of container's
      # - /etc/os-release:/etc/os-release:ro
    environment:
      - "GLANCES_OPT=-w"
    labels:
      - "traefik.port=61208"
      - "traefik.frontend.rule=Host:glances.docker.localhost"
```
