# selectById()

O método `selectById()` do [Model](#orm.model) do [ORM](#orm) permite recuperar um registro a partir do seu **id**.

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|id|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) / [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Obrigatório|**id** do registro desejado|
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo opções extras|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com o registro desejado.

## Exemplo

{<selectById>}

> [Esse método é derivado do "findByPk" do Sequelize, consulte a documentação oficial dele para conhecer todos os detalhes.](https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-findByPk)