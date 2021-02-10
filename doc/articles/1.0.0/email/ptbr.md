# E-mail

O AtlasJS permite envio de e-mails através do [NodeMailer](https://nodemailer.com/about/).

## Configurando

Configure os e-mails através do `.env`:

{<atlas_mail>}

## Enviando E-Mails

Para enviar um E-Mail, basta chamar o método `send` do módulo `Mail` do AtlasJS passando para ele os mesmos parâmetros que seriam passados para o [NodeMailer](https://nodemailer.com/about/). 

A única diferença é a propriedade `name` passada no primeiro parâmetro, este é o nome do e-mail a ser usado, este `name` é definido nas configurações, caso contrário, será `mailN` sendo `N` a posição do E-Mail na lista de configurações.

> [Consulte a documentação oficial do NodeMailer, para conhecer melhor todos os parâmetros de envio.](https://nodemailer.com/usage/)

{<send>}