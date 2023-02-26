FROM node:16.17.1-slim AS builder
WORKDIR /app

COPY . .
RUN npm install && npm run build --production

FROM node:16.17.1-slim

WORKDIR /app
COPY --from=builder /app/build /app/build
RUN npm install -g serve
EXPOSE 3000

CMD serve -s build
