FROM node:14.8.0-alpine3.11 AS dev

# install tools and deps for node-gyp
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR /app
COPY ./ ./
RUN yarn install
RUN REACT_APP_BUILD=`date '+%Y%m%d-%H%M%S'` NODE_ENV=production yarn build 

FROM zzswang/docker-nginx-react:v0.10.7

ARG VERSION

ENV DEBUG=off \
  APP_VERSION=${VERSION} \
  NODE_ENV=production \
  APP_PORT=80

COPY --from=dev /app/build /app
