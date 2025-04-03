FROM node:lts-alpine AS base


# 1.install deps beased on perfer packages
FROM base AS deps
WORKDIR /app
COPY package.json  pnpm-lock.yaml* package-lock.json* yarn.lock* .npmrc* ./
RUN  
    if [ -f pnpm-lock.yaml]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json]; then npm ci; \
    elif [ -f yarn.lock]; then yarn --frozen-lockfile; \
    else echo  "Lockfile not found."  && exit 1; \
    fi



# 2. build the app
FROM base AS builder


# https://github.com/vercel/next.js/discussions/14030
# build time arguments must be present

ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}


WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build



# 3.start the server
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


# ENTRYPOINT ["doppler", "run", "--"]
# ensure a .env file in the root of project
# Install dotenvx
# RUN curl -sfS https://dotenvx.sh/install.sh | sh
# ENTRYPOINT ["dotenvx", "run", "--"]


# disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]

