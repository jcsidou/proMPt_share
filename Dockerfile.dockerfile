# Backend
FROM python:3.12-slim

# Define a variável de ambiente para evitar problemas com o terminal
ENV PYTHONUNBUFFERED 1

# Define o diretório de trabalho
WORKDIR /app

# Instala as dependências do sistema
RUN apt-get update \
    && apt-get install -y netcat gcc postgresql \
    && apt-get clean

# Instala as dependências do Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código do projeto
COPY . /app/

# Exposição da porta
EXPOSE 8000

# Comando de inicialização do servidor
CMD ["gunicorn", "--chdir", "backend/promptshare", "--bind", ":8000", "promptshare.wsgi:application"]

# Frontend
FROM node:14-alpine as frontend

WORKDIR /frontend

COPY package.json /frontend/
COPY package-lock.json /frontend/

RUN npm install

COPY . /frontend

RUN npm run build

FROM nginx:alpine
COPY --from=frontend /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
