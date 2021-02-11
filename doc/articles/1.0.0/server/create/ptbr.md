# Criando as Rotas

Vamos começar criando um arquivo com o nome de nossa [entidade](#entity) dentro do diretório `./routes`.

Supondo que nossa [entidade](#entity) seja User, o arquivo se chamará `User.js`.

> [Para maiores detalhes, consulte a documentação oficial do ExpressJS](https://expressjs.com/pt-br/)

Esta é a estrutura básica do arquivo de rota:

{<basic-route>}

Vamos detalhar:

Nosso arquivo exporta uma função e ela recebe como parâmetro um [objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo várias propriedades:

* **express** - [Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) contendo a instancia do [ExpressJS](https://expressjs.com/pt-br/);
* **entity** - Nome da [entidade](#entity) da rota. Util para usar na URL das rotas para que não precise ficar mudando rota por rota caso o nome mude;
* **models** - [Array](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Reference/Global_Objects/Array) contendo todos os [models](#orm.model) da aplicação;
* **Model** - [Objeto](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/B%C3%A1sico) do [Model](#orm.model) da [entidade](#entity);

Note que recebemos em nossa função um objeto do [ExpressJS](https://expressjs.com/pt-br/), dessa forma você pode criar as rotas exatamente como criaria em qualquer outra aplicação que usa o [ExpressJS](https://expressjs.com/pt-br/).

Note também que, recebendo o [Model](#orm.model) da [entidade](#entity) e todos os outros [models](#orm.model), podemos executar todos os [métodos do Model](#orm.model.method) dentro da rota.

## Rotas Órfãs

Pode parecer que sim, mas uma rota não precisa estar associada a um [Model](#orm.model), por exemplo, mesmo que não tenhamos um [Model](#orm.model) chamado **Google**, ainda podemos ter um arquivo de rota chamado **Google**.

Isso é especialmente útil para criar rotas genéricas ou associadas a [entidades](#entity) mais abstratas.