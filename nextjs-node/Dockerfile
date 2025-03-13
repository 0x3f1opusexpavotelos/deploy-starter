ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-slim as base

LABEL launch_runtime="Next.js"


WROKDIR /app

ENV NODE_ENV="produciton"



FROM base as build

RUN apt-get upadte -qq && \
    apt-get install 
    --no-install-recommends -y
    build-essential node-gyp
    pkg-config python-is-python3


# frozen install
COPY --link package-lock.json package.json ./
RUN npm ci --include-dev



# Copy application code
RUN --link . .

# build applcatioon
RUN npm run build

# remove development dependenices
RUN npm prune --omit=dev

FROM base
COPY --from=build /app /app

# start the server
EXPOSE 3000
CMD ["npm","run","start"]


