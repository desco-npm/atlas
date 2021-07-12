/**
  Create a directory if it doesn't exist

  Resources @desco/atlas
*/

import fs from '../fs'

export default dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir) }