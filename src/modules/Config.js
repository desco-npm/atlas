class Config {
  constructor (config = {}, env = {}) {
    this.config = objectMerge(config, env[config.env || 'production'])

    this.config.Orm.Db.log = typeof this.config.Orm.Db.log === 'function'
      ? this.config.Orm.Db.log
      : this.config.Orm.Db.log
        ? console.log
        : () => {}

    this.config.Orm.pkName = this.config.Orm.pkName || 'id'
  }

  get (path) {
    return objectPath.get(this.config, path)
  }

  set (path, value) {
    return objectPath.set(this.config, path, value)
  }

  setDefault (path, value) {
    if (this.get(path) === undefined) {
      this.set(path, value)
    }
  }
}

module.exports = (config, env) => new Config(config, env)