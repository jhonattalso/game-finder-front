# Estágio 1: Build (Compilação)
FROM node:20-alpine AS build
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o restante do código e gera o build de produção
COPY . .
RUN npm run build --configuration=production

# Estágio 2: Serve (Servidor Web)
FROM nginx:alpine

# Copia os arquivos gerados no estágio anterior para o diretório do Nginx
COPY --from=build /app/dist/game-finder-front/browser /usr/share/nginx/html

# Expõe a porta 80 para acesso via navegador
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
