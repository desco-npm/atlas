# Métodos

O [ORM](#orm) do AtlasJS possui alguns métodos para serem usados.

* **[Sequelize](#orm.method.sequelize)** - Retorna o [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) do [Sequelize](https://sequelize.org/master/) usado pela aplicação;
* **[DataTypes](#orm.method.dataTypes)** - Retorna o [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes) do [Sequelize](https://sequelize.org/master/);
* **[Op](#orm.method.Op)** - Retorna o [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Op](https://sequelize.org/v5/manual/querying.html) do [Sequelize](https://sequelize.org/master/);
* **[addModel](#orm.method.addModel)**  - Adiciona um novo [Model](#orm.model) ao ORM;
* **[transaction](#orm.method.transaction)** - Inicia uma transação do [Sequelize](https://sequelize.org/master/);
* **[listModels](#orm.method.listModels)** - Retorna uma lista com todos os [Models](#orm.model) do [Sequelize](https://sequelize.org/master/);
* **[treatParameters](#orm.method.treatParameters)** - Trata os parâmetros vindos da URL (QueryString) para o padrão do AtlasJS;
