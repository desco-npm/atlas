module.exports = (min = 0, max = 9999999999999999999999999999999999999999999999999999, params) => {
  const padStart = params.padStart || 0
  const padEnd = params.padEnd || 0

  min = Math.ceil(min)
  max = Math.floor(max)

  const num = (Math.floor(Math.random() * (max - min + 1)) + min)

  if (padStart) {
    return num.toString().padStart(padStart, '0')
  }
  else if (padEnd) {
    return num.toString().padStart(padEnd, '0')
  }
  else {
    return num
  }
}