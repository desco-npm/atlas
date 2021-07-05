const { mergeAdvanced, } = require('object-merge-advanced')

global.jsonwebtoken = require('jsonwebtoken')

global.clone = require('clone')
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
global.isWindows = require('platform-is')
global.isMac = require('platform-is').isMac
global.isLinux = require('platform-is').isLinux
global.randomstring = require('@smakss/random-string')
global.frontToSequelize = global.atlas_envRequire('@desco/front-to-sequelize')
global.inflection = require('inflection')
global.objectPath = require('object-path')