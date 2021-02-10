module.exports = {
  title: 'ATLAS_AUTH_ALGORITHM',
  description: `
Algoritmo a ser utilizado para o [hasheamento](https://www.techtudo.com.br/artigos/noticia/2012/07/o-que-e-hash.html) dos tokens.

[Consulte aqui os algoritmos suportados](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported)
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_AUTH_ALGORITHM=HS256
      `,
    },
  ],
}