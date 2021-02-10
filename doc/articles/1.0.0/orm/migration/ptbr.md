# Migração

Em algum momento será necessário atualizar uma aplicação que já se encontra em produção, e possívelmente mudanças ocorrerão nos [Models](#orm.model).

Como dito em [Sincronização](#orm.sync), utilizá-la nesses ambientes pode ser perigoso por perda de dados.

Como resolver então?

Como o AtlasJS utiliza o [Sequelize](https://sequelize.org/master/variable/index.html#static-variable-DataTypes), nada nos impede de utilizar as migrações dele.

## Conceito

A Migração é a coisa mais próxima que existe de um [GIT](https://pt.wikipedia.org/wiki/Git) para banco de dados e funciona da seguinte maneira:

* Criamos um arquivo de migração contendo dois blocos: `up` e `down`;
* O bloco `up` executará comandos no banco de dados para atualizá-lo da última migrada para a nova;
* O bloco `down` executará comandos no banco de dados para atualizá-lo da nova versão migrada para a anterior, na prática desfazendo uma migração;
* Os arquivos de migração devem possuir nomes que os deixem em ordem do mais antigo para o mais recente, dessa forma saberemos a ordem que deve ser seguida;
* Ao executar a migração, o [Sequelize](https://sequelize.org/master/variable/index.html#static-variable-DataTypes) irá executar todos os arquivos que não tiverem sido executados anteriormente, atualizando (ou revertendo uma atualização) assim o banco de dados;

Embora bem mais chato que uma simples [Sincronizaão](#orm.sync), esta forma permite criar uma forma programática de atualização para que tenha um controle de alterações do banco de dados e também facilitando a atualização do banco quando o projeto roda em várias máquinas diferentes;

## Como Usar

Como a Migração é 100% do [Sequelize](https://sequelize.org/master/variable/index.html#static-variable-DataTypes), sem qualquer alteração do AtlasJS, basta seguir a [documentação oficial de Migração do Sequelize](https://sequelize.org/master/manual/migrations.html).