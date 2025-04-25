## route53
purchase domain with any Domain Registar(namecheap, godaddy)
delegate route 53 DNS service to manage DNS record
host our dns record on route 53 authorization nameserver

dns responding
geolocation based
weight based
health-check and failover
latency based
geoproximty bias

## s3

application hosting
media storage
datalke


versioning 
replication
static hoisting
setup bucket policy allows public read
bucket -> `<created bucket>` -> permission -> bucket policy -> edit -> policy generator
bucket -> `<created bucket>` -> objects -> upload -> add file -> policy generator

requester pays vs owners pays

event notification
objectCreated
objectRemoved
objectRestore
replication



cors origin request enable

bucket -> `<created bucket>` -> permission -> cross-origin resource sharing

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```


access log


edit and delete lock
write once read many model
object rendition


groups and access point

admin
sales
analytics


## aws cloudfront
content delivery network

access control

geo restriction

allowlist
blocklist

cache invalidation all files(*) or subtree path (/images/*)
force cache refresh ttl bypass, expires bypass

## global accelerator and cdn

global access, latency due to hops

anycast ip: all servers hold the same ip addres

unicase ip: one server hold many ip address

anycast ip:  send traffic directly to edge location
edge location send traffic to your application

## lamaba function

## ec2

## elastic container service



## dynamoDB

nosql db

partition key

hot key read

column store insert

conditional write
concurrent write
atomic write
batch write


indexing s3 object metadata

app -> upload -> s3 -> invoke -> lambda func -> store object metadata -> dynamoDB

aggregate data, total storage
seaching by
list all objects by certain attribute
find all objects by within a date range



table cleanup

scan table + delete item
drop table + recreate table


## API gateway
