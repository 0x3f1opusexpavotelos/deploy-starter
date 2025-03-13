portal dashboard

## initial setup

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Before installing any new software, it's best practice to update your system's package index. This ensures that you have the latest updates and security patches.

sudo dnf update -y
sudo dnf install python3
sudo dnf install python3-pip
pip3 install virtualenv

sudo dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
sudo dnf install -y neovim python3-neovim


#  to know which version of CentOS 
cat /etc/centos-release
# to know which version of unbuntu
cat /etc/os-release

# add epel repo 
sudo dnf install epel-release
sudo dnf upgrade
# imported into the base CentOS repos
# instal and enable service
sudo dnf install snapd
sudo systemctl enable --now snap.socket
# link `smap` command to executable path
sudo ln -s /var/lib/snapd/snap /snap
# installed snapd first in order to manage snap packages
sudo snap install core; sudo snap refresh core
# link the `certbot` command to executable path
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

infra as code(IaC) provision infra in a reusable and compasable way


delgated management, inverse of control, vendor lock-in deployment


self-hoisting ,docker standalone

Push to Deploy

## Before you start

### asign server floating/transferable ip


- rented server from a server provider to hoisied webiste

- can access via ssh

- non-root, sudo-enabled user

This could be:
- A VPS (Virtual Private Server)
- A Dedicated Server
- A Virtual Machine (VM)
- A Raspberry Pi 


### Supported Operating Systems

- Debian-based (e.g., Debian, Ubuntu)
- Redhat-based (e.g., CentOS, Fedora, Redhat)
- SUSE-based (e.g., SLES, SUSE, openSUSE)
- Arch Linux
- Alpine Linux
- Raspberry Pi OS 64-bit (Raspbian)

### Supported Architectures

- AMD64
- ARM64

###  Minimum Hardware Requirements



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




### Andras runs his production apps on a server with:

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



## command prompt setup

``.bashrc`
export PS1='[\u@\h \w]✗'
``

## SSH setup

1. edit ssh configuartion


```bash
vi /etc/ssh/sshd_config
```

Ensure these settings are present:
enable root login but disable w/ passwd
```ssh 
PermitRootLogin prohibit-password
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys
```

::: caution
Make sure to add your SSH keys to the `~/.ssh/authorized_keys` `/root/.ssh/authorized_keys` file before setting PermitRootLogin to prohibit-password, otherwise you may lock yourself out of the server.
:::


2. restart sshd service

```bash
systemctl restart sshd
```

### keep session alive

``~/.ssh/sshdconfig
Host *
    ServerAliveInterval 120
    ServerAliveCountMax 2

```


```/etc/ssh/sshd_config
ClientAliveInterval 120
ClientAliveCountMax 3
```


## GitHub integration
Webhooks

`https://api.github.com/meta ` to retive list of github ip address

use pre-built Docker images from public registries like Docker Hub or GitHub Container Registry


| Features| Explainations |
|---| ---|
|  Any Service | Deploy static sites, APIs, backends, databases, and more with support for all major frameworks.|
| server arch| single servers, multi-server setups, and Docker Swarm clusters|
|Push to Deploy | Git integration with GitHub, GitLab, Bitbucket, Gitea, and other platforms|
|Free SSL Certificates| Certificates	Automatically sets up and renews Let's Encrypt SSL certificates for custom domains|
|No Vendor Lock-In| |
|Automatic Backups| |
|webHook| Integrate with CI/CD tools like GitHub Actions, GitLab CI, or Bitbucket Pipelines.|
|Monitoring| Monitor deployments, servers, disk usage, uptime and receive alerts for issues|
|Email Notifications | |
|Backups ||
|Server Automations||



built your image from dockerfile


✗

https://kamal-deploy.org/

https://www.coolify.io/

https://getdeploying.com/

https://www.serverless.com/#How-It-works


## Networking


### Firewall setup




8000 (http), 6001 (websocket), 6002 (terminal), and 22 (SSH, or a custom port) (required)
 reverse proxy (Traefik or Caddy)


 https://developers.redhat.com/blog/2020/08/18/iptables-the-two-variants-and-their-relationship-with-nftables#the_kernel_api

