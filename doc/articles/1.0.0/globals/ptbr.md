# Globais

Globais são variáveis disponíveis em todas as instâncias da aplicação.

O AtlasJS adiciona várias informações, objetos e métodos nas globais do NodeJS.

Essas globais serão abordadas mais a fundo ao longo da documentação, porém aqui serão ao menos listadas:

> Boa parte dos objetos e métodos são de terceiros e irão redirecionar para a documentação oficial

## Informações

* [projectDir]() - Endereço absoluto da aplicação;
* [atlasDir]() - Endereço absoluto do pacote AtlasJS;
* [pathSep]() - Separador do sistema operacional onde esta rodando a aplicação;

## Objetos

* [fs](https://www.npmjs.com/package/fs-extra) - Pacote `fs-extra` contendo várias operações e informações do sistema de arquivos do servidor;
* [path](https://nodejs.org/docs/latest/api/path.html) -Pacote `path` contendo várias informações e operações do sistema de endereçamento de arquivos do servidor;
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Pacote `jsonwebtoken` para gerênciar tokens;
* [moment](https://www.npmjs.com/package/moment) - Pacote `moment` contendo várias informações e métodos para manipulação de Data e Hora;
* [envRequire](https://www.npmjs.com/package/@desco/env-require) - Pacote `@desco/env-require` que permite o carregamento de pacotes NPM de endereços locais quando em outro modo que não o de produção;
* [htmlPdf](https://www.npmjs.com/package/html-pdf) - Pacote `html-pdf` para criação de arquivos [PDF](https://pt.wikipedia.org/wiki/Portable_Document_Format) a partir de um conteúdo HTML;
* [pdfMake](https://www.npmjs.com/package/pdfmake) - Pacote `pdfmake` para criação de arquivos [PDF](https://pt.wikipedia.org/wiki/Portable_Document_Format);

## Métodos

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