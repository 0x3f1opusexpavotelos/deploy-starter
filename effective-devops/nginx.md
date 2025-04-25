

## nginx management

### logging


```bash
sudo tail --follow /var/log/nginx/error.log
sudo tail --follow /var/log/nginx/access.log
```

### logging, stream & redirection

```bash
# | #read from stdout
# > # write stdout to file
# >> # append stdout to file
# < # read from stdin
# 2>&1 # redirect both stderr and stdout

# search file name
sudo find /var/log -type f  -name '*.log" 
sudo find / -type d -name log
sudo tail --follow /var/log/nginx/error.log
sudo tail --follow /var/log/nginx/access.log

# search file content
rg
```

### meta info

```bash [nginx]
# manage nginx process
service nginx
Usage: nginx {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}
#   -s signal     : send signal to a master process: stop, quit, reopen, reload
nginx -s reload

apt show nginx

ps axf | grep nginx

batcat /etc/nginx/nginx.conf

```





# stream module
docker compose exec nginx bash


``` [/etc/nginx/nginx.conf]
http {
    # Virtual Host Configs
     include /etc/nginx/conf.d/*.conf;
     include /etc/nginx/sites-enabled/*;
}



# multi-domain content layout
# nginx default serve file from directory `/var/www/html`
sudo mkdir -p /var/www/<your_domain>/html
sudo chown -R $USER:$USER /var/www/<your_domain>/html
# grant only read and execut to others
sudo chmod -R 755 /var/www/<your_domain>
nvim /var/www/<your_domain>/html/index.html

# setup s
sudo nvim /etc/nginx/sites-available/<your_domain>
```



## default serve direcotory

By default, Nginx looks in the `/usr/share/nginx/html` directory for files to serve.
