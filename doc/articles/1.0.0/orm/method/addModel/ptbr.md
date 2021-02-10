# addModel()

O método `addModel()` do [ORM](#orm) adiciona um novo [Model](#orm.model) ao [ORM](#orm), retornando-o logo em seguida.

> [Consulte o objeto "Op" do Sequelize](https://sequelize.org/v5/manual/querying.html)

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|params|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Obrigatório|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo todas as definições do [Model](#orm.model)|
|params.name|[String](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/String)|Opcional / Por padrão, será usado o nome do arquivo do [Model](#orm.model)|Nome do [Model](#orm.model) 
|params.attrs|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional / Por padrão será `{}`|Atributos do [Model](#orm.model) (colunas da tabela, [validações](#orm.model.create.validations), etc)
|params.opts|[Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico)|Opcional / Por padrão será `{}`| Opções do [Model](#orm.model) [Consulte no Sequelize aqui](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-define)|
|params.mixins|[Array](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Array)|Opcional / Por padrão será `[]`|[Mixins](#orm.model.create.mixin) do [Model](#orm.model)
|params.pos|[Function](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Function)|Opcional / Por padrão será `() => {}`|Função a ser executada **DEPOIS** que todos os [Models](#orm.model) forem definidos ([Veja mais aqui](#orm.model.create))

## Retorno

[Promessa](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Promise) contendo o novo [Model](#orm.model).

## Exemplo

[Veja aqui.](#orm.model.create)