FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Tüm bağımlılıkları yükle
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "start"]