FROM node:18

WORKDIR /app

# Скопируйте и установите зависимости
COPY package*.json ./
RUN npm ci

# Скопируйте все файлы и папки
COPY . .

# Соберите проект
RUN npm run build

# Откройте порт
EXPOSE 3000

# Запустите приложение
CMD ["npm", "start"]
