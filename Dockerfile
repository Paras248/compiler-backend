FROM node:alpine

RUN apk --update add build-base

COPY ./package.json ./
RUN npm install

COPY ./ ./

EXPOSE 4000
CMD ["npm", "start"]
