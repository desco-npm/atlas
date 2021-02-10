# Definindo  Validações

Todo desenvolvedor que se prese sabe que não basta validar os dados no frontend, é preciso validar também no backend!

Graças ao [Sequelize](https://sequelize.org/master/) embutido, o AtlasJS permite executar essas validações facilmente simplesmente seguindo a estrutura do [Sequelize](https://sequelize.org/master/).

Explicando rapidamente: Dentro das definições do atributo, adicionamos a propriedade `validate` que recebe as validações desejadas. Veja:

> [Consulte aqui para conhecer as validações do Sequelize e também como criar as suas próprias](https://sequelize.org/master/manual/validations-and-constraints.html)

{<validations>}