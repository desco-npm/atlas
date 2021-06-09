const urlPattern = require('url-pattern')

class Permission {
  constructor () {
    this.setMiddlewares()
  }

  async init () {
    this.User = global.Atlas.Orm.listModels()[process.env.Atlas.Permission.Model.User]

    this.Group = global.Atlas.Orm.listModels()[process.env.Atlas.Permission.Model.Group]

    this.Permission = global.Atlas.Orm.listModels()[process.env.Atlas.Permission.Model.Permission]

    this.loginProp = process.env.Atlas.Permission.prop.login || 'login'

    this.passwordProp = process.env.Atlas.Permission.prop.password || 'password'

    this.activationCodeProp = process.env.Atlas.Permission.prop.activationCode || 'activationCode'

    this.activeProp = process.env.Atlas.Permission.prop.active || 'active'

    this.recoverCodeProp = process.env.Atlas.Permission.prop.recoverCode || 'recoverCode'

    this.tokenProp = process.env.Atlas.Permission.prop.token || 'token'

    this.validateTokenProp = process.env.Atlas.Permission.prop.validateToken || 'validateToken'

    this.resourceProp = process.env.Atlas.Permission.prop.resource || 'resource'

    this.allowProp = process.env.Atlas.Permission.prop.allow || 'allow'

    this.activationMailFrom = process.env.Atlas.Permission.activationMailFrom || 'Activation Code'

    this.activationMailSubject = (
      process.env.Atlas.Permission.mail.activationSubject || 'Activation Code'
    )

    this.activationMailText = (
      process.env.Atlas.Permission.mail.activationText || 'Your activation code is {{code}}'
    )

    this.activationMailHtml = (
      process.env.Atlas.Permission.mail.activationHtml || 'Your activation code is <b>{{code}}</b>'
    )

    this.recoverPasswordMailFrom = (
      process.env.Atlas.Permission.mail.recoverPasswordFrom || 'Recover Password Code'
    )

    this.recoverPasswordMailSubject = (
      process.env.Atlas.Permission.mail.recoverPasswordSubject || 'Recover Password Code'
    )

    this.recoverPasswordMailText = (
      process.env.Atlas.Permission.mail.recoverPasswordText || 'Your recover code is {{code}}'
    )

    this.recoverPasswordMailHtml = (
      process.env.Atlas.Permission.mail.recoverPasswordHtml || 'Your recover code is <b>{{code}}</b>'
    )

    this.loginRoute = process.env.Atlas.Permission.route.login || '/login'

    this.registerRoute = process.env.Atlas.Permission.route.register || '/register'

    this.refreshActiveCodeRoute = (
      process.env.Atlas.Permission.route.refreshActiveCode || '/refreshActiveCodeRoute'
    )

    this.activeCodeRoute = process.env.Atlas.Permission.route.activeCode || '/active-account'

    this.sendPasswordRecoverCodeRoute = (
      process.env.Atlas.Permission.route.sendPasswordRecoverCode || '/send-password-recover-code'
    )

    this.refreshPasswordRoute = (
      process.env.Atlas.Permission.route.refreshPassword || '/refresh-password'
    )

    this.pushRegisterData = process.env.Atlas.Permission.pushRegisterData || (i => i)
  }

  start () {
    this.defineRelations()
    this.setMethods()
    this.setRouters()
  }

  defineRelations () {
    const throughUserGroup = [ this.User.name, this.Group.name, ].sort().join('_')

    this.User.belongsToMany(this.Group, { through: throughUserGroup, })
    this.Group.belongsToMany(this.User, { through: throughUserGroup, })

    this.User.hasMany(this.Permission)
    this.Permission.belongsTo(this.User)

    this.Group.hasMany(this.Permission)
    this.Permission.belongsTo(this.Group)
  }

