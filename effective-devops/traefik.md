

## Arch

control-panel -> proxy agent -> cloud 



### Api service

> deploy service to sub-path
flight-api
pokemon-api
ticket-api
customer-api





router:
incoming request to the service that handle them

middlewares:
  tweak the request before they are sent to service

providers:



## Enable ssl

```yml
- 'traefik.http.routers.service.entrypoints=web-secure'
- 'traefik.http.routers.service.rule=Host(`service.apex.cc`)'
- 'traefik.http.routers.service.tls=true'
- 'traefik.http.routers.service.certresolver=default'

```

## Redirect to ssl

```yml
- 'traefik.http.middlewares.service-http.redirectscheme.scheme=https'
- 'traefik.http.middlewares.service-http.entrypoints=web'
- 'traefik.http.middlewares.service-http.rule=Host(`service.url`)'
- 'traefik.http.routers.service-http.middleware=service-https@docker'


```


```yml
traefik:
  image: traefik:v2.4
  ports:
    - 80:80
    - 443:443
  restart: unless-stopped
  volumes:
    - ./data/conf/tarefik/acme.json:/acme.json
    - ./data/conf/tarefik/tarefik.toml:/acme.json
    - ./data/volumes/tarefik/tmp.json:/tmp
mariadb:
  depends_on:
    - watchtower
  env_file: .mariadb.env
  image: mariadb:10
  restart: unless-stopped
  volumes:
    - ./data/volumes/mariadb:/var/lib/mysql
redis:
  image: redis:5
  volumes:
    - ./data/volumes/redis:/data
```


## adding service at scale

next cloud - file storage, calendar, contacts,etc

read it later -> wallbag

rss/news -> freshssr

shorturls
