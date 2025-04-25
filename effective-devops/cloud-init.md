## Transfer local file to remote


```bash
# transfer local file to remote using sftp, scp, or rsync
# copy all from local to remote (Upload)
sftp droplet:/home/opus/app/ <<< $'put .env ' # multi file
sftp droplet:/var/www/ransomnia.cc <<< $'put static' # put directory inside
sftp droplet:/var/www/ransomnia.cc <<< $'put -r static/*' # put content inside

# transfer multi file 
scp index.html script.sj styles.css opus@ransomnia.cc:/var/www/ransomnia.cc

# copy all from local to remote (Upload)
scp -r static opus@ransomnia.cc:/var/www/ransomnia.cc
scp -r static droplet:/var/www/ransomnia.cc

#  copy all from Remote Location to Local Location (Download)
scp -r username@hostname:/path/from/remote /path/to/local

rsync -av .env opus@droplet:/home/opus/app/
rsync -av static opus@droplet:/var/www/ransomnia.cc/
rsync -av static/ opus@droplet:/var/www/ransomnia.cc/

# shipped source code to deploy server
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/<id_root@aws-ec2-1>" \
. root@<ip or domain>:~/apps/<app name>
```


## DB

```bash [postgres]
sudo systemctl enable --now postgresql

--- postresql
CREATE DATABASE <db_name>;
CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <username>;
```


```bash [mysql]
sudo apt install mysql-server
sudo systemctl enable --now mysql-server

CREATE DATABASE <portfolio>;
CREATE USER <'spike'@'localhost'> IDENTIFIED WITH mysql_native_password BY <'pass'>;
GRANT ALL PRIVILEGES ON DATABASE <portfolio.*> TO <'spike'@'localhost'>;
```

run as systemd
```bash
sudo vim /etc/systemd/system/<portfolio>.service
```

```toml
[Unit]
Description=app:portfolio
After=network.target multi-user.target

[Service]
User=<spike>
WorkingDirectory=</home/spike/apps/portfolio>
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/etc/profolio.env
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=portfolio

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now portfolio.service
sudo journalctl  -u portfolio.service
```





The user and group are only one half of the picture
the ownership. The other half is the actual permissions.
```bash
sudo chown -R $USER:$USER /webroot

```


> tmux sessions window panel


## password manager



## secert manager

[doppler ](https://www.doppler.com/) secert rotate, co-location



## Service Running

## DOMAIN setup

```bash
# check if DNS record had propagated
nslookup ransomnia.cloud
```

## SSH setup

1. edit ssh configuration

```bash
vi /etc/ssh/sshd_config
```

Ensure these settings are present:

[all root ssh login with private key but disable passwd auth with passwd](https://viz.greynoise.io/tags/ssh-bruteforcer-attempt)

[change default ssh connection port from automated port scanning]

```ssh
PermitRootLogin prohibit-password
# PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile  /root/.ssh/authorized_keys
```
```bash
ssh-copy-id user@hostname
```


::: caution
Make sure to add your SSH keys to the `~/.ssh/authorized_keys` `/root/.ssh/authorized_keys` file before setting PermitRootLogin to prohibit-password, otherwise you may lock yourself out of the server.
:::


2. restart sshd service

```bash
systemctl restart sshd
```

### keep session alive

``~/.ssh/sshd_config
Host \*
ServerAliveInterval 120
ServerAliveCountMax 2
````


```/etc/ssh/sshd_config
ClientAliveInterval 120
ClientAliveCountMax 3
````


### generat ssh key pair

```
ls -la ~/.ssh

# remove existing deprecrated ssh key pair
rm ~/.ssh/id_github ~/.ssh/id_github.pub

# generate new key pair
ssh-keygen -t ed25519 -b 4096 -f $HOME/.ssh/id.root@host.docker.droplet  -q -N "" -C root@droplet

# copy public key to server-side for auth
pbcopy < ~/.ssh/id.root@host.docker.droplet

# paste to server-side
nvim ~/.ssh/authorized_keys

# config identify file
nvim  ~/.ssh/config

# use just generated private key
```txt [~/.ssh/config]
Host github.com
    Port 443
    HostName ssh.github.com
    User 0x3f1opusexpavotelos
    ProxyCommand /usr/bin/nc -X 5 -x 127.0.0.1:6152 %h %p
    AddKeysToAgent yes
    IdentitiesOnly yes
    IdentityFile ~/.ssh/id_github

# test connection
ssh -T git@github.com
ssh  -i "~/.ssh/id.root@host.docker.ec2" root@ec2
````

## sever side
```bash
mkdir ~/.ssh
sudo nvim ~/.ssh/authorized_keys
```


## API lifecycle management


API DESIGN
API MOCKING
API GATEWAY
API TESTING
API PORTAL

all-in-one solution
mix best-of-breed solution



## Reverse proxy 

management multi site

- Traefik  
- Caddy

forwarding http request to target service

the host header driver sever selection 
you can have multi service listen on same port
`curl localhost:8081 -v -H "Host:<domain>"`


deploy service at scale

### Firewall setup
inbound rules
allow tcp port （端口放行）
- 80 (http)
- 443 (https)
- 8090 (dashboard)
- 6001 (websocket)
- 6002 (terminal)
- 22 (SSH, or a custom port) (required)

```bash
sudo ufw app list
# add rule by specifying a name of the program
sudo ufw allow OpenSSH


# sudo ufw allow 22
ufw default deny incoming
ufw default allow outgoing


sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# ssh
# sudo ufw allow 22/tcp
# ftp
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
# sudo ufw allow 8000:9000/tcp

# ip address
# ufw allow from 111.222.333.444

# Deleting Rules
ufw delete allow 22/tcp
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



### TLS certificates


-   Self-Signed
-   Authority-signed
-   All subdomains (wildcard)

secures the domain’s apex and any subdomains that do not have an existing DNS records defined.

Select an existing subdomain: secures the domain’s apex and only selected subdomains.



````bash
sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL

# All generated keys and issued certificates can be found in /etc/letsencrypt/live/$domain
#Certificate is saved at: /etc/letsencrypt/live/<domain>/fullchain.pem
#Key is saved at:         /etc/letsencrypt/live/<domain>/privkey.pem

```[nginx/default.conf]
server {
        location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Disable buffering for streaming support
        proxy_buffering off;
        proxy_set_header X-Accel-Buffering no;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
    if ($host = $DOMAIN_NAME) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = www.$DOMAIN_NAME) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;
    server_name $DOMAIN_NAME $DOMAIN_NAME;
    return 404; # managed by Certbot
}
````




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




# renew
sudo nvim /etc/letsencrypt/renewal/$DOMAIN_NAME.conf
sudo nvim /etc/httpd/conf.d/$DOMAIN_NAME.conf

```
<VirtualHost *:443>
    ServerName $DOMAIN_NAME
    DocumentRoot /var/www/ssl-test
    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/pki/tls/private/apache-selfsigned.key
</VirtualHost>

<VirtualHost *:80>
    ServerName $DOMAIN_NAME
    Redirect / https://$DOMAIN_NAME
</VirtualHost>
```




## Automated deployment

- pushed to deploy
watchtower

## Monitor


ELK stack

new relic
datadog

uptime monitor

uptimeRobot
pingdom
statuscake
datadog



## Analytics

[plausible](https://plausible.io/)
[sentry]()
[posthog]()
[datadog]()
[onedollarstat]()



## Headless CMS
Headless CMS (content publishing management):
[ghost]()
[payload]()
[strapi](https://strapi.io/)
[wordpress]()


## file service and cdn

cloudfront, uploadthing, s3, minio
