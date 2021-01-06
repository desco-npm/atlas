module.exports = () => {
  require('dotenv').config()

  const atlasEnv = {}

  process.env = objectFilter(process.env, (v, k) => {
    if (k.indexOf('ATLAS_') !== 0) return true

    atlasEnv[k.replace('ATLAS_', '')] = v

    return false
  })

  process.env = { Atlas: atlasEnv, ...process.env, }
}