# Model

Para cada [entidade](#entity) no projeto, teremos um arquivo, ou Model, equivalente no diretório `./models`.

Cada um destes Models irá "modelar" a tabela no banco de dados.

Neles são definidos os atributos (colunas), relacionamentos, validações e etc.

> [Consulte a documentação oficial do Sequelize para saber mais sobre os Models](https://sequelize.org/master/class/lib/model.js~Model.html) 

De posse dos Models é possível executar operações diretamente com a tabela no banco de dados, e o AtlasJS adiciona por padrão métodos prontos para as quatro operações do [CRUD](https://pt.wikipedia.org/wiki/CRUD), já preparados com todos os recursos do AtlasJS.

* **Create** - Criação de um novo registro
* **Read** - Leitura de um registro
* **Update** - Atualização de um registro
* **Delete** - Remoção de um ou mais registros

É possível também [criar novos métodos](#orm.model.create.method) para cada um dos seus Models, a depender das suas necessidades.

Caso desejado, as tabelas também podem ser criadas/atualizadas de acordo com os Models ([consulte as configurações](#starting)).