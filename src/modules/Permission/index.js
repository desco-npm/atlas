const urlPattern = require('url-pattern')

class Permission {
  constructor () {
    this.setMiddlewares()

    Atlas.Config.setDefault('Permission.prop.login', 'login')

    Atlas.Config.setDefault('Permission.prop.password', 'password')

    Atlas.Config.setDefault('Permission.prop.activationCode', 'activationCode')

    Atlas.Config.setDefault('Permission.prop.active', 'active')

    Atlas.Config.setDefault('Permission.prop.recoverCode', 'recoverCode')

    Atlas.Config.setDefault('Permission.prop.token', 'token')

    Atlas.Config.setDefault('Permission.prop.validateToken', 'validateToken')

    Atlas.Config.setDefault('Permission.prop.resource', 'resource')

    Atlas.Config.setDefault('Permission.prop.allow', 'allow')

    Atlas.Config.setDefault('Permission.activationMailFrom', 'Activation Code')

    Atlas.Config.setDefault('Permission.mail.activationSubject', 'Activation Code')

    Atlas.Config.setDefault('Permission.mail.activationText', 'Your activation code is {{code}}')

    Atlas.Config.setDefault(
      'Permission.mail.activationHtml', 'Your activation code is <b>{{code}}</b>'
    )

    Atlas.Config.setDefault('Permission.mail.recoverPasswordFrom', 'Recover Password Code')

    Atlas.Config.setDefault('Permission.mail.recoverPasswordSubject', 'Recover Password Code')

    Atlas.Config.setDefault('Permission.mail.recoverPasswordText', 'Your recover code is {{code}}')

    Atlas.Config.setDefault(
      'Permission.mail.recoverPasswordHtml', 'Permission.mail.recoverPasswordText'
    )

    Atlas.Config.setDefault('Permission.route.login', '/Login')

    Atlas.Config.setDefault('Permission.route.register', '/Register')

    Atlas.Config.setDefault('Permission.route.refreshActiveCode', '/RefreshActiveCodeRoute')

    Atlas.Config.setDefault('Permission.route.activeCode', '/ActiveAccount')

    Atlas.Config.setDefault('Permission.route.sendPasswordRecoverCode', '/SendPasswordRecoverCode')

    Atlas.Config.setDefault('Permission.route.refreshPassword', '/RefreshPassword')

    Atlas.Config.setDefault('Permission.pushRegisterData', (i => i))
  }

