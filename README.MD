# CoinPulse GraphQL API

A API CoinPulse é uma interface GraphQL que permite aos usuários realizar consultas e operações relacionadas a moedas e usuários. Ela fornece acesso a informações sobre moedas e permite que os usuários façam buscas e mantenham perfis de usuário.

A consulta de valores é feita a partir da API: https://docs.awesomeapi.com.br/api-de-moedas

## Dependências

**A API CoinPulse é construída com base nas seguintes bibliotecas:**

* Apollo Server: Usado para criar o servidor GraphQL.
* Bcrypt: Utilizado para criptografar senhas de usuários.
* Axios: Para fazer requisições HTTP.
* GraphQL: A linguagem de consulta usada para definir as operações.
* Jsonwebtoken: Usado para autenticação e geração de tokens.
* Mongoose: Biblioteca de modelagem de objetos MongoDB para interagir com o banco de dados.
* Dotenv: Para carregar variáveis de ambiente a partir de um arquivo .env.
* TypeScript: A linguagem utilizada para escrever a aplicação.
* MongoDB: O banco de dados utilizado para armazenar os dados.

## Como utilizar

Crie um arquivo .env e configure as variáveis de ambiente necessárias, como a conexão com o banco de dados e as chaves JWT.


Compile o código TypeScript:
```
npm run compile
```

Inicie o servidor:
```
npm start
```
A API estará disponível em http://localhost:4000, onde você poderá executar consultas e mutações GraphQL.

## Exemplos de Consultas

**Aqui estão alguns exemplos de consultas que você pode executar:**

Consultar todas as moedas:
```
query {
  searches {
    code
    name
  }
}
```

Consultar um usuário pelo ID:
```
query {
  users {
    id
    username
  }
}
```
Criar um novo usuário:
```
mutation {
  createUser(data: {
    username: "novo-usuario"
    password: "senha-secreta"
    email: "usuario@example.com"
  }) {
    id
    username
  }
}
```
Realizar login:
```
mutation {
  login(data: {
    username: "novo-usuario"
    password: "senha-secreta"
  }) {
    id
    username
    token
  }
}
```

## Contribuições

**Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests) para aprimorar esta API.**