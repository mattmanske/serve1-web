//-----------  Imports  -----------//

import _                from 'lodash'
import URI              from 'urijs'
import flat             from 'flat'
import PubSub           from 'pubsub-js'
import request          from 'superagent'
import requestCSRF      from 'superagent-rails-csrf'
import update           from 'react-addons-update'

import React            from 'react'
import Formsy           from 'formsy-react'

import CaseForm         from '../components/forms/case-form'
import LoginForm        from '../components/forms/login-form'
import ClientForm       from '../components/forms/client-form'
import ContactForm      from '../components/forms/contact-form'
import RegistrationFrom from '../components/forms/registration-form'

//-----------  Init  -----------//

requestCSRF(request)

//-----------  Class Setup  -----------//

class FormWrapper extends React.Component {

  state = {
    resource       : this._cleanNulls(this.props.resource), // Object being edited
    resource_type  : this.props.resource_type,              // Subform model type
    action         : this.props.action,                     // Form submit action
    modal_urls     : this.props.modal_urls || {},           // Modal subform fetch URL
    selection_urls : this.props.selection_urls || {},       // Selection fetch URLs
    selections     : this.props.selections || {},           // Default selection arrays
    callback       : this.props.callback || null,           // Submit callback URL (overrides redirect)
    can_submit     : false,                                 // Submit validation state
    global_errors  : ''                                     // Non-specific, gloabl error state
  }

  static propTypes = {
    resource       : React.PropTypes.object.isRequired,
    resource_type  : React.PropTypes.string.isRequired,
    action         : React.PropTypes.string.isRequired,
    modal_urls     : React.PropTypes.object,
    selection_urls : React.PropTypes.object,
    selections     : React.PropTypes.object,
    callback       : React.PropTypes.func
  }

  //-----------  Helpers  -----------//

  _getFormClass(){
    switch (this.state.resource_type){
      case 'registration' : return RegistrationFrom
      case 'login'        : return LoginForm
      case 'cases'        : return CaseForm
      case 'clients'      : return ClientForm
      case 'contacts'     : return ContactForm
    }
  }

  _cleanNulls(resource){
    return _.mapValues(resource, (val) => { return (null === val) ? undefined : val })
  }

  _isSuccess(err, res){
    return !(err || !res.ok)
  }

  _parseQuery(url, query){
    const uri = URI(url)

    if (query){
      if (query.id){
        uri.segment(-1, query.id.toString())
        delete query.id
      }
      uri.addSearch(query)
    }

    return uri.suffix('json').valueOf()
  }

  //-----------  Formsy Validation Handlers  -----------//

  _enableSubmit = () => {
    this.setState({ can_submit: true })
  }

  _disableSubmit = () => {
    this.setState({ can_submit: false })
  }

  //-----------  Formsy Submission Handlers  -----------//

  _mapInputs = (inputs) => {
    return flat.unflatten(inputs)
  }

  _onSubmit = (model, reset, invalidate) => {
    this.setState({ global_errors: '' })

    const type = !!(this.state.resource.id) ? 'PATCH' : 'POST'
    request(type, this.state.action).send(model).setCsrfToken().end( (err, res) => {
      this._isSuccess(err, res) ? this._onSubmitSuccess(res.body) : this._onSubmitFailure(res.body, err, invalidate)
    })
  }

  _onSubmitSuccess = (body) => {
    if (this.state.callback) { return this.state.callback(body.resource) } // If callback present, send new resource
    if (body.redirect){ return window.location.href = body.redirect }      // If redirect present, push new browser location
    this.setState({ resource: body.resource })                             // Else, refresh resource object
  }

  _onSubmitFailure = (body, error, invalidate) => {
    const errors        = flat.flatten(body, { safe : true })
    const global_errors = errors.global || 'Something went wrong. Try again.'

    delete errors.global

    this.setState({ global_errors: global_errors })
    invalidate(errors)
  }

  //-----------  Subform Modal Handlers  -----------//

  _loadModal = (model, attribute, query) => {
    const modal_url = this._parseQuery(this.state.modal_urls[model], query)
    const callback  = this._refreshSelection.bind(this, model, attribute, query)

    if ('' === modal_url){ return false }

    request.get(modal_url).end( (err, res) => {
      if (this._isSuccess(err, res)){
        PubSub.publish('modal.load', { props: res.body, callback: callback })
      }
    })
  }

  //-----------  Selection Refresh Handlers  -----------//

  _refreshSelection = (model, attribute, query, resource) => {
    const selection_url = this._parseQuery(this.state.selection_urls[model], query)
    let newState = this.state

    if ('' === selection_url){ return false }

    request.get(selection_url).end( (err, res) => {
      if (this._isSuccess(err, res)){
        if (resource && attribute)
          newState = update(newState, { resource: { [attribute]: { $set: resource.id }} })
        if (model && res.body)
          newState = update(newState, { selections: { [model]: { $set: res.body }} })
        this.setState(newState)
      }
    })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const FormClass = this._getFormClass()

    return (
      <Formsy.Form ref="formsy" className="react-form form-horizontal"
        mapping={this._mapInputs}
        onValid={this._enableSubmit}
        onInvalid={this._disableSubmit}
        onValidSubmit={this._onSubmit}
        >

        <FormClass {...this.state}
          load_modal={this._loadModal}
          refresh_selection={this._refreshSelection}
          />

        <h4 className="label label-danger">{this.state.global_errors}</h4>

    </Formsy.Form>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
