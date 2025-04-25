---
title: no vendor lock-in self-hoisted solution
tech: ELK stack(Elasticsearch、Logstash 和 Kibana), JAMSTACK, t3stack, 
---
# nginx



--tag gcr.io/PROJECT-ID/helloworld

docker pull ghcr.io/phusion/baseimage:noble-1.0.1


kubectl create deployment

kubectl apply -f config.yml

```Docklefile
FROM node:20-alpine AS base







WOKRDIR /app

COPY package*.json pnpm-lock.yaml yarn.loclk ./

RUN  \
    if [ -f bun.lock ]; then bun install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml]; then corepack enable pnpm && pnpm; \
    elif [ -f yarn.lock]; then yarn --frozen-lockfile; \
    elif [ -f package.json]; then npm ci; \
    else echo  "Lockfile not found."  && exit 1; \
    f

COPY ./package.json /app/packag.json

# run command as user

# Image Variants
#  the Docker registry and GHCR (GitHub Container Registry)

FROM nginx:stable-apline as runner

COPY index.html /usr/share/nginx/html/index.html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx"]
```

```compose.yml
 web:
    build:
        context: .
        Dockefile: Dockfile
  volumes:
   - ./templates:/etc/nginx/templates
  environment:
   - NGINX_HOST=foobar.com
   - NGINX_PORT=80

```


reverse proxy - load balance(hiden backend endpoint.replicate cert, single point failer transfer, health check) - backend routing - cache - api gateway

operate on layer 4, you gain access to tcp context
source ip, source port,
dest-ip, dest-port,
packet insepction(tls hello/ syn)

