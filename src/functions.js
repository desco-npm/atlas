global.fs = require('fs-extra')
global.path = require('path')
global.jsonwebtoken = require('jsonwebtoken')

global._envRequire = require('@desco/env-require')(
  path.join(atlasDir, '../'),
  {
    'development': {
      '@desco/cli-header': '../cli-header',
      '@desco/sequelize-permission-resources': '../sequelize-permission-resources',
      '@desco/front-to-sequelize': '../front-to-sequelize',
    },
  }
)
//
global.clone = require('clone')
global.fileExists = fs.existsSync
global.readFileSync = fs.readFileSync
global.readdir = fs.readdir
global.pathJoin = path.join
global.generateToken = jsonwebtoken.sign
global.verifyToken = jsonwebtoken.verify
global.decodeToken = jsonwebtoken.decode
global.objectFilter = require('object-filter')
global.objectMap = require('object.map')
global.isArray = require('is-array')
global.stackTrace = require('stack-trace')
global.htmlPdf = require('html-pdf')
global.pdfMake = require('pdfmake')
global.moment = require('moment')
global.deepMerge = require('deepmerge')
global.frontToSequelize = _envRequire('@desco/front-to-sequelize')

global.arrayUnique = array => array.filter((item, key, self) => self.indexOf(item) === key)