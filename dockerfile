FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:18-alpine AS prod

USER node

WORKDIR /app
COPY --chown=node:node --from=build /app/public/html/index.html ./public/html/index.html
COPY --chown=node:node --from=build /app/dist ./dist

WORKDIR /app/dist
RUN yarn install --production

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "/app/dist/src/main.js"]
