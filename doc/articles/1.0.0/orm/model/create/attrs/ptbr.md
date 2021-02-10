# Definindo Atributos

Criar um [Model](#orm.model) é importante, mas de nada adianta se ele não possuir um atributo né? É **exatamente a mesma coisa** que criar uma tabela no banco de dados sem colunas!

Como vimos em [*Criando um Model*](#orm.create), para criar os atributos devemos passar eles dentro da propriedade `attrs` passada para o `Orm.addModel()`, mas como exatamente passar essas informações?

Lembre-se! O AtlasJS simplesmente une várias ferramentas em uma só, e no caso do ORM é utilizado o [Sequelize](https://sequelize.org/master/), **ou seja**, a criação de Atributos é feita pelo [Sequelize](https://sequelize.org/master/), **logo** você passa essas informações da mesma maneira que passaria para ele!

Vamos então ver um exemplo básico:

{<attrs>}

Como pode ver, basta saber utilizar o [Sequelize](https://sequelize.org/master/) para saber usar o AtlasJS!

Passamos cada um dos atributos com um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com maiores informações sobre ele, são elas:

* **type** - O tipo do atributo. Note que utilizamos uma propriedade do [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes), este é um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) próprio do [Sequelize](https://sequelize.org/master/) que contém todos os tipos possíveis;
* **allowNull** - Se o atributo permite `null`;
* **defautlValue** - Valor padrão do atributo, caso nada seja informado;

> Todas essas propriedade são nativas do [Sequelize](https://sequelize.org/master/) e existem muito mais, consulte a documentação oficial para conhecer todas.

> Por padrão, o [Sequelize](https://sequelize.org/master/) adicionará os atributos "createdAt" e "updatedAt" ao seu [Model](#orm-model) para que você possa saber quando a entrada foi para o banco de dados e quando foi atualizado pela última vez. [Consulte mais aqui](https://sequelize.org/v5/manual/models-definition.html).

> Por padrão, o [Sequelize](https://sequelize.org/master/) adicionará o atributo "id" do tipo "INT", "auto_increment" e "primaryKey", a menos que o desenvolvedor adicione um atributo "primaryKey".

> Por padrão, o AtlasJS adiciona um valor padrão ("defaultValue") aos atributos de tipo "UUID" que não tenha um "defaultValue" definido pelo desenvolvedor. Esse valor padrão dependerá da versão definida para a configuração "ATLAS_ORM_UID_DEFAULT_VERSION". [Consulte aqui](#orm).