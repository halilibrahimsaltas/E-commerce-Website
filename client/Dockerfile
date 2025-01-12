FROM node:18-alpine

WORKDIR /app

# Sadece gerekli build araçlarını ekle
RUN apk add --no-cache python3 make g++

# Önce sadece package dosyalarını kopyala
COPY package*.json ./

# Sadece production bağımlılıklarını yükle
RUN npm ci

# Kaynak kodları kopyala
COPY . .

# Vite için host ve port ayarları
ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=5173

EXPOSE 5173

# Development modunda başlat
CMD ["npm", "run", "dev"]