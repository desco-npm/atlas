module.exports = {
  title: 'ATLAS_SERVER_STATIC',
  description: `
Diretórios e URLs a serem utilizados de forma estática.

Estes diretórios/arquivos serão carregados de forma pura, sem passar por rotas.

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