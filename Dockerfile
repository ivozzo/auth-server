FROM node:10.6.0-alpine

RUN mkdir /opt/auth-server
WORKDIR /opt/auth-server

ADD . .

EXPOSE 3000

ENTRYPOINT [ "image/docker-entrypoint.sh", "-start"]
