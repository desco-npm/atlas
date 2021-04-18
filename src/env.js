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
        log: [
          typeof process.env.ATLAS_ORM_DB_LOG, process.env.ATLAS_ORM_DB_LOG,
        ].indexOf('undefined') !== -1
          ? undefined
          : ['console.log', 'true',].indexOf(process.env.ATLAS_ORM_DB_LOG.toLowerCase())
            ? console.log
            : false,
      },
      pool: {
        max: process.env.ATLAS_ORM_POOL_MAX,
        min: process.env.ATLAS_ORM_POOL_MIN,
        idle: process.env.ATLAS_ORM_POOL_IDLE,
        acquire: process.env.ATLAS_ORM_POOL_ACQUIRE,
      },
      pkName: process.env.ATLAS_ORM_PK_NAME || 'id',
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
    Auth: {
      permission: (process.env.ATLAS_AUTH_PERMISSION || '').toLowerCase() === 'true',
      secret: process.env.ATLAS_AUTH_SECRET,
      algorithm: process.env.ATLAS_AUTH_ALGORITHM,
      model: process.env.ATLAS_AUTH_MODEL,
      userModel: process.env.ATLAS_AUTH_USER_MODEL,
      groupModel: process.env.ATLAS_AUTH_GROUP_MODEL,
      pswProp: process.env.ATLAS_AUTH_PSW_PROP,
      loginProp: process.env.ATLAS_AUTH_LOGIN_PROP,
      mailProp: process.env.ATLAS_AUTH_MAIL_PROP,
      tokenProp: process.env.ATLAS_AUTH_TOKEN_PROP,
      tokenTypeProp: process.env.ATLAS_AUTH_TOKEN_TYPE_PROP,
      userPkPprop: process.env.ATLAS_AUTH_USER_PK_PROP,
      expireTokenProp: process.env.ATLAS_AUTH_EXPIRE_TOKEN_PROP,
      Google: {
        auth: (process.env.ATLAS_GOOGLE_AUTH || '').toLowerCase() === 'true',
        auth_id: process.env.ATLAS_GOOGLE_AUTH_ID,
        auth_key: process.env.ATLAS_GOOGLE_AUTH_KEY,
        auth_scope: process.env.ATLAS_GOOGLE_AUTH_SCOPE,
        auth_google_auth_prompt: process.env.ATLAS_GOOGLE_AUTH_GOOGLE_AUTH_PROMPT,
      },
    },
  }

  process.env.Atlas = objectMerge(process.env.Atlas, config)
  process.env = objectFilter(process.env, (i, k) => k.toLowerCase().indexOf('atlas_') === -1)
  process.env.Atlas.Mail = process.env.Atlas.Mail || []
}