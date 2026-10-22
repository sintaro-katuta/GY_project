FROM node:24-bookworm-slim
WORKDIR /app

ENV TZ=Asia/Tokyo

COPY ./src/package.json ./src/package-lock.json ./
RUN npm ci

EXPOSE 3000
CMD ["npm", "run", "dev"]
