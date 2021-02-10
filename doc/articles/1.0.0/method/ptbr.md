# Métodos

O AtlasJS disponibiliza vários métodos [globalmente na aplicação](#globals).

## Métodos

> Boa parte dos métodos são de terceiros e irão redirecionar para a documentação oficial

* [clone](https://www.npmjs.com/package/clone) - Executa uma clonagem completa e profunda de um objeto, o objeto criado não possuirá qualquer referência ao original;
* [fileExists](https://nodejs.org/api/fs.html#fs_fs_existssync_path) - Verifica se um determinado arquivo existe (Atalho para `fs.existsSync`);
* [readFileSync]() - Carrega o conteúdo de um arquivo de forma síncrona (Atalho para `fs.readFileSync`);
* [readdir](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) - Carrega a lista de arquivos/diretórios de um dado diretório (Atalho para `fs.readdir`);
* [pathJoin](https://nodejs.org/docs/latest/api/path.html#path_path_join_paths) - Cria um endereço de arquivo com o separador adequado de acordo com o sistema operacional do servidor (Atalho para `path.join`);
* [generateToken](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) - Cria um token (Atalho para `jsonwebtoken.sign`);
* [verifyToken](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) - Verifica um token (Atalho para `jsonwebtoken.verify`);
* [decodeToken](https://www.npmjs.com/package/jsonwebtoken#jwtdecodetoken--options) - Decodifica um token (Atalho para `jsonwebtoken.decode`);
* [objectFilter](https://www.npmjs.com/package/object-filter) - Executa um filtro sobre as propriedades de um objeto;
* [objectMap](https://www.npmjs.com/package/object.map) - Executa um loop sobre as propriedades de um objeto;
* [isArray](https://www.npmjs.com/package/is-array) - Verifica se uma variável contém um [Array](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Array);
* [stackTrace](https://www.npmjs.com/package/stack-trace) - Retorna uma lista com o caminho de execução ([StackTrace](https://en.wikipedia.org/wiki/Stack_trace)) da aplicação até aquele ponto;
* [arrayUnique](#method.arrayUnique) - Remove itens repetidos do [Array](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Array) de forma que conste apenas uma ocorrência;