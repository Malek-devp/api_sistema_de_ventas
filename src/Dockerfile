FROM node:22 // indica sobre que version estara nuestra imagen que sera la plataforma de nuestro sistema

WORKDIR /app // le dice a docker que cree una carpeta app donde sera nuestro espacio para nuestro proyecto

COPY package.json .

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]