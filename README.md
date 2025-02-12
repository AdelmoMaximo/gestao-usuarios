
# Projeto - Backend e Frontend com Docker

Este repositório contém dois componentes principais: **Backend** e **Frontend**. Ambos são configurados e executados usando Docker. A seguir estão as instruções para configurar e rodar o projeto.

## Estrutura do Repositório

```
/backend
/frontend
docker-compose.yml
```

- **/backend**: Contém a aplicação backend.
- **/frontend**: Contém a aplicação frontend.
- **docker-compose.yml**: Arquivo de configuração do Docker para orquestrar os containers.

## Pré-requisitos

Antes de começar, é necessário ter o Docker e o Docker Compose instalados em sua máquina.

### Para Linux (Ubuntu/Debian)

Instale o Docker e o Docker Compose executando os seguintes comandos. Se você não for o usuário root, adicione `sudo` antes dos comandos conforme necessário.

```bash
sudo apt update
sudo apt install docker.io
sudo apt install docker-compose
```

### Para Windows

1. Baixe e instale o [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop).
2. Após a instalação, reinicie o computador e abra o Docker Desktop.
3. Certifique-se de que o Docker está em funcionamento ao verificar se o ícone do Docker está ativo na bandeja do sistema.

## Passos para Executar o Projeto

1. **Clone o Repositório**

   Primeiro, clone o repositório para a sua máquina local.

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Construir e Iniciar os Containers**

   No diretório raiz do repositório, onde está localizado o arquivo `docker-compose.yml`, execute o seguinte comando para construir e iniciar os containers.

   **No Linux/Unix/MacOS**:

   Se você for um usuário não-root, é necessário adicionar `sudo` antes do comando Docker.

   ```bash
   sudo docker-compose up --build
   ```

   **No Windows**:

   O Docker Desktop geralmente fornece permissões necessárias, então não é necessário adicionar `sudo` no Windows. Use o comando:

   ```bash
   docker-compose up --build
   ```

   Este comando vai:
   - Construir as imagens do Docker para o backend e frontend.
   - Iniciar os containers necessários para ambos os componentes.

3. **Acessar a Aplicação**

   - O backend estará disponível no endereço [http://localhost:5000](http://localhost:5000) (ou na porta configurada no seu `docker-compose.yml`).
   - O frontend estará disponível no endereço [http://localhost:3000](http://localhost:3000) (ou na porta configurada no seu `docker-compose.yml`).

4. **Parar os Containers**

   Para parar os containers em execução, use o comando:

   ```bash
   docker-compose down
   ```

   Isso vai parar e remover os containers, mas manter as imagens criadas para uma execução futura.

5. **Ver Logs dos Containers**

   Para verificar os logs de execução dos containers, utilize o comando:

   ```bash
   docker-compose logs
   ```

   Se você quiser logs de um container específico, por exemplo, o backend:

   ```bash
   docker-compose logs backend
   ```

## Docker Compose

O arquivo `docker-compose.yml` contém a configuração para construir e executar os containers do backend e frontend. Aqui está um exemplo básico de como ele pode ser configurado:

```yaml
version: '3'
services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    networks:
      - app-network
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    networks:
      - app-network
networks:
  app-network:
    driver: bridge
```