mysql protocol(layer 4 proxying is useful when nginx doesn't understand the protocol)
webrtc stream context

layer 7. we see the applcation, http/gRPC, websocket context
access to more context
`$request_uri` which page they wanna visit, `$host` where the client is come from
`header` `cookie`

tls: end-to-end encryption,termination, passthrough


proxy_connect
proxy_send
prxoy_read
proxy_next_upstream_timeout: time before Passing a request to the next server
proxy_next_upstream_tries
server-side timeout

nginx timeout ensure efficient use of resources

server web content

portal dashboard

## initial setup

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Before installing any new software, it's best practice to update your system's package index. This ensures that you have the latest updates and security patches.




sudo apt install bat neovim

#  to know which version of CentOS
cat /etc/centos-release
# to know which version of unbuntu
cat /etc/os-release


# add epel repo

# instal and enable service
sudo dnf install snapd
sudo systemctl enable --now snap.socket

sudo ln -s /var/lib/snapd/snap /snap


# link the `certbot` command to executable path
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

infra as code(IaC) provision infra in a reusable and compasable way

delgated management, inverse of control, vendor lock-in deployment

self-hoisting ,docker standalone

Push to Deploy

## Before you start
## server control panel

coolify
1panel
virtualmin

## mail server

mail transfer agent

sender policy framework

smtp credential

spf
dkim
dmarc
domainkey
ptr


```bash
docker run --rm -it \
-v "${PWD}/docker-data/certbot/certs/:/etc/letsencrypt" \
-v "${PWD}/docker-data/certbot/logs/:/var/log/letsencrypt" \
-p 80:80 \


sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL


sudo usermod -aG docker $USER
su - $USER
```

ssl for 465, tls for  587

server authentication protocol
```bash
systemctl status mariadb.service

nvim /etc/mysql/mariadb.conf.d
service mariadb restart

journalctl -xe
```
### rent server with public ip

host: connected network device or machine, laptop, phone,

server: web server, mail server, file server, dns server, db server


popagate across global dns network


>datacenter facility that rents out rack space to third parties for their servers or other network equipment

## configure security group



## non-root, sudo-enabled user connection

`ssh -i "~/.ssh/id.root@host.docker.droplet" -o IdentitiesOnly=yes opus@droplet`

```[~/.ssh/config]
Host droplet
    HostName 128.199.172.202
    User opus
    PreferredAuthentications publickey
    # IdentityOnly
    IdentityFile ~/.ssh/id.root@host.docker.droplet
    AddKeysToAgent yes
    # 连接的服务器的地址和端口作为变量并以参数的形式传递给 ProxyCommand  using socks5 tcp协议（ssh,sftp)
    ProxyCommand nc -X 5 -x 127.0.0.1:6153 %h %p
    # or using jump hosts
    ProxyCommand ssh jumphost -W %h:%p
```

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id.root@host.docker.droplet
ssh droplet

```


###  OS, Arch and hareware requirment

OS
-   Debian-based (e.g., Debian, Ubuntu)
-   Redhat-based (e.g., CentOS, Fedora, Redhat)
-   SUSE-based (e.g., SLES, SUSE, openSUSE)
-   Arch Linux
-   Alpine Linux
-   Raspberry Pi OS 64-bit (Raspbian)

Arch
-   AMD64
-   ARM64


::: info setup example
Andras runs his production apps on a server with:

Memory: 8GB (average usage: 3.5GB)
CPU: 4 cores (average usage: 20–30%)
Storage: 150GB (average usage: 40GB)
This setup comfortably supports:

3 NodeJS apps
4 Static sites
Plausible Analytics
Fider (feedback tool)
UptimeKuma (uptime monitoring)
Ghost (newsletters)
3 Redis databases
2 PostgreSQL databases
:::





## command prompt setup

`` .bashrc`
export PS1='[\u@\h \w]✗'
 ``




## Deploy solution


AWS EKS
Elastic Kubernetes Service

AWS ECS
Elastic Container Service

[flight control](https://www.flightcontrol.dev/?ref=docs-vite)
[kinsta](https://kinsta.com/static-site-hosting/)


## Deploy from Source



## Deploy built image





## GitHub integration

Webhooks

`https://api.github.com/meta ` to retive list of github ip address

use pre-built Docker images from public registries like Docker Hub or GitHub Container Registry

| Features              | Explainations                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Any Service           | Deploy static sites, APIs, backends, databases, and more with support for all major frameworks. |
| server arch           | single servers, multi-server setups, and Docker Swarm clusters                                  |
| Push to Deploy        | Git integration with GitHub, GitLab, Bitbucket, Gitea, and other platforms                      |
| Free SSL Certificates | Certificates Automatically sets up and renews Let's Encrypt SSL certificates for custom domains |
| No Vendor Lock-In     |                                                                                                 |
| Automatic Backups     |                                                                                                 |
| webHook               | Integrate with CI/CD tools like GitHub Actions, GitLab CI, or Bitbucket Pipelines.              |
| Monitoring            | Monitor deployments, servers, disk usage, uptime and receive alerts for issues                  |
| Email Notifications   |                                                                                                 |
| Backups               |                                                                                                 |
| Server Automations    |                                                                                                 |

built your image from dockerfile

✗

https://kamal-deploy.org/

https://www.coolify.io/

https://getdeploying.com/

https://w       ww.serverless.com/#How-It-works

## Networking


Wildcard Domain 






## DNS

### delegate the domain to use custom name servers.

manage name servers on our Domain registars admin panel/portal

confgiure DNS zone file on delegated DNS manage panel/console

configure SSL certificates for each Domain we hosting on ouer server using Let's Encrypt

## Record

A record maps an IPv4 address to a domain name

#### HOSTNAME

defines the hostname or subdomain to map. This can be:

-   The apex of a domain (@).
-   A subdomain prefix
-   A wildcard (\*)
    if any kind of DNS record exists for a subdomain, the existing record takes priority and the wildcard record is not applied.
    doesn’t have a DNS record for that subdomain, the wildcard record directs you to the resource or IP address specified in its WILL DIRECT TO field.

It is possible to add multiple records for the same DNS entry, each pointing to a different IP address. This supports a load distribution and balancing strategy known as Round Robin DNS.

### CNAME

`HOSTNAME`: defines the subdomain prefix for the new alias you want to create.
`IS AN ALIAS OF`:defines the hostname where the alias points to.

### MX

`HOSTNAME`
`MAIL PROVIDERS MAIL SERVER`

### TXT

primarily used to verify that you own a domain.

`VALUE` - contains the text string associated with the hostname
`google-site-verification`
`HOSTNAME` - hostname the record applied to

### SPF Records

contain lists of email servers that are authorized to send email on behalf of your domain.

### NS Records

servers that host your domain

`WILL DIRECT TO`

### CAA Records

CAA records specify which certificate authorities are permitted to issue certificates for a domain

### PTR (rDNS) Records

map domains name to an IP address.




#  delete the shortcut from the sites-enabled directory while keeping the server block in sites-available if you wanted to enable it.


````

## multi domain, multi-server organzation
```
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
# test if ant syntax error in config file
sudo nginx -t
sudo systemctl restart nginx
```



-   `/etc/nginx`: config directory. All of the Nginx configuration files reside here.
-   `/etc/nginx/sites-available/`: The directory where per-site server blocks can be stored.
-   `/etc/nginx/snippets`: reusable and coposable configuration fragments that can be included elsewhere in the Nginx configuration
-   `/etc/nginx/sites-enabled/`: The directory where enabled per-site server blocks are stored.
-   `/var/log/nginx/access.log`
-   `/var/log/nginx/error.log`

```bash [apache]

```

:::

dictate how the Apache web server will respond to various domain requests.

````bash
# install web server
# allow one server to host multiple domains
# Each domain that is configured will direct the visitor to a specific directory holding that site’s information,

# apache server identifies  the `/wwww/html` as root directory to server files from
# this need to be change when hostiing multi domain on one server

# Create the mulit-domain directory layout
# fore each domain we wanna host on server
sudo mkdir -p /var/www/0x13f.me/app
sudo mkdir -p /var/www/lavitalite.tech/app

# Manage PermissionsL: own by user not root

sudo chown -R $USER:$USER /var/www/0x13f.me/public_html
sudo chown -R $USER:$USER /var/www/lavitalite.tech/public_html
# grant read access to general web directory
sudo chmod u=rwx,og=rx 755 /var/www

# create site direcotry layout
# This directory layout (was introduced by Debian contributors)




#  tell server to look for virtual hosts in the sites-enabled directory.




# located in /etc/apache2/conf.d/ or /etc/httpd/conf.d/

# # they must end in .conf, put into `/etc/httpd/conf.d` and they will be loaded the next time the process is started or reload.
```
#  using the Include directive
IncludeOptional sites-enabled/*.conf
```






sudo vi /etc/httpd/sites-available/0x13f.me.conf

# delcare server name, listening port,
# root directory to server file from to site
# store access and error log

```
<VirtualHost *:80>
    ServerName www.0x13f.me
    ServerAlias 0x13f.me
    DocumentRoot /var/www/0x13f.me/public_html
    ErrorLog /var/www/0x13f.me/error.log
    CustomLog /var/www/0x13f.me/requests.log combined
</VirtualHost>
```


# hold all site config
sudo mkdir /etc/httpd/sites-available
# hold symbolic links to site config that we want to publish
sudo mkdir /etc/httpd/sites-enabled
# enable site to server
sudo ln -s /etc/httpd/sites-available/0x13f.me.conf /etc/httpd/sites-enabled/0x13f.me.conf
sudo ln -s /etc/nginx/sites-available/0x13f.me.conf /etc/nginx/sites-enabled/0x13f.me.conf

#check configuration for syntax error by typing
sudo apachectl configtest
# restart server config to make change take effect
sudo apachectl restart
````

## Database

```bash

SELECT user,authentication_string,plugin,host FROM mysql.user;
ALTER USER 'user'@'hostname' IDENTIFIED WITH mysql_native_password BY 'newPass';
FLUSH PRIVILEGES;
```

[server world](https://www.server-world.info/en/note?os=CentOS_Stream_9&p=freeipa&f=1)

NTP / SSH Server
DNS / DHCP Server
Storage Server
Virtualization
Container Platform
Cloud Compute
Directory Server
Web Server
Database
FTP / Samba / Mail
Proxy / Load Balance
Monitoring
Security
