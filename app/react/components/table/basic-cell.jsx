//-----------  Imports  -----------//

import URI             from 'urijs'
import PubSub          from 'pubsub-js'
import request         from 'superagent'
import requestCSRF     from 'superagent-rails-csrf'

import React           from 'react'
import { Cell }        from 'fixed-data-table-2'

import { ajaxSuccess } from '../../helpers/helpers'

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
    let props = { className: 'btn btn-default' }

    if (path && path.includes('json'))
      props.onClick = this._modalPopup.bind(this, type, path)
    else
      props.href = path

    if ('download' == type)
      props.download = true

    return <a {...props}>{type}</a>
  }

  _redirectTo(resource, props){
    const uri = new URI(props.resource_type).segment(resource.id.toString()).suffix('pdf')
    return window.location.href = uri.valueOf()
  }

  //-----------  Event Handler  -----------//

  _modalPopup = (type, path) => {
    const callback = ('pdf' == type) ? this._redirectTo : this.props.editRow

    request.get(path).end( (err, res) => {
      if (!ajaxSuccess(err, res)){ return false }
      PubSub.publish('modal.load', { props: res.body, callback: callback })
    })
  }

  //-----------  HTML Element Render  -----------//

  render() {
    const { data, editRow, deleteRow, ...props } = this.props

    const cell_body = ('object' != typeof data) ? data : (
      <div className="btn-group btn-group-sm">
        {data.view && this._linkGenerator('view', data.view)}
        {data.edit && this._linkGenerator('edit', data.edit)}
        {data.pdf && this._linkGenerator('pdf', data.pdf)}
        {data.download && this._linkGenerator('download', data.download)}
      </div>
    )

    return (
      <Cell {...props}>{cell_body}</Cell>
    )
  }
}

//-----------  Export  -----------//

export default BasicCell
