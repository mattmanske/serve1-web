//-----------  Includes  -----------//

const fs                 = require('fs')
const path               = require('path')

const componentGenerator = require('./component')
const containerGenerator = require('./container')

//-----------  Exports  -----------//

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
}
