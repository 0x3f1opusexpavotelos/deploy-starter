

[docs/architecture]

## service management
```bash
sudo service caddy {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}
# change a running server active configuration(often called reload)
```


## configuration


multi-site organization


`/etc/caddy/Caddyfile`

By default, Nginx looks in the `/usr/share/caddy` directory for files to serve.


folder for static site to live in `/var/www`

`sudo chown -R $USER:caddy /var/www/ransomnia.cc ~/www

`usermod –aG <group> caddy`
`sudo usermod -aG caddy $USER`




```bash
# name script
pm2 start --name pokenmon-api src/server.js
```
