FROM node:alpine
WORKDIR /app
COPY package*.json yarn.lock ./

# Install native dependencies.
RUN apk add --no-cache make gcc g++ python
RUN yarn install

#Multi-stage it!
# Only copy over the node pieces we need from the above image
FROM node:alpine
WORKDIR /app
COPY --from=0 /app .

# Bundle app source
COPY . .

# Use the test env variables
#COPY .env.test .env

# Expose the webpack-dev-server as well as the proxy port.
EXPOSE 3000 3001

# CMD [ "yarn", "start" ]
CMD node ./bin/sp-rest-proxy.js start-dev-server
