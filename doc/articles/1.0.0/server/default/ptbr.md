# Rotas Padrões

Sempre que um arquivo de rota é adicionado para uma [entidade](#entity), automaticamente o AtlasJS adiciona algumas rotas padrões referentes as [operações CRUD](https://pt.wikipedia.org/wiki/CRUD). Veja elas:

**GET:/crud/${entity}**

Lista todos os registros da [entidade](#entity).

Utiliza o [método do Model ORM](#orm.model.method) [`select()`](#orm.model.method.select).

Todos os parâmetros do [`select()`](#orm.model.method.select) podem ser passados via QueryString pois serão automaticamente tratados pelo [treatparameters()](#orm.method.treatparameters) do [ORM](#orm.model).

O parâmetro `where` deve ser passado em forma de um [JSON válido](https://www.json.org/json-en.html), no mesmo formato dos parâmetros do [`select()`](#orm.model.method.select), porém, trocando as referencias ao [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) [Op](https://sequelize.org/v5/manual/querying.html) por uma string simples, por exemplo: `{'Op.eq': 1}`.

**GET:/crud/${entity}/:id**

Recupera  um registros da [entidade](#entity).

Utiliza o [método do Model ORM](#orm.model.selectById) [`selectById()`](#orm.model.method.selectById).

**POST:/crud/${entity}**

Cria um novo registro da [entidade](#entity).

Utiliza o [método do Model ORM](#orm.model.method) [`insert()`](#orm.model.method.insert).

**PUT:/crud/${entity}/:id**

Atualiza um registros da [entidade](#entity).

Utiliza o [método do Model ORM](#orm.model.method) [`change()`](#orm.model.method.change).

**DELETE:/crud/${entity}/:id;id;id;...**

Remove registros da [entidade](#entity).

Utiliza o [método do Model ORM](#orm.model.method) [`delete()`](#orm.model.method.delete).