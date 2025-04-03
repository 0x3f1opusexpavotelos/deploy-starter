#!/bin/bash

# ssL_type perfer noprompt over manual


set -e  

CERT_DIR="certs"
mkdir -p "${CERT_DIR}"

# 检查本地CA是否已安装
check_local_ca_installed() {
  local ca_root=$(mkcert -CAROOT 2>/dev/null)
  if [ -n "${ca_root}" ] && \
     [ -f "${ca_root}/rootCA-key.pem" ] && \
     [ -f "${ca_root}/rootCA.pem" ]; then
    echo "✅ Local CA installed (路径: ${ca_root})"
    return 0
  else
    return 1
  fi
}

# 安装Local CA（若未安装）
install_local_ca() {
    echo "⏳ installing Local CA..."
    mkcert -install
}

# 生成证书
generate_certs() {
  echo "🔄 install ca to dir: ${CERT_DIR}"
  mkcert -cert-file "${CERT_DIR}/cert.pem" \
         -key-file "${CERT_DIR}/key.pem" \
         '*.self-sign.local' '*.local' localhost 127.0.0.1 ::1
}

# 主流程






main() {
    if ! check_local_ca_installed; then
        install_local_ca
    fi
    generate_certs
    # print done message
    echo "🎉 cert install completed"
}