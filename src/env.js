module.exports = () => {
  require('dotenv').config()

  const atlasEnv = {}

  process.env = objectFilter(process.env, (v, k) => {
    if (k.indexOf('ATLAS_') !== 0) return true

    if (v.toLowerCase() === 'true') v = true
    if (v.toLowerCase() === 'false') v = false

    atlasEnv[k.replace('ATLAS_', '')] = v

    return false
  })

  process.env = { Atlas: atlasEnv, ...process.env, }
}