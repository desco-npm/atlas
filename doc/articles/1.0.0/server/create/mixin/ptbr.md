# Mixins

Eventualmente podemos querer arquivos de rotas que compartilhem uma determinada estrutura (mixin) e isso é muito simples sem nem mesmo depender do AtlasJS!

## Como fazer

Simplesmente crie um novo arquivo de rotas, com toda a estrutura de rotas que deseja que seja compartilhada.

O local desse arquivo não importa, apenas não deixe dentro dos diretórios nativos do AtlasJS para que não seja carregado automaticamente causando problemas.

Com o arquivo criado, simplesmente importe e execute em seus arquivos de rotas que deverão ter esse conjunto de comportamentos. Não esqueça de repassar todos os parâmetros!

{<example>}