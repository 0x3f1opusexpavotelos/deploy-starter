
#!/bin/bash


# secert inject
GHCR_TOKEN=
GH_USER=
IMAGE_NAME=fintech-transaction

# echo "\nEnter build arguments"
# read -p "Enter the build arguments: " NEXT_PUBLIC_API_URL


echo "\nBuild Docker Image "
docker build -t ghcr.io/$GH_USER/$IMAGE_NAME:latest ~/repos/fintech-transaction

if [$? -ne 0]; then
    echo "Docker build failed"
    exit 1
fi

echo "\nLogin to GHCR "
docker login ghcr.io  --username $GHCR_TOKEN --password $GHCR_TOKEN


if [$? -ne 0]; then
    echo "Docker build failed"
    exit 1
fi

docker push ghcr.io/$GH_USER/$IMAGE_NAME

docker inspect ghcr.io/$GH_USER/$IMAGE_NAME

# secret management
# API secret
