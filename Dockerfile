# # Stage 1: Build Angular
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build -- --configuration production

# # Stage 2: Serve with NGINX
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/nginx.conf

# # Copy Angular build output
# COPY --from=builder /app/dist/cv-site /usr/share/nginx/html

# # Copy your static public assets
# COPY public/docs /usr/share/nginx/html/docs
# COPY public/sounds /usr/share/nginx/html/sounds
# COPY public/images /usr/share/nginx/html/images
# COPY public/stl /usr/share/nginx/html/stl

# EXPOSE 80

# Stage 1: Build Angular app
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with default NGINX
# FROM nginx:alpine
# COPY --from=builder /app/dist/cv-site /usr/share/nginx/html
# EXPOSE 80