FROM node:22

WORKDIR /app 

COPY package.json .

RUN corepack enable

RUN pnpm i

COPY . .

CMD ["pnpm", "dev"]