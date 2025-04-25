#!/bin/bash

# pefer noprompt over manual
#chmod +x generate-certs.sh

# exit and return status
# test condition

set -e  

CERT_DIR="cert-mkcert"
mkdir -p "${CERT_DIR}"

# 检查本地CA是否已安装
check_local_ca_installed() {
  local ca_root=$(mkcert -CAROOT 2>/dev/null)
  if [ -d "${ca_root}" ] && \
     [ -f "${ca_root}/rootCA-key.pem" ] && \
     [ -f "${ca_root}/rootCA.pem" ]; then
    echo "✅ Local CA installed (path: ${ca_root})"
    return 0
  else
    return 1
  fi
}

# install local ca if not exist
install_local_ca() {
    echo "⏳ installing Local CA..."
    mkcert -install
}

# generate cert
generate_certs() {
  echo "🔄 install ca to dir: ${CERT_DIR}"
  mkcert -cert-file "${CERT_DIR}/cert.pem" \
         -key-file "${CERT_DIR}/key.pem" \
         '*.self-sign.local' '*.local' localhost 127.0.0.1 ::1
}


main() {
    check_local_ca_installed
    if [ $? -ne 0 ]; then
       install_local_ca
    fi
    generate_certs
    # print done message
    echo "🎉 cert install completed"
}


main