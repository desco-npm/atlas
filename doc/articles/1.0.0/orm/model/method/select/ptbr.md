# select()

O método `select()` do [Model](#orm.model) do [ORM](#orm) permite recuperar um ou mais registros do banco de dados junto com a quantidade de registros retornados.

## Parâmetros

Os parâmetros são os mesmos do método [findAll()](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Model](#orm.model) do [Sequelize](https://sequelize.org/master/), por isso serão abordados somente os parâmetros mais pertinentes.

> [Consulte a documentação oficial do "findAll" para conhecer todos os parâmetros.](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll)


|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo as opções para a busca dos registros|
|options.where|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) as condições para a busca. Funciona exatamente igual ao do [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Sequelize](https://sequelize.org/master/)|
|options.attributes|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com os atributos/colunas a serem retornados. Funciona exatamente igual ao do [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Sequelize](https://sequelize.org/master/)|
|options.order|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) / [Function](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#static-method-fn)|Opcional|Especifica a ordenação dos resultados. Funciona exatamente igual ao do [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Sequelize](https://sequelize.org/master/)|
|options.limit|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Opcional / Padrão é um valor definido pelo sistema de [Paginação](#orm.paginate) do AtlasJS |Quantidade de registros a serem retornados
|options.offset|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Opcional / Padrão é um valor definido pelo sistema de [Paginação](#orm.paginate) do AtlasJS |A partir de qual registro deverá começar a retornar
|options.include|[Model](#orm.model) / [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) de inclusão do [Sequelize](https://sequelize.org/master/manual/eager-loading.html) / [Array](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Array) de [Models](#orm.model]|Opcional|Lista de outros [Models](#orm.model) relacionados a serem buscados.|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

> [Existem mais dois parâmetros específicos para paginação, consulte aqui.](#orm.model.method.select.paginate)

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com as seguintes propriedades:

* **count** - Quantidade de registros retornados
* **rows** - Array contendo [objetos](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) de todos os registros retornados

## Exemplo

{<select>}

> [Consulte a documentação oficial do "findAll" para conhecer todos os detalhes.](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll)