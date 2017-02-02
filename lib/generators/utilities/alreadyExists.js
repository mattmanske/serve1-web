//-----------  Includes  -----------//

const fs   = require('fs')
const path = require('path')

//-----------  Helpers  -----------//

const pageComponents = fs.readdirSync(path.join(__dirname, '../../../app/react/components'))
const pageContainers = fs.readdirSync(path.join(__dirname, '../../../app/react/containers'))

//-----------  Exports  -----------//

module.exports = (comp) => {
  return pageComponents.concat(pageContainers).indexOf(comp) >= 0
}
