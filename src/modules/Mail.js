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

      this.transporters[transporter.name] = nodemailer.createTransport({
        host: transporter.host,
        port: transporter.port,
        secure: transporter.secure, // true for 465, false for other ports
        auth: {
          user: transporter.user,
          pass: transporter.password,
        },
        tls: {
          rejectUnauthorized: transporter.rejectUnauthorized || false
        }
      })
    })
  }
  
  async send (config) {
    const name = config.name || Object.keys(this.transporters)[0]

    return await this.transporters[name].sendMail(config)
  }
}

module.exports = new Mail()