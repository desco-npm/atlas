module.exports = {
  title: 'ATLAS_GOOGLE_AUTH_SCOPE',
  description: `
Escopos a serem solicitados ao App da Google.

Devem ser passados sem a URL, somente o escopo e separados por ponto-e-vírgula.
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_GOOGLE_AUTH_SCOPE=userinfo.email;userinfo.profile
      `,
    },
  ],
}