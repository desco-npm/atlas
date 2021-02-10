# Tokens

O AtlasJS permite manipulação de Tokens através do pacote do NPM [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) disponibilizado globalmente em toda a aplicação através da [variável global `jsonwebtoken`](#globals).

Três dos métodos desse objeto também estão disponíveis [globalmente](#globals), são eles:

* [generateToken]() - Cria um token;
* [verifyToken]() - Verifica um token;
* [decodeToken]() - Decodifica um token;

## Uso

O AtlasJS simplesmente disponibiliza este objeto para uso na [variável global `jsonwebtoken`](#globals), sem qualquer alteração. Sendo assim, consulte a documentação oficial do [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para aprender como utilizá-lo.