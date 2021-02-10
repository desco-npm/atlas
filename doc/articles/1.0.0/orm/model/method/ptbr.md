# Métodos

Além dos métodos dos [Models](#orm.model) do [Sequelize](https://sequelize.org/master/), os [Models](#orm.model) do AtlasJS possuem alguns outros métodos para serem usados.

* **[select](#orm.model.method.select)** - Busca vários registros;
* **[selectOne](#orm.model.method.selectOne)** - Busca um único registro;
* **[selectById](#orm.model.method.selectById)** - Busca um único registro pelo id;
* **[selectOrCreate](#orm.model.method.selectOrCreate)**  - Busca registros e cria-os se não encontrar;
* **[save](#orm.model.method.save)** - Salva um registro (cria ou atualiza);
* **[insert](#orm.model.method.insert)** - Cria um registro;
* **[change](#orm.model.method.change)** - Atualiza um ou mais registros;
* **[read](#orm.model.method.read)** - Lê um registro;
* **[delete](#orm.model.method.delete)** - Remove um registro;

> Note que o [Sequelize](https://sequelize.org/master/) possui métodos com as mesmas propostas dos citados acima, porém os métodos do AtlasJS já estão integrados e preparados para funcionar com todos os recursos do AtlasJS enquanto os do [Sequelize](https://sequelize.org/master/) são puros.