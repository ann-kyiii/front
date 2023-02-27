FROM node:16.17.1-slim AS builder
WORKDIR /app

COPY . .
RUN yarn install && yarn run build --production

FROM node:16.17.1-slim

WORKDIR /app
COPY --from=builder /app/build /app/build
RUN yarn global add serve
EXPOSE 3000

CMD serve -s build
