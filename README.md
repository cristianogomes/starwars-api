# Starwars API

**Olá!**
Dando continuidade ao nosso processo, temos um desafio para te propor! \o/

Nossos associados são aficionados por Star Wars e com isso, queremos criar um jogo com algumas informações da franquia.

Para possibilitar a equipe de front criar essa aplicação, queremos desenvolver uma API que contenha os dados dos planetas.

#### Requisitos:

- A API deve ser REST
- Para cada planeta, os seguintes dados devem ser obtidos do banco de dados da aplicação, sendo inserido manualmente:

  - Nome
  - Clima
  - Terreno

- Para cada planeta também devemos ter a quantidade de aparições em filmes, que podem ser obtidas pela API pública do Star Wars: https://swapi.co/

#### Funcionalidades desejadas:

- Adicionar um planeta (com nome, clima e terreno)
- Listar planetas
- Buscar por nome
- Buscar por ID
- Remover planeta

**Linguagens que usamos:** Java, Go, Clojure, Node, Python
**Bancos que usamos:** MongoDB, Cassandra, DynamoDB, Datomic

E lembre-se! Um bom software é um software bem testado.

---

### Install

    yarn install

### Run the app

    yarn start

### Run the tests

    yarn test:integration

---

# Code overview

## Dependencies

- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - Native JS implementation of BCrypt for Node
- [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
- [cors](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node
- [express-validation](https://github.com/andrewkeig/express-validation) - express-validation is a middleware that validates the body, params, query, headers and cookies of a request and returns a response with errors; if any of the configured validation rules fail
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help
- [http-status](https://github.com/adaltas/node-http-status) - Utility to interact with HTTP status code in Node.js
- [joi](https://github.com/hapijs/joi) - Object schema description language and validator for JavaScript objects
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens
- [mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling designed to work in an asynchronous environment
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [winston](https://github.com/winstonjs/winston) - A logger for just about everything

## Dev Dependencies

- [chai](https://github.com/chaijs/chai) - BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework
- [chai-http](https://github.com/chaijs/chai-http) - HTTP Response assertions for the Chai Assertion Library
- [mocha](https://github.com/mochajs/mocha) - simple, flexible, fun javascript test framework for node.js & the browser
- [nodemon](https://github.com/remy/nodemon) - Monitor for any changes in your node.js application and automatically restart the server - perfect for development
- [sinon](https://github.com/sinonjs/sinon) - Test spies, stubs and mocks for JavaScript

---

# REST API

## Authentication

### Create a new user:

#### Request

    POST /v1/auth/logon
    Content-Type: application/x-www-form-urlencoded

    login=cris&password=123456&email=cristiano%40mail.com&name=Cristiano%20Alves

#### Response

    HTTP/1.1 201 Created
    Date: Sun, 04 Aug 2019 22:05:39 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 142

    {
      "_id": "5d4756b20a9d82095f7c795e",
      "name": "Cristiano Alves",
      "email": "cristiano@mail.com",
      "login": "cris",
      "createdAt": "2019-08-04T22:05:38.782Z"
    }

### Login:

#### Request

    POST /v1/auth/login
    Content-Type: application/x-www-form-urlencoded

    login=cris&password=123456

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:36:45 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 248

    {
      "success": true,
      "message": "Autenticação realizada com sucesso!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NTQwNSwiZXhwIjoxNTY0OTc2MjA1fQ.pvl-hxrh3KL6kIdxxEZoz_HbgbN4yI150_a0jz54Fz0"
    }

---

## Planets

### Get Planets:

#### Request

    GET /v1/planet
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:18:34 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 228

```json
[
  {
    "_id": "5d47571ae251210987b70b1e",
    "name": "Endor",
    "climate": "temperate",
    "terrain": "forests, mountains, lakes",
    "filmsCount": 1,
    "_user": "5d4756b20a9d82095f7c795e",
    "createdAt": "2019-08-04T22:07:22.775Z",
    "updatedAt": "2019-08-05T00:05:39.392Z",
    "__v": 0
  }
]
```

### Search Planets by ID:

#### Request

    GET /v1/planet?id=5d47571ae251210987b70b1e
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:18:34 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 228

```json
[
  {
    "_id": "5d47571ae251210987b70b1e",
    "name": "Endor",
    "climate": "temperate",
    "terrain": "forests, mountains, lakes",
    "filmsCount": 1,
    "_user": "5d4756b20a9d82095f7c795e",
    "createdAt": "2019-08-04T22:07:22.775Z",
    "updatedAt": "2019-08-05T00:05:39.392Z",
    "__v": 0
  }
]
```

### Search Planets by name:

#### Request

    GET /v1/planet?name=Endor
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:18:34 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 228

```json
[
  {
    "_id": "5d47571ae251210987b70b1e",
    "name": "Endor",
    "climate": "temperate",
    "terrain": "forests, mountains, lakes",
    "filmsCount": 1,
    "_user": "5d4756b20a9d82095f7c795e",
    "createdAt": "2019-08-04T22:07:22.775Z",
    "updatedAt": "2019-08-05T00:05:39.392Z",
    "__v": 0
  }
]
```

### Create Planet:

#### Request

    POST /v1/planet
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

    name=Endor&climate=temperate&terrain=forests,%20mountains,%20lakes

#### Response

    HTTP/1.1 201 Created
    Date: Mon, 05 Aug 2019 00:18:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 226

```json
[
  {
    "_id": "5d47571ae251210987b70b1e",
    "name": "Endor",
    "climate": "temperate",
    "terrain": "forests, mountains, lakes",
    "filmsCount": 1,
    "_user": "5d4756b20a9d82095f7c795e",
    "createdAt": "2019-08-04T22:07:22.775Z",
    "updatedAt": "2019-08-05T00:05:39.392Z",
    "__v": 0
  }
]
```

### Update Planet:

#### Request

    PUT /v1/planet/5d47571ae251210987b70b1e
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

    name=Endor&climate=temperate&terrain=forests,%20mountains,%20lakes

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:05:39 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 226

```json
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```

### Update Planet:

#### Request

    PUT /v1/planet/5d47571ae251210987b70b1e
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

    name=Endor&climate=temperate&terrain=forests,%20mountains,%20lakes

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:05:39 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 226

```json
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```

### Delete Planet:

#### Request

    DELETE /v1/planet/5d47571ae251210987b70b1e
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDc1NmIyMGE5ZDgyMDk1ZjdjNzk1ZSIsImlhdCI6MTU2NDk2NDMwOSwiZXhwIjoxNTY0OTc1MTA5fQ.BclhuW55WBGse_AXxtyCVbtMKeY1_3nVaPKHetoUz8c`

#### Response

    HTTP/1.1 200 OK
    Date: Mon, 05 Aug 2019 00:36:15 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 226

```json
{
  "success": true
}
```
