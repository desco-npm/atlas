module.exports = (fields, name) => {
  return fields.filter(i => i.name === name)[0]
}