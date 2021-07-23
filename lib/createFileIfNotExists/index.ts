/**
  Create a file if it doesn't exist

  Resources @desco/atlas
*/

import fs from '../fs'

export default (file: string): any => {
  if(!fs.existsSync(file)) {
    const stream = fs.createWriteStream(file)

    return Promise.resolve(stream)
  }
}