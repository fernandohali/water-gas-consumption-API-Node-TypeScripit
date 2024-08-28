# https://github.com/docker/welcome-to-docker/blob/main/Dockerfile
# essa é a git para fazer a atulização do dockerfile.


# Usar uma imagem base Node.js oficial
FROM node:18

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar as dependências do projeto
RUN yarn install

# Copiar todos os arquivos do projeto
COPY . .

# Compilar o TypeScript para JavaScript
RUN yarn build

# Expor a porta na qual o aplicativo vai rodar
EXPOSE 3000

# Definir o comando para iniciar o servidor
CMD ["node", "dist/app.js"]


