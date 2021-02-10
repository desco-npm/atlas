# save()

O método `save()` do [Model](#orm.model) do [ORM](#orm) permite salvar um registro no banco de dados.

Caso o registro possua um **id** será atualizado, do contrário será criado.

> Este método simplesmente decide se irá encaminhar para o [insert()](#orm.model.method.insert) ou o [change()](#orm.model.method.change).

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|data|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Obrigatório|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com os dados a serem salvos |
|options|[Object](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo opções extras|
|options.transaction|[Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html)|Opcional|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Transaction](https://sequelize.org/v5/class/lib/transaction.js~Transaction.html) para as transações (Consulte [ORM > Transações](#orm.transaction))|

## Retorno

Uma promessa contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com o registro salvo.

## Exemplo

{<save>}
