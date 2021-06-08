module.exports = (config = {}) => {
  require('dotenv').config()

  process.env = { Atlas: {}, ...process.env, }

  process.env.Atlas = {
    env: process.env.NODE_ENV,
    host: process.env.ATLAS_HOST,
    Orm: {
      Db: {
        name: process.env.ATLAS_ORM_DB_NAME,
        user: process.env.ATLAS_ORM_DB_USER,
        password: process.env.ATLAS_ORM_DB_PASSWORD,
        host: process.env.ATLAS_ORM_DB_HOST,
        port: process.env.ATLAS_ORM_DB_PORT,
        dialog: process.env.ATLAS_ORM_DB_DIALOG,
        log: (process.env.ATLAS_ORM_DB_LOG || '').toLowerCase() === 'true',
      },
      pool: {
        max: process.env.ATLAS_ORM_POOL_MAX,
        min: process.env.ATLAS_ORM_POOL_MIN,
        idle: process.env.ATLAS_ORM_POOL_IDLE,
        acquire: process.env.ATLAS_ORM_POOL_ACQUIRE,
      },
      pkName: process.env.ATLAS_ORM_PK_NAME,
      sync: (process.env.ATLAS_ORM_SYNC || '').toLowerCase() === 'true',
      syncForce: (process.env.ATLAS_ORM_SYNC_FORCE || '').toLowerCase() === 'true',
      syncAlter: (process.env.ATLAS_ORM_SYNC_ALTER || '').toLowerCase() === 'true',
      uidDefaultVersion: process.env.ATLAS_ORM_UID_DEFAULT_VERSION,
      perPage: process.env.ATLAS_ORM_PER_PAGE,
    },
    Server: {
      port: process.env.ATLAS_SERVER_PORT,
      static: process.env.ATLAS_SERVER_STATIC || undefined,
    },
    Mail: process.env.ATLAS_MAIL ? JSON.parse(process.env.ATLAS_MAIL) : undefined,
    Permission: {
      Model: {
        User: process.env.ATLAS_PERMISSION_USER_MODEL,
        Group: process.env.ATLAS_PERMISSION_GROUP_MODEL,
        PermissionModel: process.env.ATLAS_PERMISSION_MODEL,
      },
      prop: {
        login: process.env.ATLAS_PERMISSION_LOGIN_PROP,
        password: process.env.ATLAS_PERMISSION_PASSWORD_PROP,
        activationCode: process.env.ATLAS_PERMISSION_ACTIVATION_CODE_PROP,
        recoverCode: process.env.ATLAS_PERMISSION_RECOVER_CODE_PROP,
        token: process.env.ATLAS_PERMISSION_TOKEN_PROP,
        validateToken: process.env.ATLAS_PERMISSION_VALIDATE_TOKEN_PROP,
        active: process.env.ATLAS_PERMISSION_ACTIVE_PROP,
      },
      mail: {
        activationFrom: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_FROM,
        activationSubject: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_SUBJECT,
        activationText: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_TEXT,
        activationHtml: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_HTML,
        recoverPasswordFrom: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_FROM,
        recoverPasswordSubject: process.env.ATLAS_PERMISSION_ACTIVATION_MAIL_SUBJECT,
        recoverPasswordText: process.env.ATLAS_PERMISSION_RECOVER_PASSWORD_MAIL_TEXT,
        recoverPasswordHtml: process.env.ATLAS_PERMISSION_RECOVER_PASSWORD_MAIL_HTML,
      },
      route: {
        login: process.env.ATLAS_PERMISSION_LOGIN_ROUTE,
        register: process.env.ATLAS_PERMISSION_REGISTER_ROUTE,
        refreshActiveCode: process.env.ATLAS_PERMISSION_REFRESH_ACTIVE_CODE_ROUTE,
        activeCode: process.env.ATLAS_PERMISSION_ACTIVE_CODE_ROUTE,
        sendPasswordRecoverCode: (
          process.env.ATLAS_PERMISSION_SEND_PASSWORD_RECOVER_CODE_ROUTE_ROUTE
        ),
        refreshPassword: process.env.ATLAS_PERMISSION_REFRESH_PASSWORD_ROUTE,
      },
    },
    hash: {
      algorithm: undefined,
      key: undefined,
    },
  }

  process.env.Atlas = objectMerge(config, process.env.Atlas)

  process.env = objectFilter(process.env, (i, k) => k.toLowerCase().indexOf('atlas_') === -1)

  process.env.Atlas.Orm.Db.log = typeof process.env.Atlas.Orm.Db.log === 'function'
    ? process.env.Atlas.Orm.Db.log
    : process.env.Atlas.Orm.Db.log
      ? console.log
      : () => {}

  process.env.Atlas.Orm.pkName = process.env.Atlas.Orm.pkName || 'id'
}