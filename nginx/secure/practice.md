## local CA sign 

```bash
$ brew install mkcert
# create and install localCA
$ mkcert -CAROOT                                 
/Users/ayao/Library/Application Support/mkcert
mkcert -install
$ mkcert -cert-file certs/cert.pem -key-file certs/key.pem  '*.self-sign.local' localhost 127.0.0.1 ::1


docker compose exec nginx bash
nginx --signal reload
```




## public trusted CA sign

````bash
$ brew install letsencrypt

sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL

# Ensure SSL files exist or generate them
if [ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]; then
  sudo wget https://raw.githubusercontent.com/certbot/certbot/main/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf -P /etc/letsencrypt/
fi

if [ ! -f /etc/letsencrypt/ssl-dhparams.pem ]; then
  sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
fi

# cert file location
```
ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
```
# copy cert to container

````

## check your cert config

issued by public-trusted CA

## certificates
Certificates bind a public crypto key to a domain name


## certificates lifecycle managemnt

acitons you coould take:
- issue
- revoke
- renew
- install

cert-chain classify as:
- root
- intermidate
- leaf (server)

bundle crts to chain
`cat www.server.com.crt intermeidate.crt root.crt > www.server.com.chained.crt`
`cat www.server.com.crt bundle.crt > www.server.com.chained.crt`

CA public trusted and distributed w/ the user agent and the os


involed partises: domain owner, user agent, Certificate Authority

### install on server


## Certificate logs


