http --follow https://registry-1.docker.io/v2/


proxy settings docker dameon and docker container



## linux

### dameon
```bash
sudo systemctl edit docker.service
```
or

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
```


```
[Service]
Environment="HTTP_PROXY=http://proxy.company.private:3128"
Environment="HTTPS_PROXY=http://proxy.company.private:3128"
Environment="NO_PROXY=localhost,127.0.0.1"
```

reload to make change take effect
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```
verify the config has been loaded  and matches the changes you made,
```bash
sudo systemctl show --property=Environment docker
```

### container

```bash
docker run --rm  \
--env http_proxy="http://172.31.63.2:3128" \
--env http_proxy="http://172.31.63.2:3128" \
nginx bash -c "curl -I google.com"
```

### container proxy config

use `$USER_HOME/.docker/config.json`
provide default proxy settings for all new containers started by $USER

```json
{
    "proxies": {
      "default": {
        "httpProxy": "http://127.0.0.1:6152",
        "httpsProxy": "http://127.0.0.1:6152",
        "noProxy": "localhost,127.0.0.0/8",
        "allProxy": "socks5://127.0.0.1:6153"
      }
    }
   }
```
### verify the proxy setting

```bash
dokcer run --rm nginx bash -c "echo \$http_proxy"
docker compose exec nginx sh -c "echo \$http_proxy"
```

 

 ## macos

~/.orbstack/config/docker.json
~/.orbstack/config/dameon.json


 /etc/docker/daemon.json

```bash

orb config docker
```

 ```json
{
    "proxies": {
        "http-proxy": "http://127.0.0.1:6152",
        "https-proxy": "http://127.0.0.1:6152",
        "no-proxy": "localhost,127.0.0.0/8",
    }
}

 ```

```bash
orb restart docker
```


log in to dockerhub
```bash
echo "<your-passwd>" |docker login -u opus0x13f --password-stdin
```



```bash
$ docker compose up -d
$ docker compose logs <service_name …>
$ docker ps -a --filter "status=exited" 
$ docker rm $(docker ps -a -q)
$ docker compose execut 
```




