FROM node:5
WORKDIR /app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /app/

ADD . /app
CMD []

ENV SCRAPPER_PHANTOMPATH /app/node_modules/phantomjs-prebuilt/bin/phantomjs

EXPOSE  3000

