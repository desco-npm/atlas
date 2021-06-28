const { mergeAdvanced, } = require('object-merge-advanced')

global.fs = require('fs-extra')
global.path = require('path')
global.jsonwebtoken = require('jsonwebtoken')

global.clone = require('clone')
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
global.objectMerge = mergeAdvanced
global.fileExists = fs.existsSync
global.mkdir = fs.mkdirSync
global.isWindows = require('platform-is')
global.isMac = require('platform-is').isMac
global.isLinux = require('platform-is').isLinux
global.randomstring = require('@smakss/random-string')
global.frontToSequelize = global.atlas_envRequire('@desco/front-to-sequelize')
global.inflection = require('inflection')
global.objectPath = require('object-path')

global.arrayUnique = array => array.filter((item, key, self) => self.indexOf(item) === key)
global.mkdirIfNotExists = dir => { if (!fileExists(dir)) mkdir(dir) }