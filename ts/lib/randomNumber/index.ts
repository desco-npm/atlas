/**
 Returns a random integer
 
 Resources @desco/atlas
 */
type TParams = { padStart: number, padEnd: number, }

export default (min = 0, max = 99999999999999999999999999999999999999, params: TParams): string => {
  const padStart = params.padStart || 0
  const padEnd = params.padEnd || 0

  min = Math.ceil(min)
  max = Math.floor(max)

  const num = (Math.floor(Math.random() * (max - min + 1)) + min).toString()

  if (padStart) {
    return num.padStart(padStart, '0')
  }
  else if (padEnd) {
    return num.padStart(padEnd, '0')
  }
  else {
    return num
  }
}