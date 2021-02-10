# Servidor

De nada adianta configurar todo o [ORM](#orm) e seus [Modelos](#orm.model) se não temos um servidor rodando e pronto para chamar e executar os métodos do [ORM](#orm) no momento adequado.

O AtlasJS terceiriza esta responsabilizada para o [ExpressJS](https://expressjs.com/pt-br/), e funciona basicamente da seguinte maneira: Teremos uma série de URL's que, quando chamadas, executam um determinado script que faz alguma coisa. Ou seja, as URL's (ou rotas, como chamaremos daqui para a frente) são a porta de entrada para que o frontend se comunique com o backend.

## Configurações

Veja as configurações de servidor disponíveis no arquivo `.env`:

{<atlas_host>}

{<atlas_server_port>}

> [Consulte as configurações de arquivos estáticos aqui.](#server.static)
