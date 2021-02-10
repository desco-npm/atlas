# selectOrCreate()

O método `selectOrCreate()` do [Model](#orm.model) do [ORM](#orm) permite recuperar um único registro, ou criá-lo caso não o encontre.

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|options.where|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Obrigatório|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com as condições para a busca. Funciona exatamente igual ao do [findOrCreate](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOrCreate) do [Sequelize](https://sequelize.org/master/)|
|options.defaults|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Obrigatório|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com os valores a serem salvos caso não encontre o registro |
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

> Note que o [Sequelize](https://sequelize.org/master/) possui um método com a mesma proposta, porém o método do AtlasJS já esta integrado e preparado para funcionar com todos os recursos do AtlasJS enquanto o do [Sequelize](https://sequelize.org/master/) é puro.

## Retorno

Uma promessa contendo um [Array](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Global_Objects/Array) com os seguintes valores respectivamente:

* **Registro** - Um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo o registro encontrado (se encontrado);
* **Criado** - Um [Boolean](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Global_Objects/Boolean) informando se o registro foi criado;

## Exemplo

{<selectOrCreate>}

> [Esse método é derivado do "findOrCreate" do Sequelize, consulte a documentação oficial dele para conhecer todos os detalhes.](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOrCreate)