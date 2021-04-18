const isArray = require('is-array')
const nodemailer = require('nodemailer')

class Mail {
  constructor () {
    this.transporters = {}
  }

  init () {
    const transporters = isArray(process.env.Atlas.Mail)
      ? process.env.Atlas.Mail
      : [process.env.Atlas.Mail,]

    transporters.map((transporter, k) => {
      transporter.name = transporter.name || `mail${k + 1}`

      transporter = {
        ...transporter,
        tls: {
          ...transporter.tls,
          rejectUnauthorized: (transporter.tls || {}).rejectUnauthorized || false,
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