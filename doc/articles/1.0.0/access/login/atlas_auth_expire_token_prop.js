module.exports = {
  title: 'ATLAS_AUTH_EXPIRE_TOKEN_PROP',
  description: `
Nome do atributo do [model](#orm.model) de usuário que será utilizada para armazenar a data de expiração do token.
  `,
  example: [
    {
      lang: 'env',
      content: `
      ATLAS_AUTH_EXPIRE_TOKEN_PROP=expireToken
      `,
    },
  ],
}