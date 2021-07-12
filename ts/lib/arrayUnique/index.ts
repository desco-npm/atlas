/**
  Returns an array with no repeated elements

  Resources @desco/atlas
*/
export default array => array.filter((item, key, self) => self.indexOf(item) === key)