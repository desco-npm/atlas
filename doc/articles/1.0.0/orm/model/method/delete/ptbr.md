# delete()

O método `delete()` do [Model](#orm.model) do [ORM](#orm) permite remover um ou mais registros no banco de dados.

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|id|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) / [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Obrigatório|**id** do registro desejado. Separe por ponto e vírgula caso queira mais de um **id**|
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo opções extras|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com a quantidade de registros removidos.

## Exemplo

{<delete>}
