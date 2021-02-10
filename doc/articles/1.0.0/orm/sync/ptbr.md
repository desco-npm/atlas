# Sincronização

Uma vez que os [Models](#orm.model) estão criados, precisamos ter um banco de dados que reflita a estrutura deles. Mas pra que se dar a esse trabalho?

O AtlasJS, através do [Sequelize](https://sequelize.org/master/) permite criar e atualizar a estrutura do banco de dados para refletir a dos [Models](#orm.model), e existem três tipos de sincronização. 

Para utilizar qualquer uma delas, basta ativar a configuração equivalente no `.env` do projeto. Veja:

{<atlas_orm_sync>}

{<atlas_orm_sync_force>}

{<atlas_orm_sync_alter>}

> "AlterSync" e "ForceSync" podem ocasionar em erros a depender das chaves estrangeiras.

> Caso queira atualizar dados de um sistema em produção, consulte [Migração](#orm.migration).
