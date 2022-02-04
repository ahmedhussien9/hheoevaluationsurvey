
# First stage for building angular image
FROM node:12 as build


RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# final stage

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/bs-form-survey/ /usr/share/nginx/html

