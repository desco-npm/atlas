module.exports = {
  title: 'ATLAS_MAIL',
  description: `
Configuração de emails a serem usados pelo para envio de e-mails.

Deve ser passado em forma de JSON válido em uma única linha contendo todas as configurações.

Caso deseje mais de uma conta de email, basta adicionar vários JSONs separados por ponto-e-vírgula.

As propriedades do JSON são as mesmas do [NodeMailer](https://nodemailer.com/about/) (exceto "*name*"), entre elas:

* **name**: Nome do e-mail para ser chamado no código. Se omitido, será chamado de "*mailN*" sendo **N** a posição do e-mail na lista;
* **host**: Host do e-mail com o qual se conectar;
* **port**: Porta do e-mail com o qual se conectar;
* **secure**: Se e-mail utiliza TLS/STARTTLS;
* **user**: Usuário para se autenticar no e-mail com o qual se conectar;
* **password**: Senha para se autenticar no e-mail com o qual se conectar;
* **tls.rejectUnauthorized**: Se deve rejeitar conexão com servidores que não puderam ter a identidade verificada;

Para maiores informações sobre as configurações do [NodeMailer](https://nodemailer.com/about/), consulte a [documentação oficial](https://nodemailer.com/about/).
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_MAIL={ "name": "myMail", "host": "br142.hostgator.com.br", "port": 465, "secure": true, "user": "noreplydomain.com.br", "password": "123456", "tls" : { "rejectUnauthorized": false } },{ "host": "br142.hostgator.com.br", "port": 465, "secure": true, "user": "noreplydomain2.com.br", "password": "123456", "tls" : { "rejectUnauthorized": false } }
      `,
    },
  ],
}