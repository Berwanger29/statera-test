# Projeto Statera

- Vídeo de demonstração no youtube: https://youtu.be/fuHGXyIe_Zc
---
Este repositório contém o código para o projeto **Statera**, dividido em dois diretórios principais:


- **statera-api**: O backend do projeto, construído com [NestJS](https://nestjs.com/).
- **statera-frontend**: O frontend, construído com [Next.js](https://nextjs.org/).

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar tanto o backend quanto o frontend. Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados na sua máquina.

---

### 🐳 Rodando com Docker Compose (Ambos Frontend e Backend)

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/statera-test.git
   cd statera-test

2. Dentro da pasta ./statera-api crie um arquivo .env com a sua Secret_Key do Stripe de acordo com o arquivo .env.example.
    ```bash
    STRIPE_SK=<sk_test_123456>

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=db_postgres
    DB_PASSWORD=db_password
    DB_NAME=db_name
    PORT=3000

3. Dentro da pasta ./statera-frontend crie um arquivo .env com a sua Public_Key do stripe de acordo com o arquivo .env.example.
    ```bash
    NEXT_PUBLIC_STRIPE_PK=<pk_test_123445ABCD>

4. Certificar de que Docker e Docker Compose estão instalados na máquina. Verifique com os seguintes comandos no terminal:
    ```bash
    docker --version
    docker-compose --version

5. Construa e suba os contêiners:
    ```bash
    docker-compose up --build
    
6. Para acompanhar os logs:
    ```bash
    docker-compose logs -f


7. Acesse pelo navegador:
    ```bash
    Backend: http://localhost:3000
    Frontend: http://localhost:3001

# Como Rodar os Serviços Individualmente

Instruções passo a passo para executar o backend (**statera-api**) e o frontend (**statera-frontend**) separadamente.

---

## 🛠️ Rodando o Backend (statera-api)

1. Acesse o diretório do backend:
   ```bash
   cd statera-api

2. Isntale as dependências:
    ```bash
    npm install

3. Configure as variáveis de ambiente criando um arquivo .env na raiz do diretório de acordo com o exemplo em .env.example:
    ```bash
    NODE_ENV=development
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=root
    DB_NAME=statera_test

4. Inicie o servidor com o comando:
    ```bash
    npm run start:dev

5. Teste a API no navegador ou em ferramentas como o Postman ou Insomnia em:
    ```bash
    http://localhost:3000

## 🛠️ Rodando o Frontend (statera-api)
1. Acesse o diretório do frontend:
   ```bash
   cd statera-frontend

2. Isntale as dependências:
    ```bash
    npm install

3. Configure as variáveis de ambiente criando um arquivo .env na raiz do diretório de acordo com o exemplo em .env.example:
    ```bash
    NEXT_PUBLIC_STRIPE_PK=<pk_test_123445ABCD>
    NEXT_PUBLIC_API_URL=http://localhost:3000

4. Inicie o servidor com o comando:
    ```bash
    npm run dev

5. Teste a API no navegador ou em ferramentas como o Postman ou Insomnia em:
    ```bash
    http://localhost:3001
