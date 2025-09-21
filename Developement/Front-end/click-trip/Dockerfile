# Build Stage
FROM node:20-alpine AS build
WORKDIR /Developement/Front-end/click-trip/
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build Developement/Front-end/click-trip/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]