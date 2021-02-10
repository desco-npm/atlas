# ORM

ORM, ou "*Mapeamento objeto-relacional*", permite interagir com o banco de dados no próprio código através de classes e [objetos](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) que representam as [entidades](#entity) de négócio, simplificando assim o desenvolvimento.

No AtlasJS, é utilizado o [Sequelize](https://sequelize.org/master/) como ORM embutido.

Aqui será documentada a forma de trabalhar com o [Sequelize](https://sequelize.org/master/) dentro do AtlasJS, porém caso queira aprender a fundo sobre ele, é recomendada a [documentação oficial do Sequelize](https://sequelize.org/master/).

## Configurações

Veja as configurações do ORM disponíveis no arquivo `.env`:

> [Consulte as configurações de conexão aqui.](#orm.connection)

> [Consulte as configurações de sincronia aqui.](#orm.sync)

{<atlas_orm_db_log>}

{<atlas_orm_uid_default_version>}