- iptables-legacy.

- `nf_tables`: Often referred to as `iptables-nft`


```bash
sudo ufw app list
# add rule by specifying a name of the program
sudo ufw allow OpenSSH
# sudo ufw allow 22


ufw default deny incoming
ufw default allow outgoing


sudo ufw allow http
# sudo ufw allow 80/tcp

sudo ufw allow https
# sudo ufw allow 443/tcp
sudo ufw allow ssh
# sudo ufw allow 22/tcp
sudo ufw allow ftp
# sudo ufw allow 21/tcp
# smtp
sudo ufw allow 25/tcp
# imap
sudo ufw allow 143/tcp


# once you’ve defined all the rules you want to apply to your firewall
sudo ufw enable
# to disable
sudo ufw disable
# to reset
sudo ufw reset



# confirm change
sudo ufw status

# allow port range
# sudo ufw allow 6000:6007/tcp
# sudo ufw allow 6000:6007/udp

# ip address
# ufw allow from 111.222.333.444

# Deleting Rules
ufw delete allow ssh
```

```bash [firewall.sh]
# Flush all current rules from iptables
 iptables -F
# Allow SSH connections on tcp port 22
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Set default policies for INPUT, FORWARD and OUTPUT chains
 iptables -P INPUT DROP
 iptables -P FORWARD DROP
 iptables -P OUTPUT ACCEPT

# Accept packets from trusted IP addresses
 iptables -A INPUT -s 192.168.0.0/24 -j ACCEPT  # using standard slash notation

# Set access for localhost
 iptables -A INPUT -i lo -j ACCEPT

# Incoming http and https
sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT -p tcp -m multiport --dports 80,443 -m conntrack --ctstate ESTABLISHED -j ACCEPT

# Incoming SMTP
sudo iptables -A INPUT -p tcp --dport 25 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT

# Incoming IMAP
sudo iptables -A INPUT -p tcp --dport 143 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT



# Save settings
 /sbin/service iptables save
# List rules
 iptables -L -v
```

### SSL sertificates

-  Self-Signed 
-  Authority-signed
All subdomains (wildcard)

secures the domain’s apex and any subdomains that do not have an existing DNS records defined.


Select an existing subdomain:  secures the domain’s apex and only selected subdomains.

::: code-group

````bash

sudo certbot --nginx -d <example.com> -d <www.example.com>

#Certificate is saved at: /etc/letsencrypt/live/0x13f.me/fullchain.pem
#Key is saved at:         /etc/letsencrypt/live/0x13f.me/privkey.pem

```
limit_req_zone \$binary_remote_addr zone=mylimit:10m rate=10r/s;
server {


        server_name 0x13f.me www.0x13f.me;

#        root /var/www/0x13f.me/app;
        # location / {
        #         try_files $uri $uri/ =404;
        # }
         # Enable rate limiting
        limit_req zone=mylimit burst=20 nodelay;
        location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;

        # Disable buffering for streaming support
        proxy_buffering off;
        proxy_set_header X-Accel-Buffering no;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/0x13f.me/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/0x13f.me/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.0x13f.me) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = 0x13f.me) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name 0x13f.me www.0x13f.me;
    return 404; # managed by Certbot
}

````
```bash
ls -ld $(pwd)
sudo chown -R $(whoami):$(whoami) .
chmod u+rwx .
```

:::


````bash
sudo dnf install certbot -y

# SUID 4
# SGID = 2
# Sticky = 1
# GID allows a file to be executed as the group owner of the file;
#  a file created in the directory has its group ownership set to the directory owne
#  Only the owner (and root) of a file can remove the file within that directory. (o+t)

chmod 0755 /etc/letsencrypt/{live,archive}

# All generated keys and issued certificates can be found in /etc/letsencrypt/live/$domain,

# fullchain.pem  server certificate
# renwew
sudo nvim /etc/letsencrypt/renewal/<domain>.conf

sudo nvim /etc/htttpd/conf.d/0x13f.me.conf

```
<VirtualHost *:443>
    ServerName 0x13f.me
    DocumentRoot /var/www/ssl-test
    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/pki/tls/private/apache-selfsigned.key
