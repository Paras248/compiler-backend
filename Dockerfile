FROM node:alpine
FROM mongo

RUN apt-get update && apt-get install -y build-essential && \
    apt install -y redis

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]

# RUN apt-get update && \
#     apt-get install -y openjdk-11-jdk ca-certificates-java && \
#     apt-get clean && \
#     update-ca-certificates -f
# ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/
# RUN export JAVA_HOME

