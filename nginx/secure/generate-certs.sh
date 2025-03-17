#!/bin/bash

# ssL_type manual,letsencrpt,self-signed

#chmod +x generate-certs.sh
mkdir -p certs

# create and install local ca
mkcert -CAROOT && mkcert -install
# generate cert
mkcert -cert-file certs/cert.pem -key-file certs/key.pem  '*.self-sign.local' localhost 127.0.0.1 ::1