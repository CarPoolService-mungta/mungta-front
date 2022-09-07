FROM node:16.13.2
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000

ARG ENVIRONMENT
CMD echo env: ${ENVIRONMENT}
CMD npm run start:${ENVIRONMENT}