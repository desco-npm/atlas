/**
  Allows you to bypass the JS error display.

  Resources @desco/atlas
*/
const funError = console.error

export default (ignore?: boolean): void => {
  console.error = ignore ? () => {} : funError
}