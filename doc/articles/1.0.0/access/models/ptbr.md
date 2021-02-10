# Modelos

O sistema de acesso do AtlasJS precisa de alguns [modelos](#orm.model) e seus atributos para funcionar, vamos ver cada um deles:

## User

[Modelo](#orm.model) que irá gerenciar os usuários da aplicação. Configurado em [`ATLAS_AUTH_USER_MODEL`](#access.login).

Deve ter os seguintes atributos:

* **Login** - Atributo que armazenará o token do usuário. Configurado em [`ATLAS_AUTH_LOGIN_PROP`](#access.login);
* **Mail** - Atributo que armazenará o e-mail do usuário. Configurado em [`ATLAS_AUTH_MAIL_PROP`](#access.login);
* **Password** - Atributo que armazenará a senha do usuário. Configurado em [`ATLAS_AUTH_PSW_PROP`](#access.login);
* **Token** - Atributo que armazenará o token do usuário. (Pelo menos 500 caracteres) Configurado em [`ATLAS_AUTH_EXPIRE_TOKEN_PROP`](#access.login);
* **TokenType** - Atributo que armazenará o tipo de token do usuário. Configurado em [`ATLAS_AUTH_TOKEN_TYPE_PROP`](#access.login);

> Token é uma chave de acesso expirável que o usuário ganha após se identificar com login e senha.

> TokenType pode ser "default" ou "google" dependendo se foi gerado pela aplicação ou pelo login do google.

## Group

[Modelo](#orm.model) que irá gerenciar os grupos de usuários da aplicação. Configurado em [`ATLAS_AUTH_GROUP_MODEL`](#access.permission).

Esse [Modelo](#orm.model)só é necessário se `ATLAS_PERMISSION` for `true`.

Não existem atributos obrigatórios, apenas um `id` para referência nos [relacionamentos](#orm.model.create.relation).

## Permission

[Modelo](#orm.model) que irá gerenciar as permissões de acesso aos recursos. Configurado em [`ATLAS_AUTH_MODEL`](#access.permission).

Esse [Modelo](#orm.model)só é necessário se `ATLAS_PERMISSION` for `true`.

* **resource** - Nome do recurso que será liberado ou não;
* **allow** - Se o acesso ao recurso esta liberado ao usuário ou grupo, bloqueado ou padrão (negado a menos que outra permissão libere). Deve ser `BOOLEAN`;

> Os relacionamentos com User e Group serão definidos automaticamente.

> Os nomes destes atributos não são configuráveis, crie-os exatamente como informado.