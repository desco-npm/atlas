module.exports = {
  title: 'ATLAS_SERVER_STATIC',
  description: `
O diretório e a URL devem ser passados separados por uma vírgula.

Caso a URL seja omitida, será usado o mesmo valor do diretório.

Mais de 1 item pode ser passado, basta separá-los por ponto-e-vírgula.

  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_SERVER_STATIC=public,/public;files
      `,
    },
  ],
}