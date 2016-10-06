//-----------  Imports  -----------//

import _           from 'lodash'
import PubSub      from 'pubsub-js'

import React       from 'react'

import FormWrapper from './form-wrapper'

//-----------  Class Setup  -----------//

class ModalWrapper extends React.Component {

  state = {
    formProps : {},
    onClose   : null
  }

  componentDidMount(){
    this.token = PubSub.subscribe('modal.load', this._insertForm)
    $(this.refs.formModal).on('hidden.bs.modal', this._clearState)
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
    $(this.refs.formModal).unbind('hidden.bs.modal', this._clearState)
  }

  //-----------  Event Handling  -----------//

  _insertForm = (msg, data) => {
    const { props, callback } = data

    this.setState({ formProps: props, onClose: callback }, () => {
      $(this.refs.formModal).modal('show')
    })
  }

  _submitCallback = (body) => {
    const { resource, selections } = body

    if (_.isFunction(this.state.onClose))
      this.state.onClose.call(this, resource.id, selections)

    this._closeModal()
  }

  _closeModal = () => {
    $(this.refs.formModal).modal('hide')
  }

  _clearState = () => {
    this.setState({ formProps: {}, onClose: null })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const show_modal = !_.isEmpty(this.state.formProps)

    return (
      <div className="modal fade" ref="formModal" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={this._closeModal}>&times;</span>
            </div>

            <div className="modal-body">
              {show_modal && <FormWrapper {...this.state.formProps} callback={this._submitCallback}></FormWrapper>}
            </div>

            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default ModalWrapper
