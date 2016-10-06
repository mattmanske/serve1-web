//-----------  Imports  -----------//

import URI         from 'urijs'
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

  _linkGenerator(type, path){
    if (path && path.includes('json'))
      return <a onClick={this._modalPopup.bind(this, type, path)} className="btn btn-default">{type}</a>
    else
      return <a href={path} className="btn btn-default">{type}</a>
  }

  _redirectTo(resource, props){
    const uri = new URI(props.resource_type).segment(resource.id.toString()).suffix('pdf')
    return window.location.href = uri.valueOf()
  }

  //-----------  Event Handler  -----------//

  _modalPopup = (type, path) => {
    const callback = ('pdf' == type) ? this._redirectTo : this.props.editRow

    request.get(path).end( (err, res) => {
      if (this._isSuccess(err, res)){
        PubSub.publish('modal.load', { props: res.body, callback: callback })
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
        {data.view && this._linkGenerator('view', data.view)}
        {data.edit && this._linkGenerator('edit', data.edit)}
        {data.pdf  && this._linkGenerator('pdf', data.pdf)}
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
