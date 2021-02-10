# selectOne()

O método `selectOne()` do [Model](#orm.model) do [ORM](#orm) permite recuperar um único registro do banco de dados.

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo as opções para a busca dos registros
|
|options.where|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) as condições para a busca. Funciona exatamente igual ao do [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Sequelize](https://sequelize.org/master/)|
|options.attributes|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com os atributos/colunas a serem retornados. Funciona exatamente igual ao do [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) do [Sequelize](https://sequelize.org/master/)|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com o [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) do registro desejado.

## Exemplo

{<selectOne>}

> [Esse método é derivado do "findOne" do Sequelize, consulte a documentação oficial dele para conhecer todos os detalhes.](https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-findOne)