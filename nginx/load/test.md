- exa
- bat
- httpie
- icdiff
- diff-so-fancy
- rsync
rsync -av -e 'ssh -i ~/.ssh/id.root@host.docker.droplet' ./ opus@droplet:/test

```bash
docker compose up
watch --interval 0.5 --differences curl localhost

api.<project>.orb.local
database.<project>.orb.local
```

	    highlight Cursor gui=reverse guifg=NONE guibg=NONE
	    highlight Cursor gui=NONE guifg=bg guibg=fg

```bash
$ curl -vvvv https://registry-1.docker.io/v2/


curl --trace  - https://registry-1.docker.io/v2/

openssl s_client -showcerts -connect registry-1.docker.io:443 </dev/null

$ python -m site --user-base
$ python -m pip show httpie
Location: /Users/ayao/Library/Python/3.9/lib/python/site-packages
$ ls /Users/ayao/Library/Python/3.9/bin/
$ ln -s /Users/ayao/Library/Python/3.9/bin/httpie ~/.local/bin/httpie


$ cdiff -W =(http -v localhost:3000) =(http -v localhost)
$ http local/header
```


```yml
services:
    nginx:
        build:
            contenxt: ./docker-config/nginx
            dockerfile: ./Dockerfile
        env_files: &env
         - ./cms/.env
        init: true
        labels:
            - dev.orbstack.domains=node.local
        prots: 
            - "8000:80"
        volumes:
            "./nginx,conf:/etc/nginx/nginx.conf"


```


dcoker desktop alternatvie

1. Qovery
2. Rancher Desktop
3. Podman Desktop
4. OrbStack