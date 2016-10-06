//-----------  Imports  -----------//

import _ from 'lodash'

//-----------  Get Input Values  -----------//

const getVal = (ref, refs) => {
  return refs[ref] && refs[ref].getValue()
}

//-----------  URL String Templates  -----------//

const getUrl = (string, values) => {
  return _.template(string)(values)
}

//-----------  URL String Templates  -----------//

const ajaxSuccess = (err, res) => {
  return !(err || !res.ok)
}

//-----------  Exports  -----------//

export { getVal, getUrl, ajaxSuccess }
