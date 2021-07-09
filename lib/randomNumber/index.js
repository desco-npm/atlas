module.exports = (min = 0, max = 999999999999999999999999999999999999999999999999999999999999) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}