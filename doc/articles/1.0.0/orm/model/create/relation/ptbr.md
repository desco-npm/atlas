# Definindo Relacionamentos

Se nossos [Models](#orm.models) representam tabelas, é claro que eles precisarão de relacionamentos, e definir esses relacionamentos no AtlasJS é tão simples quanto no [Sequelize](https://sequelize.org/master/)!

Vamos começar conhecendo os relacionamentos possíveis:

* **HasOne** - Relacionamento de **Um para Um**, com a chave estrangeira sendo definida no [Model](#orm.model) passado por parâmetro;
* **BelongsTo** - Relacionamento **Um para Um**, com a chave estrangeira sendo definida no [Model](#orm.model) que executa o relacionamento;
* **HasMany** - Relacionamento **Um para Muitos**, com a chave estrangeira sendo definida no [Model](#orm.model) passado por parâmetro;
* **BelongsToMany** - Relacionamnto **Muitos para Muitos**;

Cada um destes relacionamentos possui um método próprio dentro do [Model](#orm.model), os quais podem ser chamados assim que o [Model](#orm.model) é criado pelo `Orm.addModel()`.

Como um relacionamento depende de outros [Models](#orm.model), é **recomendado** que este processo seja feito na função da propriedade `pos` do [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) passado ao `Orm.addModel()`.

> [Consute a documentação oficial do Sequelize para conhecer melhor os relacionamentos e como usá-los](https://sequelize.org/master/manual/assocs.html)

{<relations>}

> O "belongsToMany" deve receber um segundo parâmetro contendo um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com a propriedade "through" que recebe o nome do [Model](#orm.model), o qual servirá como intermediário entre os dois [Models](#orm-model). Esse [Model](#orm-model) será criado automaticamente caso não exista.
