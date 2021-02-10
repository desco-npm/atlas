# Transações

Eventualmente precisamos executar várias operações no banco de dados e, claro, todas devem funcionar. 

Mas, se alguma der erro, vamos querer desfazer as operações anteriores, certo?

É exatamente isso que são as transações. Se alguma operação dentro de um conjunto der erro, todas as operações são desfeitas.

## Como Usar

Chamamos o método [transaction()](#orm.method.transaction) do [ORM](#orm) para iniciar a transição, este método recebe como parâmetro uma [função anônima](https://imasters.com.br/back-end/funcoes-anonimas-lambda-e-closure-no-php).

A [função anônima](https://imasters.com.br/back-end/funcoes-anonimas-lambda-e-closure-no-php) receberá como parâmetro um [objeto de transição do Sequelize](https://sequelize.org/master/manual/transactions.html) e deverá executar todo o conjunto de operações desejadas.

Estas operações receberão como opções o [objeto de transição do Sequelize](https://sequelize.org/master/manual/transactions.html), desta forma, caso alguma das operações falhe, todas as outras serão desfeitas.

> [Consulte a documentação oficial do Sequelize para maiores informações.](https://sequelize.org/master/manual/transactions.html)

{<transaction>}