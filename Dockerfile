FROM node:alpine
FROM mongo
FROM redis

RUN apt-get install -y build-essential

COPY ./package.json ./
RUN npm install

COPY ./ ./q

CMD ["npm", "start"]

# RUN apt-get update && \
#     apt-get install -y openjdk-11-jdk ca-certificates-java && \
#     apt-get clean && \
#     update-ca-certificates -f
# ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/
# RUN export JAVA_HOME

