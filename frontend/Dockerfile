# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . .

# Compile o aplicativo
RUN npm run build

# Instale um servidor leve para servir o conteúdo estático
RUN npm install -g serve

# Exponha a porta que o app vai usar
EXPOSE 5000

# Comando para rodar o app
CMD ["serve", "-s", "dist", "-l", "5000"]

