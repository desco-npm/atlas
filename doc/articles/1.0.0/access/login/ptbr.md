# Login

O login já vem implementado nativamente no AtlasJS, para isso basta enviar uma requisição `POST`para a URL `/login` passando o login e a senha do usuário, devendo os nomes dessas propriedades ser iguais aos definidos em `ATLAS_AUTH_LOGIN_PROP` e `ATLAS_AUTH_PWD_PROP`

O retorno dessa chamada será um [JSON](https://www.json.org/json-en.html) contendo os dados do usuário ou `null` caso nada seja encontrado.

## Google

Caso `ATLAS_GOOGLE_AUTH` esteja definido como `true`, será possível executar login pela plataforma da Google.

Para isso, com todas as configurações da Google definidas, efetue uma requisição `GET` para a URL `/oauth/google`.

Essa chamada irá retornar um [JSON](https://www.json.org/json-en.html) contendo uma propriedade `url`, encaminhe o usuário para esta URL onde ele poderá efetuar o login na google.

Após o login bem sucedido, a Google irá redirecionar o usuário de volta para a URL `/googleCallbackbURL`.

## Configurações

{<atlas_auth_user_model>}

{<atlas_auth_secret>}

{<atlas_auth_algorithm>}

{<atlas_auth_psw_prop>}

{<atlas_auth_login_prop>}

{<atlas_auth_mail_prop>}

{<atlas_auth_token_prop>}

{<atlas_auth_token_type_prop>}

{<atlas_auth_user_pk_prop>}

{<atlas_auth_expire_token_prop>}

{<atlas_google_auth>}

{<atlas_google_auth_id>}

{<atlas_google_auth_key>}

{<atlas_google_auth_scope>}

{<atlas_google_auth_google_auth_prompt>}