[certificate transparency](https://certificate.transparency.dev/)
Certificates are issued by CAs. Web PKI requires user agents and domain owners to trust that 
CAs are tying domains to the right domain owners. 
A user agent is something that acts on behalf of a user, usually a browser.



post-issuance validation 


## TLS, PKI 

tls protocol support check


```
 SSLv2      not offered (OK)
 SSLv3      not offered (OK)
 TLS 1      not offered
 TLS 1.1    not offered
 TLS 1.2    offered (OK)
 TLS 1.3    offered (OK): final
```
testssl.sh 

certigo.sh

sslyze

## certificate info layout


Issued To

Common Name(CN)
Organization(O)
Organziation Unit(OU)

Issued By
Common Name(CN)
Organziation(O)
Organization Unit(Ou)

Validity Period

Issued on
Expires on


ShA-256 Fingerpirnts
    certificate
    public key








## letsencrypt certificates management

where can i found my certificate ?
All generated keys and issued certificates can be found in /etc/letsencrypt/live/$domain,
where $domain is the certificate name
The certificate name`$domain` used in the path /`etc/letsencrypt/live/$domain` follows this convention:
- it is the name given to --cert-name,
- if --cert-name is not set by the user it is the first domain given to --domains,
- if the first domain is a wildcard domain (eg. *.example.com) the certificate name will be example.com,
- if a name collision would occur with a certificate already named example.com, the new certificate name will be constructed using a numerical sequence as example.com-001.

cert.pem - server crt
chain.pem - bundle intermidate cert that web browsers will need in order to validate the server certificate
fullchain.pem


base directory layout
`/var/lib/letsencrypt`: `--work-dir`  
`/var/log/letsencrypt`:`--logs-dir`
`/etc/letsencrypt`: `--config-dir`
`/etc/letsencrypt/{live,archive}`: `--data-dir` cert locatoin
`/etc/letsencrypt/renewal`: renew config


Rather than copying, please point server configuration directly to those files ( create symlinks)
During the renewal, /etc/letsencrypt/live is updated with the latest necessary files.



fullchain.pem（完整的证书链）
privkey.pem（私钥）
cert.pem（网站证书）
chain.pem（中间证书）

### for docker deploy

Getting a certificate using  standalone mode
```bash
# Stop Nginx temporarily to allow Certbot to run in standalone mode
# certbot bind to port 80 in order to perform domain validation on behalf of you.
sudo systemctl stop nginx

# Obtain SSL certificate using Certbot standalone mode
sudo apt install certbot -y
sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL
```


Add the environment variable SSL_TYPE=letsencrypt.
Mount your local letsencrypt folder as a volume to `/etc/letsencrypt`.
```dockerfile
services:
  mailserver:
    hostname: mail.example.com
    environment:
      - SSL_TYPE=letsencrypt
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt
```

for auto renew

Create two files (service unit for command + timer unit):

`/etc/systemd/system/dms-certbot-renew.service`:
```
[Unit]
Description=DMS certificates renewal

[Service]
Type=oneshot
ExecStart=docker run --rm -it \
  -v "/path/to/docker-data/certbot/certs/:/etc/letsencrypt/" \
  -v "/path/to/docker-data/certbot/logs/:/var/log/letsencrypt/" \
  -p 80:80 \
  -p 443:443 \
  certbot/certbot renew
```

`/etc/systemd/system/dms-certbot-renew.timer`:
```
[Unit]
Description=Timer for DMS certificates renewal

[Timer]
Persistent=true
OnCalendar=daily
# Daily (long-form syntax) at 4am instead of midnight (local timezone):
#OnCalendar=*-*-* 4:00:00
# Alternatively, twice daily (randomly within their 12 hour span):
#OnCalendar=*-*-* 00,12:00:00
#RandomizedDelaySec=43200

[Install]
WantedBy=timers.target
```
Then activate the timer:
```bash
# `--now` is equivalent to `systemctl start ...` (activate timer)
# `systemctl enable ...` persists timer activation across reboots
systemctl enable --now dms-certbot-renew.timer

# Inspect timer status or service logs:
systemctl status dms-certbot-renew.timer
systemctl list-timers
# system dameon log journalctl --user-unit
journalctl -u dms-certbot-renew.service
# gorup change take effect
sudo usermod -aG systemd-journal $USER
su --login $USER

```


or just use crontab

```dockefile
services:
  certbot-cloudflare-renew:
    image: certbot/dns-cloudflare:latest
    command: renew --dns-cloudflare --dns-cloudflare-credentials /run/secrets/cloudflare-api-token
    volumes:
      - ./docker-data/certbot/certs/:/etc/letsencrypt/
      - ./docker-data/certbot/logs/:/var/log/letsencrypt/
    secrets:
      - cloudflare-api-token
```
```bash
0 0 * * * docker compose -f PATH_TO_YOUR_DOCKER_COMPOSE_YML up certbot-cloudflare-renew
```


 DNS challenge  put that record at _acme-challenge.<YOUR_DOMAIN>

http challenge `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`


Bring Your Own Certificates

```bash
volumes:
  - ./docker-data/dms/custom-certs/:/tmp/dms/custom-certs/:ro
environment:
  - SSL_TYPE=manual
  # Values should match the file paths inside the container:
  - SSL_CERT_PATH=/tmp/dms/custom-certs/public.crt
  - SSL_KEY_PATH=/tmp/dms/custom-certs/private.key
```

```bash
openssl s_client \
  -connect 0.0.0.0:25 \
  -starttls smtp \
  -CApath /etc/ssl/certs/

openssl s_client \
  -connect 0.0.0.0:443 \
  -CApath /etc/letsencrypt/live/$DOMAIN
```






cfssl
smallstep

SSL_TYPE=self-signed

## crt verification process

epxpired?  notBefore, NotAfter
isvalid?  root certifcate(os or browser ditriubte and trust with)  public key verify sign
isMatch?

zerossl
traefix


 Inbox Drafts, Sent, Junk and Trash 

 mail push

 IP blacklisting delisting

 rDNS
 
 https://www.crowdsec.net/


 detects and blocks attackers using log analysis

 What are DMARC, DKIM, and SPF? D
SPF list all the servers IPS that are allowed to send emails from the domain
DKIM  "sign" emails from their domain
A DKIM record stores the domain's public key, and mail servers receiving emails from the domain can check this record to obtain the public key

DMARC（Domain-based Message Authentication Reporting and Conformance）

A DMARC record can also contain instructions to send reports to domain administrators about which emails are passing and failing  emails that fail SPF or DKIM checks. mark spam, reject such emails, or to deliver

Where are SPF, DKIM, and DMARC records stored?
How to check if an email has passed SPF, DKIM, and DMARC？
How to set up DMARC, DKIM, and SPF record for a domain


格式：账号，密码，二步验证密钥
mm89473@commonwealthu.edu
