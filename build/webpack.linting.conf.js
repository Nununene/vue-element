var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

//console.log(process.env.npm_lifecycle_event)
var lintingPathPrefix = ''
var personalTag = process.env.npm_lifecycle_event
var personalIncludeFolders = []
var personalExcludeFolders = []
switch(personalTag){
  case 'dev-ted':
    console.log('Developer T')
    personalIncludeFolders.push('/src/api')
    personalIncludeFolders.push('/src/store')
    personalIncludeFolders.push('/src/main.js')
    personalIncludeFolders.push('/src/router.js')
    personalIncludeFolders.push('/src/components/Samples')
    personalExcludeFolders.push('/src/store/modules')
    break
  default:
    console.log('Default developer')
    personalIncludeFolders.push('')
    break
}

var finalIncludeFolder = []
personalIncludeFolders.forEach(function(item){finalIncludeFolder.push(projectRoot + item)})
personalExcludeFolders = Array.from(personalExcludeFolders, item => (projectRoot + item))

// SystaxError: Unexpected toekn ... on Windows 10
// var finalExcludeFolder = ['/node_modules/', ...personalExcludeFolders]

var finalExcludeFolder = personalExcludeFolders
finalExcludeFolder.unshift('/node_modules/')
console.log('linting on ... ')
console.log(finalIncludeFolder)
console.log('exclude linting on ...')
console.log(finalExcludeFolder)

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: finalIncludeFolder,
        exclude: finalExcludeFolder
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        //loader: 'eslint?{rules:{"comma-dangle": ["error", "always-multiline"]}}',
        include: finalIncludeFolder,
        exclude: finalExcludeFolder
      }
    ]
  }
}
