FROM node:18-alpine

WORKDIR /app

# Build araçlarını ekle
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Tüm bağımlılıkları yükle
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "start"]