  async init () {
    this.User = Atlas.Orm.listModels()[Atlas.Config.get('Permission.Model.User')]

    this.Group = Atlas.Orm.listModels()[Atlas.Config.get('Permission.Model.Group')]

    this.Permission = Atlas.Orm.listModels()[Atlas.Config.get('Permission.Model.Permission')]

    this.loginProp = Atlas.Config.get('Permission.prop.login')

    this.passwordProp = Atlas.Config.get('Permission.prop.password')

    this.activationCodeProp = Atlas.Config.get('Permission.prop.activationCode')

    this.activeProp = Atlas.Config.get('Permission.prop.active')

    this.recoverCodeProp = Atlas.Config.get('Permission.prop.recoverCode')

    this.tokenProp = Atlas.Config.get('Permission.prop.token')

    this.validateTokenProp = Atlas.Config.get('Permission.prop.validateToken')

    this.resourceProp = Atlas.Config.get('Permission.prop.resource')

    this.allowProp = Atlas.Config.get('Permission.prop.allow')

    this.activationMailFrom = Atlas.Config.get('Permission.activationMailFrom')

    this.activationMailSubject = Atlas.Config.get('Permission.mail.activationSubject')

    this.activationMailText = Atlas.Config.get('Permission.mail.activationText')

    this.activationMailHtml = Atlas.Config.get('Permission.mail.activationHtml')

    this.recoverPasswordMailFrom = Atlas.Config.get('Permission.mail.recoverPasswordFrom')

    this.recoverPasswordMailSubject = Atlas.Config.get('Permission.mail.recoverPasswordSubject')

    this.recoverPasswordMailText = Atlas.Config.get('')

    this.recoverPasswordMailHtml = Atlas.Config.get('Permission.mail.recoverPasswordHtml')

    this.loginRoute = Atlas.Config.get('Permission.route.login')

    this.registerRoute = Atlas.Config.get('Permission.route.register')

    this.refreshActiveCodeRoute = Atlas.Config.get('Permission.route.refreshActiveCode')

    this.activeCodeRoute = Atlas.Config.get('Permission.route.activeCode')

    this.sendPasswordRecoverCodeRoute = Atlas.Config.get('Permission.route.sendPasswordRecoverCode')

    this.refreshPasswordRoute = Atlas.Config.get('Permission.route.refreshPassword')

    this.pushRegisterData = Atlas.Config.get('Permission.pushRegisterData')
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
        [Atlas.Config.get('Orm.pkName')]: data[Atlas.Config.get('Orm.pkName')],
        [this.activationCodeProp]: data[this.activationCodeProp],
      })
    }

    this.User.sendActiveCodeMail = data => {
      const fromName = this.activationMailFrom
      const fromMail = Atlas.Config.get('Mail.auth.user')

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
      const user = await this.User.read(data[Atlas.Config.get('Orm.pkName')])

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

      if (data[Atlas.Config.get('Orm.pkName')]) {
        options.where[Atlas.Config.get('Orm.pkName')] = data[Atlas.Config.get('Orm.pkName')]
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
      const fromMail = Atlas.Config.get('Mail.auth.user')

      const params = {
        from: `${fromName} <${fromMail}>`,
        to: data[this.loginProp],
        subject: this.recoverPasswordMailSubject,
        text: this.recoverPasswordMailText
          .replace('{{code}}', data[this.recoverCodeProp]),
        html: this.recoverPasswordMailHtml
          .replace('{{code}}', data[this.recoverCodeProp]),
      }

      return Atlas.Mail.send(params)
    }

    this.User.login = async (login, password) => {
      const where = {
        [this.loginProp]: login,
        [this.passwordProp]: password,
      }

      const user = await this.User.selectOne({ where, })

      if (!user) return {}

      const token = generateToken(
        {
          [Atlas.Config.get('Orm.pkName')]: user[Atlas.Config.get('Orm.pkName')],
          time: new Date(),
        },
        Atlas.ConfigAtlas.Config.get('hash.key'),
        { algorithm: Atlas.Config.get('hash.algorithm'), expiresIn: '1h', }
      )

      const decoded = this.User.decodeToken(token, {complete: true,})

      const loggedUser = await this.User.save({
        ...user,
        [this.tokenProp]: token,
        [this.validateTokenProp]: decoded.payload.iat,
      })

      return {
        [Atlas.Config.get('Orm.pkName')]: loggedUser[Atlas.Config.get('Orm.pkName')],
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

    this.Permission.checkToken = async req => {
      if (!req.headers.authorization) return Promise.resolve({ user: null, token: null, })

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

    this.Permission.checkPermission = async (req, user) => {
      const publicAllowed = await this.Permission.checkPublicPermission(req)

      if (publicAllowed) return true

      if (!user) return false

      const userAllowed = await this.Permission.checkUserPermission(req, user)

      if (userAllowed) return true

      const groupAllowed = await this.Permission.checkGroupPermission(req, user)

      if (groupAllowed) return true

      return false
    }

    this.Permission.checkPublicPermission = async req => {
      const permissions = await this.Permission.select({
        where: {
          [this.User.name + 'Id']: null,
          [this.Group.name + 'Id']: null,
        },
      })

      return this.Permission.filterByPattern(permissions.rows, req).length === 1
    }

    this.Permission.checkUserPermission = async (req, user) => {
      const permissions = await this.Permission.select({
        where: {
          [this.User.name + 'Id']: user.Id,
        },
      })

      return this.Permission.filterByPattern(permissions.rows, req).length === 1
    }

    this.Permission.checkGroupPermission = async (req, user) => {
      const ids = user[inflection.pluralize(this.Group.name)]
        .map(i => i[Atlas.Config.get('Orm.pkName')])

      const permissions = await this.Permission.select({
        where: {
          [this.Group.name + 'Id']: ids,
        },
      })

      return this.Permission.filterByPattern(permissions.rows, req).length === 1
    }

    this.Permission.filterByPattern = (permissions, req) => {
      return permissions
        .filter(p => {
          const resource = p[this.resourceProp].split('|')

          if (resource.length === 1) resource.unshift('ALL')
          const url = new urlPattern(resource[1].split('?')[0])

          return (
            url.match(req.url.split('?')[0]) !== null &&
            [ 'ALL', req.method, ].indexOf(resource[0]) !== -1
          )
        })
    }
  }

  setRouters () {
    Atlas.Server.express.post(this.registerRoute, async (req, res) => {
      req.body[this.activationCodeProp] = await this.User.generateActiveCode()

      req.body = this.pushRegisterData(req.body)

      const user = await this.User.insert(req.body)

      await this.User.sendActiveCodeMail(user)

      res.json({ [Atlas.Config.get('Orm.pkName')]: user[Atlas.Config.get('Orm.pkName')], })
    })

    Atlas.Server.express.put(this.refreshActiveCodeRoute, async (req, res) => {
      req.body[this.activationCodeProp] = await this.User.generateActiveCode()

      const user = await this.User.refreshActiveCode(req.body)

      await this.User.sendActiveCodeMail(user)

      res.json({ [Atlas.Config.get('Orm.pkName')]: user[Atlas.Config.get('Orm.pkName')], })
    })

    Atlas.Server.express.put(this.activeCodeRoute, async (req, res) => {
      const data = {
        [Atlas.Config.get('Orm.pkName')]: req.body[Atlas.Config.get('Orm.pkName')],
        [this.activationCodeProp]: (req.body[this.activationCodeProp] || '').toUpperCase(),
      }

      this.User.activeCode(data)
        .then((response) => res.json(response))
        .catch(e => res.status(500).json(e))
    })

    Atlas.Server.express.post(this.sendPasswordRecoverCodeRoute, async (req, res) => {
      const data = {
        [Atlas.Config.get('Orm.pkName')]: req.body[Atlas.Config.get('Orm.pkName')],
        [this.loginProp]: req.body[this.loginProp],
      }

      this.User.generatePasswordRecoveryCode(data)
        .then(async user => {
          await this.User.sendRecoverPasswordMail(user)

          res.json({ [Atlas.Config.get('Orm.pkName')]: user[Atlas.Config.get('Orm.pkName')], })
        })
        .catch(e => res.status(500).json(e))
    })

    Atlas.Server.express.put(this.refreshPasswordRoute, async (req, res) => {
      const data = {
        [this.passwordProp]: req.body[this.passwordProp],
        [this.recoverCodeProp]: (req.body[this.recoverCodeProp] || '').toUpperCase(),
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
      const { user, token, } = await this.Permission.checkToken(req)

      if (await this.Permission.checkPermission(req, user)) {
        next()
      }
      else {
        res.status(403).json({ msg: 'Invalid token', token, })
      }
    })
  }
}

module.exports = new Permission()