# Mixins

Em ["Criando Métodos"](#orm.create.method) vimos que é possível criar o seu próprio método no [Model](#orm.model) desejado.

Porém, eventualmente podemos ter um conjunto de métodos e propriedades que desejamos adicionar não a um único [Model](#orm.model), mas vários. Para isso utilizamos as Mixins.

Mixins são objetos contendo métodos e propriedades a serem adicionadas ao nosso [Model](#orm.model) com uso da propriedade `mixins` do [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) passado por parâmetro ao `Orm.addModel()`.

{<mixins>}