
FROM ubuntu:18.04

RUN dpkg --configure -a

ENV PYTHON_VERSION 3.10.6
ENV PYTHON_PIP_VERSION 22.0.2
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y build-essential default-jre default-jdk nodejs npm python3-pip python3 curl && rm -rf /var/lib/apt/lists/*

ENV NODE_VERSION=18.14.2
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install

EXPOSE 4000
CMD ["npm", "start"]