# Stage 1: Build Angular
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Run with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/front-end /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
