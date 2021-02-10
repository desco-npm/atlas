# Começando

O AtlasJS é um framework desenvolvido para uso pessoal e disponibilizado publicamente com o objetivo de integrar várias ferramentas de uso do dia-a-dia de desenvolvedores backend. Tais como:

* ORM ([Sequelize](https://sequelize.org/)) para manipulação mais simples e dinâmica do banco de dados
* Roteamento ([Express](https://expressjs.com/pt-br/)) com todas as rotas de [CRUD](https://pt.wikipedia.org/wiki/CRUD) já disponibilizadas
* Sistema de Permissionamento para restrição e liberação de acesso de usuários ou grupos de usuários aos recursos ([@desco/sequelize-permission-resources](https://www.npmjs.com/package/@desco/sequelize-permission-resources))
* Envio de Emails ([NodeMailer](https://nodemailer.com/about/))
* Geração de PDF direto do HTML ([html-pdf](https://www.npmjs.com/package/html-pdf)) ou mais avançado ([pdfmake](https://www.npmjs.com/package/pdfmake))
* Criação e manipulação de Tokens ([jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)) 
* Manipulação  de Data/Hora ([moment](https://www.npmjs.com/package/moment)) 
* Mais uma série de métodos de terceiros

Todos esses recursos já vem instalados, configurados e organizados de forma a simplificar, porém, evitar ao máximo o engessamento, permitindo que o desenvolvedor ainda tenha acesso às ferramentas originais.

## Instalando

Rode o seguinte comando na linha de comando de sua preferência para instalar o AtlasJS no diretório desejado:

{<install>}

Além disso, será necessário criar alguns diretórios na raiz do projeto para a estrutura do AtlasJS, são eles:

* **models** - Onde ficarão os Models do projeto ([Veja aqui como criá-los]())
* **routes** - Onde ficarão as rotas do projeto ([Veja aqui como criá-las]())

Para finalizar, também é preciso criar um arquivo `.env` com as configurações do projeto (detalhes no próximo tópico).

## Configurando

O AtlasJS necessita de um arquivo `.env` no qual são definidas as configurações, veja todas elas:

{<node_env>}

> [Consulte as configurações de ORM aqui.](#orm)

> [Consulte as configurações de Servidor aqui.](#server)

> [Consulte as configurações de Permissões aqui.](#permission)

> [Consulte as configurações de Email aqui.](#email)

## Iniciando

Crie seu script de inicialização do servidor com o seguinte conteúdo para importar e executar o AtlasJS:

{<index>}

Agora, simplesmente execute este script!

{<run>}