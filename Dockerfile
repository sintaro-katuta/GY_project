FROM node:lts-bullseye-slim
WORKDIR /app

ENV TZ=Asia/Tokyo

COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install --frozen-lockfile

EXPOSE 3200
CMD ["yarn", "dev"]
