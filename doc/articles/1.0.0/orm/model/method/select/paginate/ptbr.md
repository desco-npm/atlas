# Paginação

É possível executar paginação no método `select()` do [Model](#orm.model) do [ORM](#orm) através do parâmetro `page`.

## Configurações

Definimos no arquivo `.env` do projeto a quantidade de registros a serem retornados a cada página por padrão:

{<atlas_orm_per_page>}

## Parâmetros

|Nome|Tipo|Informações|Descrição|
|--|--|--|--|
|options.page|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Opcional / Por padrão será o "1"|Página a ser retornada no sistema de [Paginação](#orm.paginate) do AtlasJS (irá sobrescrever "offset" e "limit")
|options.perPage|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|Opcional / Por padrão será definido pelo sistema de paginação como a configuração "ATLAS_ORM_PER_PAGE" apenas caso seja definido o parâmetro "page"|Quantidade de registros a serem retornados por página (irá sobrescrever `limit`)

## Exemplo

{<paginate>}
