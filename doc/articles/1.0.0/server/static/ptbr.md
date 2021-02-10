# Servindo Arquivos Estáticos

Por padrão o [ExpressJS](https://expressjs.com/pt-br/) entrega apenas um conteúdo préviamente programado, porém é possível definir para que determinadas rotas entreguem o conteúdo de diretórios, permitindo assim que arquivos destes diretórios sejam acessados publicamente.

Para isso, primeiro é preciso criar os diretórios que desejamos servir estaticamente, digamos por exemplo `public` e `files`.

## Configurações

Após criar os diretórios, definimos as configurações:

{<atlas_server_static>}

## Carregando arquivos

Supondo que o host seja `localhost`, porta `3000` e o arquivo `myFile` no diretório `file`, basta chamar a url: `http://localhost:3000/files/myFile.txt`.

Agora, se for no diretório `public`, chamar a url: `http://localhost:3000/public/myFile.txt`.