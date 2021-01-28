module.exports = {
  title: 'ATLAS_AUTH_SECRET',
  description: `
Chave que deve ser utilizada para o [hasheamento](https://www.techtudo.com.br/artigos/noticia/2012/07/o-que-e-hash.html) dos tokens.

Absolutamente qualquer string serve, quanto mais aleatória, melhor!
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_AUTH_SECRET=ihfgnjdhfginasijk.SDVINSKDGHINKsbivnkrjo
      `,
    },
  ],
}