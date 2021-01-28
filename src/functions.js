global.clone = require('clone')
global.fileExists = require('fs-extra').existsSync
global.readFileSync = require('fs-extra').readFileSync
global.pathJoin = require('path').join
global.objectFilter = require('object-filter')
global.objectMap = require('object.map')
global.readdir = require('fs-extra').readdir
global.isArray = require('is-array')
global.stackTrace = require('stack-trace')
global.htmlPdf = require('html-pdf')
global.pdfMake = require('pdfmake')
global.generateToken = require('jsonwebtoken').sign
global.verifyToken = require('jsonwebtoken').verify
global.decodeToken = require('jsonwebtoken').decode
global.moment = require('moment')

global.arrayUnique = array => array.filter((item, key, self) => self.indexOf(item) === key)

global._envRequire = require('@desco/env-require')(
  pathJoin(atlasDir, '../'),
  {
    'development': {
      '@desco/cli-header': '../cli-header',
      '@desco/sequelize-permission-resources': '../sequelize-permission-resources',
    },
  })