</VirtualHost>


<VirtualHost *:80>
    ServerName 0x13f.me
    Redirect / https://0x13f.me
</VirtualHost>
```



```
<VirtualHost *:443>
    ServerName 0x13f.me
    DocumentRoot /var/www/ssl-test
    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/pki/tls/private/apache-selfsigned.key
</VirtualHost>

# redirect
<VirtualHost *:80>
    ServerName 0x13f.me
    Redirect / https://0x13f.me
</VirtualHost>
```
````

## DNS

### delegate the domain to use custom name servers.

manage name servers on our Domain registars admin panel/portal

confgiure DNS zone file on delegated DNS manage panel/console

configure SSL certificates for each Domain we hosting on ouer server using Let's Encrypt

## Record

 A record maps an IPv4 address to a domain name

#### HOSTNAME 

defines the hostname or subdomain to map. This can be:

- The apex of a domain (@).
- A subdomain prefix
- A wildcard (*)
 if any kind of DNS record exists for a subdomain, the existing record takes priority and the wildcard record is not applied.
 doesn’t have a DNS record for that subdomain, the wildcard record directs you to the resource or IP address specified in its WILL DIRECT TO field.


It is possible to add multiple records for the same DNS entry, each pointing to a different IP address. This supports a load distribution and balancing strategy known as Round Robin DNS.


### CNAME

`HOSTNAME`:  defines the subdomain prefix for the new alias you want to create.
`IS AN ALIAS OF`:defines the hostname where the alias points to. 

### MX 

`HOSTNAME`
`MAIL PROVIDERS MAIL SERVER`


### TXT


 primarily used to verify that you own a domain.

`VALUE` -  contains the text string associated with the hostname
`google-site-verification`
`HOSTNAME` -  hostname the record applied to


### SPF Records

 contain lists of email servers that are authorized to send email on behalf of your domain.

### NS Records


servers that host your domain

`WILL DIRECT TO`


### CAA Records  

CAA records specify which certificate authorities are permitted to issue certificates for a domain


### PTR (rDNS) Records 


map domains name to an IP address.


## web server
::: code-group
````bash [nginx]
# manage nginx process 
sudo systemctl status nginx # stop,start,restart,reload,disable,enable (sudo nginx -t error checking in config)


# multi-domain content layout
# nginx default serve file from directory `/var/www/html`
sudo mkdir -p /var/www/<your_domain>/html
sudo chown -R $USER:$USER /var/www/<your_domain>/html
# grant only read and execut to others
sudo chmod -R 755 /var/www/<your_domain>
nvim /var/www/<your_domain>/html/index.html

# setup server blocks
sudo nvim /etc/nginx/sites-available/<your_domain>

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/your_domain/html;
        index index.html index.htm index.nginx-debian.html;

        server_name your_domain www.your_domain;

        location / {
                try_files $uri $uri/ =404;
        }
}
```
#  delete the shortcut from the sites-enabled directory while keeping the server block in sites-available if you wanted to enable it.
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
# test if ant syntax error in config file
sudo nginx -t
sudo systemctl restart nginx

````
- `/etc/nginx`: config directory.  All of the Nginx configuration files reside here.
- `/etc/nginx/sites-available/`: The directory where per-site server blocks can be stored.
- `/etc/nginx/snippets`: reusable and coposable configuration fragments that can be included elsewhere in the Nginx configuration
- `/etc/nginx/sites-enabled/`: The directory where enabled per-site server blocks are stored.
-  `/var/log/nginx/access.log`
-  `/var/log/nginx/error.log`

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


# on Redhat-based (e.g., CentOS, Fedora, Redhat)
sudo vi /etc/httpd/conf/httpd.conf
# on Debian-based (e.g., Debian, Ubuntu)
sudo vi /etc/apache2/apache2.conf
# nginx
sudo vi /etc/nginx/nginx.conf


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