  setMethods () {
    this.User.generateActiveCode = async () => {
      return randomstring(4).toUpperCase()
    }

    this.User.refreshActiveCode = async data => {
      return this.User.change({
        [process.env.Atlas.Orm.pkName]: data[process.env.Atlas.Orm.pkName],
        [this.activationCodeProp]: data[this.activationCodeProp],
      })
    }

    this.User.sendActiveCodeMail = data => {
      const fromName = this.activationMailFrom
      const fromMail = process.env.Atlas.Mail.auth.user

      return Atlas.Mail.send({
        from: `${fromName} <${fromMail}>`,
        to: data[this.loginProp],
        subject: this.activationMailSubject,
        text: this.activationMailText
          .replace('{{code}}', data[this.activationCodeProp]),
        html: this.activationMailHtml
          .replace('{{code}}', data[this.activationCodeProp]),
      })
    }

    this.User.activeCode = async data => {
      const user = await this.User.read(data[process.env.Atlas.Orm.pkName])

      if (!user) {
        return Promise.reject({ msg: 'User not found', })
      }

      if (data[this.activationCodeProp] !== user[this.activationCodeProp]) {
        return Promise.reject({ msg: 'Código invalido', })
      }

      await this.User.change({ ...user, [this.activeProp]: true, [this.activationCodeProp]: null, })

      return this.User.login(user[this.loginProp], user[this.passwordProp])
    }

    this.User.generatePasswordRecoveryCode = async data => {
      const options = { where: {}, }

      if (data[process.env.Atlas.Orm.pkName]) {
        options.where[process.env.Atlas.Orm.pkName] = data[process.env.Atlas.Orm.pkName]
      }
      else if (data[this.loginProp]) {
        options.where[this.loginProp] = data[this.loginProp]
      }
      else {
        return Promise.reject({ message: 'No data', })
      }

      let user = await this.User.selectOne(options)

      if (!user) return Promise.reject({ msg: 'User not found', })

      const code = randomstring(4).toUpperCase()

      user = await this.User.change({ ...user, [this.recoverCodeProp]: code, })

      return Promise.resolve(user)
    }

    this.User.refreshPassword = async data => {
      const user = await this.User.selectOne({
        where: {
          [this.loginProp]: data[this.loginProp],
          [this.recoverCodeProp]: data[this.recoverCodeProp],
        },
      })


      if (!user) return Promise.reject({ msg: 'Invalid Recover Code', })

      const record = {
        ...user,
        [this.passwordProp]: data[this.passwordProp],
        [this.recoverCodeProp]: null,
      }

      await this.User.change(record)

      return this.User.login(user.Login, data[this.passwordProp])
    }

    this.User.sendRecoverPasswordMail = data => {
      const fromName = this.recoverPasswordMailFrom
      const fromMail = process.env.Atlas.Mail.auth.user

      return Atlas.Mail.send({
        from: `${fromName} <${fromMail}>`,
        to: data[this.loginProp],
        subject: this.recoverPasswordMailSubject,
        text: this.recoverPasswordMailText
          .replace('{{code}}', data[this.activationCodeProp]),
        html: process.env.Atlas.Permission.recoverPasswordMailHtml
          .replace('{{code}}', data[this.activationCodeProp]),
      })
    }

    this.User.login = async (login, password) => {
      const where = {
        [this.loginProp]: login,
        [this.passwordProp]: password,
      }

      const user = await this.User.selectOne({ where, })

      if (!user) return {}

      const token = generateToken(
        { [process.env.Atlas.Orm.pkName]: user[process.env.Atlas.Orm.pkName], time: new Date(), },
        process.env.Atlas.hash.key,
        { algorithm: process.env.Atlas.hash.algorithm, expiresIn: '1h', }
      )

      const decoded = this.User.decodeToken(token, {complete: true,})

      const loggedUser = await this.User.save({
        ...user,
        [this.tokenProp]: token,
        [this.validateTokenProp]: decoded.payload.iat,
      })

      return {
        [process.env.Atlas.Orm.pkName]: loggedUser[process.env.Atlas.Orm.pkName],
        [this.loginProp]: loggedUser[this.loginProp],
        [this.tokenProp]: loggedUser[this.tokenProp],
        [this.validateTokenProp]: loggedUser[this.validateTokenProp],
      }
    }

    this.User.decodeToken = token => {
      return decodeToken(token, {complete: true,})
    }

    this.User.loginCallback = data => {
      return {
        [process.env.Altas.Orm.pkName]: data[process.env.Altas.Orm.pkName],
        [this.tokenProp]: data[this.tokenProp],
        [this.validateTokenProp]: data[this.validateTokenProp],
        [this.activeProp]: data[this.activeProp],
      }
    }

    this.User.checkToken = async req => {
      const token = req.headers.authorization.split('Bearer')[1].trim()
      const user = await this.User.selectOne({
        where: { [this.tokenProp]: token, },
        include: [
          this.Permission,
          {
            model: this.Group,
            include: this.Permission,
          },
        ],
      })

      return Promise.resolve({ user, token, })
    }

    this.User.checkPermission = async (req, user) => {
      const publicPermissions = await this.Permission.select({
        where: {
          [this.User.name + 'Id']: null,
          [this.Group.name + 'Id']: null,
        },
      })

      const publicAllowed = publicPermissions.rows
        .filter(p => {
          const resource = p[this.resourceProp].split('|')
          const url = new urlPattern(resource[1])

          return url.match(req.url) !== null && [ 'ALL', req.method, ].indexOf(resource[0]) !== -1
        })
        .length === 1

      if (!user) return publicAllowed

      let userPermissions = await this.Permission.select({
        where: {
          [this.User.name + 'Id']: user[process.env.Atlas.Orm.pkName],
        },
      })

      userPermissions = userPermissions.rows
        .filter(p => {
          const resource = p[this.resourceProp].split('|')
          const url = new urlPattern(resource[1])

          return url.match(req.url) !== null && [ 'ALL', req.method, ].indexOf(resource[0]) !== -1
        })

      const userAllowed = userPermissions.filter(p => p[this.allowProp === true]).length === 1
      const userDenied = userPermissions.filter(p => p[this.allowProp === false]).length === 1

      console.log(Object.keys(this.Group))

      return publicAllowed || (userAllowed && !userDenied)
    }
  }

