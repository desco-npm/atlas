# Criando um Model

Vamos começar criando um arquivo com o nome de nossa [entidade](#entity) dentro do diretório `./models`.

Supondo que nossa [entidade](#entity) seja User, o arquivo se chamará `User.js`.

Esta é a estrutura básica do arquivo de Model:

{<basic-model>}

Vamos detalhar:

Nosso arquivo exporta uma função e ela recebe como parâmetro um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo dois valores:

* **DataTypes** - [Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes) do [Sequelize](https://sequelize.org/master/) contendo todos os tipos de dados possíveis;
* **Orm** - Instância do [ORM](#orm) do AtlasJS para uso;

> [Consulte a documentação oficial do Sequelize para conhecer melhor o DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes).

Nossa função chama o método `addModel()` do [ORM](#orm) e retorna o [Model](#orm.model) resultante, essa função recebe um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com as seguintes propriedades:

* **name** - (Opcional) Nome do [Model](#orm.model), se omitido será assumido um nome igual ao do arquivo;
* **attrs** - (Opcional) Atributos/colunas do [Model](#orm.model) do [Sequelize](https://sequelize.org/master/);
* **opts** - (Opcional) Opções do [Model](#orm.model) do [Sequelize](https://sequelize.org/master/), basicamente o segundo parâmetro do [Sequelize.define()](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-define);
* **pos** - (Opcional) Função a ser executada **DEPOIS** da criação de **TODOS** os [Models](#orm.model), muito util para lógicas que necessitam ter todos os [Models](#orm.model) carregados como, por exemplo, definir relacionamentos ou criar métodos que dependam de outros [Models](#orm.model). Essa função recebe como parâmetro um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) com as seguintes propriedades:;
  * **Model** - O [Model](#orm.model) atual já criado;
  * **models** - Array com **TODOS** os [Models](#orm.model) criados;
* **[mixins](#orm.mixin)** - (Opcional) Array contendo [mixins](#orm.mixin) para o [Model](#orm.model);

Este arquivo/[Model](#orm.model) será automaticamente carregado pelo AtlasJS para que o seu [Model](#orm.model) esteja disponível na aplicação.

> [Consulte mais sobre definição de Models na documentação oficial do Sequelize](https://sequelize.org/v5/manual/models-definition.html)