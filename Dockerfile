FROM daocloud.io/library/node:latest

#RUN yum install nodejs
#RUN yum install npm

RUN mkdir -p /usr/src/app

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8080


ENTRYPOINT ["node"]
CMD ["app.js"]