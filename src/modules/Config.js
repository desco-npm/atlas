class Config {
  constructor (config = {}, env = {}) {
    this.config = objectMerge(config, env[config.env || 'production'])
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