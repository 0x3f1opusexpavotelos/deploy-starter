(Usage statistics and market shares of web servers)[https://w3techs.com/technologies/overview/web_server]

litespedd web server
LiteSpeed redirects non trusted visitors to a static page when the server detects high load.
moving reCAPTCHA from the application level to the server level.

apache web server

nginx web server

## cron job
server timezone
```bash
sudo timedatectl | grep Europe
# server timezone match local timezone
suod timedatectl set-timezone

```

## memory management

swap parition (space on a disk that is used when the physical memory is full)
so you need to create a swap file

how much swap space do i need?

how do i addd more swap
````bash
# backup for reverse  and reset those change
sudo cp /etc/fstab fstab.bak

sudo cp fstab.bak fstab


#2gb = 2*1024*1024 = 2097152
# 4gb = 4*1024*1024 = 4194304
sudo dd if=dev/zero of=/swapfile bs=1024  count=4194304
# kernal paramete
sudo sysctl -a | grep vm.swappiness
# modify kernal parameter
ls /etc/sysctl.d/
sudo nvim /etc/sysctl.d/
```
vm.swappiness = 1
vm.vfs_cache_pressure = 50
```
# shared memory
# storage drive
df -h
cat /proc/mounts

````

## network

99cent dns

```bash
# congress control
# bottleneck bandwidth and RTT
# throughput and latency

```

## process management



- email server
- file server






Mailu.io

twilo
```bash [.msmtprc]

tls on
tls_startttls on
tls_trust_file /etc/ssk/certs/ca-certifacates.crt
logfile ~/.msmtp.log
account NAME

host smtp.gmail.com
port 587
auth on
user vps@gmail.com
password
from
```
email apis, stmp relay, wehook

configure the server send email from command line
gmail api smtp pop or imap
dkim spf, dmarc, reverse DNSsmtp2g0
mailgun
resend
mailjet
sendgrid
domain mail server
zoho

test nginx configuration before reload

```bash
sudo nivm /etc/nginx/sites-abialable/default
nginx -t

nginx -s reload

# create site directory

# server and site monitoring
# upitme robot, netdata

```

nginx context

main
events
http
server
location

stream
proxy_bypass
