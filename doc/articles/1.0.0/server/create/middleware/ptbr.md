# Middlewares

Middlewares são comportamentos que devem ser executados antes de uma ou mais rotas e são gerenciados diretamente com o [ExpressJS](https://expressjs.com/pt-br/).

## Como fazer

### Middleware de Rotas

Um Middleware de rota é aplicável apenas nas rotas associadas.

Simplesmente crie um novo arquivo de middleware onde desejar, o local desse arquivo não importa, apenas não deixe dentro dos diretórios nativos do AtlasJS para que não seja carregado automaticamente causando problemas.

O conteúdo do arquivo de middleware deve exportar uma função que recebe um objeto igual ao de todas as rotas ([consulte aqui](#server.create))) e retorna uma [função de middleware nos moldes do ExpressJS](https://expressjs.com/pt-br/guide/using-middleware.html).

Com o arquivo criado, simplesmente importe o middleware e associe-o a rota desejada. Não esqueça de repassar todos os parâmetros!

> [Consulte a documentação oficial de Middlewares do ExpressJS.](https://expressjs.com/pt-br/guide/using-middleware.html)

{<middleware_route>}

### Middleware de Aplicação

Um Middleware de aplicação é aplicável a **TODAS** as rotas da aplicação.

> Note que o middleware do [sistema de Acesso](#access) é executado **ANTES** dos middlewares do desenvolvedor, sendo assim, caso o acesso seja negado, os middlewares do desenvolvedor **não serão executados**.

Crie um novo arquivo na raiz do projeto chamado `middleware.js`.

O conteúdo desse arquivo de middleware deve exportar uma função que recebe um objeto igual ao de todas as rotas ([consulte aqui](#server.create))), porém sem `entity` e `Model`.

De posse desse arquivo, simplesmente utilize normalmente o express para iniciar os middlewares que deseja, podendo inclusive utilizar os [models](#orm.model) disponíveis em `Models`.

> [Consulte a documentação oficial de Middlewares do ExpressJS.](https://expressjs.com/pt-br/guide/using-middleware.html)

{<middleware_app>}