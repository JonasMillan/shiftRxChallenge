FROM node:18

WORKDIR /app
COPY .env .
COPY prisma ./prisma
COPY package*.json ./
RUN npm install

COPY . .
