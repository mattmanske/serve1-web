//-----------  Imports  -----------//

import PubSub      from 'pubsub-js'
import request     from 'superagent'
import requestCSRF from 'superagent-rails-csrf'

import React       from 'react'
import { Cell }    from 'fixed-data-table-2'

//-----------  Init  -----------//

requestCSRF(request)

//-----------  Class Setup  -----------//

class BasicCell extends React.Component {

  static propTypes = {
    data      : React.PropTypes.any.isRequired,
    editRow   : React.PropTypes.func,
    deleteRow : React.PropTypes.func
  }

  //-----------  Helpers  -----------//

  _isSuccess(err, res){
    return !(err || !res.ok)
  }

  //-----------  Event Handler  -----------//

  _editRecord = () => {
    const { data, editRow } = this.props

    request.get(data.edit).end( (err, res) => {
      if (this._isSuccess(err, res)){
        PubSub.publish('modal.load', { props: res.body, callback: editRow })
      }
    })
  }

  // _deleteRecord = () => {
  //   const { data, deleteRow } = this.props
  //
  //   request.del(data.delete).setCsrfToken().end( (err, res) => {
  //     if (this._isSuccess(err, res)){ deleteRow(data) }
  //   })
  // }

  //-----------  HTML Element Render  -----------//

  render() {
    const { data, editRow, deleteRow, ...props } = this.props

    const cell_body = ('object' != typeof data) ? data : (
      <div className="btn-group btn-group-sm">
        {data.view && <a href={data.view} className="btn btn-default">view</a>}
        {data.edit && <a onClick={this._editRecord} className="btn btn-default">edit</a>}
        {/*{data.delete && <a onClick={this._deleteRecord} className="btn btn-default">delete</a>}*/}
      </div>
    )

    return (
      <Cell {...props}>{cell_body}</Cell>
    )
  }
}

//-----------  Export  -----------//

export default BasicCell
