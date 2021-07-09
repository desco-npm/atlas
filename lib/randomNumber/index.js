module.exports = (min = 0, max = 9999999999999999999999999999999999999999999999999999, params) => {
  const padStart = params.padStart || 0
  const padEnd = params.padEnd || 0

  min = Math.ceil(min)
  max = Math.floor(max)

  return (Math.floor(Math.random() * (max - min + 1)) + min).padStart(padStart).padEnd(padEnd)
}