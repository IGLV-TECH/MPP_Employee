FROM node:latest

RUN apt-get update && apt-get -y install android-tools-adb
USER node
WORKDIR /home/node

# cateodata vom avea ECONNRESET cand rulam npm install
RUN npm config rm proxy
RUN npm config rm https-proxy

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install --global expo-cli
RUN npm install --global eas-cli

WORKDIR /home/node/iglv-rn

CMD ["bash"]
