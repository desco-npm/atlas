const nodemailer = require('nodemailer')

class Mail {
  constructor () {
    this.transporters = {}
  }

  init () {
    const transporters = process.env.Atlas.MAIL.split(';')

    transporters.map((transporter, k) => {
      transporter = JSON.parse(transporter)

      transporter.name = transporter.name || `mail${k + 1}`

      transporter = {
        ...transporter,
        tls: {
          ...transporter.tls,
          rejectUnauthorized: transporter.tls.rejectUnauthorized || false,
        },
      }

      this.transporters[transporter.name] = nodemailer.createTransport(transporter)
    })
  }

  async send (config, callback) {
    const name = config.name || Object.keys(this.transporters)[0]

    return await this.transporters[name].sendMail(config, callback)
  }
}

module.exports = new Mail()