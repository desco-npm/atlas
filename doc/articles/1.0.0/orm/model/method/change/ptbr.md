# change()

O método `change()` do [Model](#orm.model) do [ORM](#orm) permite atualizar um registro no banco de dados.

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|data|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Obrigatório|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com os dados a serem atualizados  |
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo opções extras|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction)|

> Os dados a serem atualizados **DEVEM CONTER** o **id** do registro

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com o registro atualizado.

## Exemplo

{<change>}
