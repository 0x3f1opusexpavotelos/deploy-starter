FROM node

RUN mkdir  ~/.ssh

RUN echo "-----BEGIN OPENSSH PRIVATE KEY-----\n\
your\n\
private\n\
key\n\
goes\n\
here\n\
-----END OPENSSH PRIVATE KEY-----" > ~/.ssh/id_ed25519

RUN chmod 600 ~/.ssh/id_ed25519

RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

WORKDIR /app

RUN git clone git@github.com:<user>/<repo>.git .

RUN npm install

RUN npx prisma db push

CMD npx prisma studio