  setRouters () {
    Atlas.Server.express.post(this.registerRoute, async (req, res) => {
      req.body[this.activationCodeProp] = await this.User.generateActiveCode()

      req.body = this.pushRegisterData(req.body)

      const user = await this.User.insert(req.body)

      await this.User.sendActiveCodeMail(user)

      res.json({ [process.env.Atlas.Orm.pkName]: user[process.env.Atlas.Orm.pkName], })
    })

    Atlas.Server.express.post(this.refreshActiveCodeRoute, async (req, res) => {
      req.body[this.activationCodeProp] = await this.User.generateActiveCode()

      const user = await this.User.refreshActiveCode(req.body)

      await this.User.sendActiveCodeMail(user)

      res.json({ [process.env.Atlas.Orm.pkName]: user[process.env.Atlas.Orm.pkName], })
    })

    Atlas.Server.express.put(this.activeCodeRoute, async (req, res) => {
      const data = {
        [process.env.Atlas.Orm.pkName]: req.body[process.env.Atlas.Orm.pkName],
        [this.activationCodeProp]: (req.body[this.activationCodeProp] || '').toUpperCase(),
      }

      this.User.activeCode(data)
        .then((response) => res.json(response))
        .catch(e => res.status(500).json(e))
    })

    Atlas.Server.express.post(this.sendPasswordRecoverCodeRoute, async (req, res) => {
      const data = {
        [process.env.Atlas.Orm.pkName]: req.body[process.env.Atlas.Orm.pkName],
        [this.loginProp]: req.body[this.loginProp],
      }

      this.User.generatePasswordRecoveryCode(data)
        .then(async user => {
          await this.User.sendRecoverPasswordMail(user)

          res.json({ [process.env.Atlas.Orm.pkName]: user[process.env.Atlas.Orm.pkName], })
        })
        .catch(e => res.status(500).json(e))
    })

    Atlas.Server.express.put(this.refreshPasswordRoute, async (req, res) => {
      const data = {
        [this.passwordProp]: req.body[this.passwordProp],
        [this.recoverCodeProp]: (req.body[this.recoverCodeProp] || '').toUpperCase(),
        [this.loginProp]: req.body[this.loginProp],
      }

      this.User.refreshPassword(data)
        .then(data => {
          res.json(data)
        })
        .catch(e => res.status(500).json(e))
    })

    Atlas.Server.express.post(this.loginRoute, async (req, res) => {
      res.json(await this.User.login(req.body[this.loginProp], req.body[this.passwordProp]))
    })
  }

  setMiddlewares () {
    Atlas.Server.express.use(async (req, res, next) => {
      const { user, token, } = await this.User.checkToken(req)

      if (await this.User.checkPermission(req, user)) {
        next()
      }
      else {
        res.status(403).json({ msg: 'Invalid token', token, })
      }
    })
  }
}

module.exports = new Permission()