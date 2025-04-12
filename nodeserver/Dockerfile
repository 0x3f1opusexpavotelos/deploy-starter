
FROM node:latest-alpine


WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install --production

COPY .  /app
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]

