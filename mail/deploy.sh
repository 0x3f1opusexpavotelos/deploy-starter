set -e # Exit immediately if a command exits with a non-zero status
USER=opus
APP_DIR=/home/$USER/mail
DMS_GITHUB_URL="https://raw.githubusercontent.com/docker-mailserver/docker-mailserver/master"


if [[ ! -d "$APP_DIR" ]]; then
    mkdir -p "$APP_DIR"
    echo "Created directory: $APP_DIR"
fi


cd APP_DIR

curl -O "${DMS_GITHUB_URL}/compose.yaml" 
curl -O "${DMS_GITHUB_URL}/mailserver.env" 


if [[ -f "compose.yaml" && -f "mailserver.env" ]]; then
    echo "Files downloaded successfully."
else
    echo "Error: Files failed to download."
    exit 1
fi

docker compose up -d
