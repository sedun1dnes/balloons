# Используем официальный образ nginx на базе Alpine
FROM nginx:alpine

# Копируем все статические файлы из папки front/dist в папку /usr/share/nginx/html контейнера
COPY . /usr/share/nginx/html

# Открываем порт 80 для доступа к веб-приложению
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
