//-----------  Imports  -----------//

import _                from 'lodash'
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
    submit_path    : this.props.submit_path,                // Form submit path (AJAX)
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
    submit_path    : React.PropTypes.string.isRequired,
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

  _successfulResponse(err, res){
    return !(err || !res.ok)
  }

  _cleanNulls(resource){
    return _.mapValues(resource, (val) => { return (null === val) ? undefined : val })
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

  _onSubmitSuccess = (body) => {
    // If callback present, send new resource
    if (this.state.callback) { return this.state.callback(body.resource) }

    // If redirect present, push new browser location
    if (body.redirect){ return window.location.href = body.redirect }

    // Else, refresh resource object
    this.setState({ resource: body.resource })
  }

  _onSubmitFailure = (body, error, invalidate) => {
    const errors        = flat.flatten(body, { safe : true })
    const global_errors = errors.global || 'Something went wrong. Try again.'

    delete errors.global

    invalidate(errors)
    this.setState({ global_errors: global_errors })
  }

  _onSubmit = (model, reset, invalidate) => {
    this.setState({ global_errors: '' })

    request.post(this.state.submit_path).send(model).setCsrfToken().end( (err, res) => {
      if (this._successfulResponse(err, res)){
        this._onSubmitSuccess(res.body)
      } else {
        this._onSubmitFailure(res.body, err, invalidate)
      }
    })
  }

  //-----------  Subform Modal Handlers  -----------//

  _loadModal = (model, attribute, query) => {
    const modal_url = _.get(this.state.modal_urls, model, null)
    const callback  = this._refreshSelection.bind(this, model, attribute, query)

    if (null === modal_url){ return false }

    request.get(modal_url).end( (err, res) => {
      if (this._successfulResponse(err, res)){
        PubSub.publish('modal.load', { props: res.body, callback: callback })
      }
    })
  }

  //-----------  Selection Refresh Handlers  -----------//

  _refreshSelection = (model, attribute, query, resource) => {
    const selection_url = _.get(this.state.selection_urls, model, null)

    if (null === selection_url){ return false }

    request.get(selection_url).end( (err, res) => {
      if (this._successfulResponse(err, res)){
        const newState = update(this.state, {
          selections  : { [model] : { $set: res.body }},
          resource : { [attribute] : { $set: resource.id }},
        })
        this.setState(newState)
      }
    })
  }

  //-----------  Update Helpers  -----------//

  _updateResource = (attribute, value) => {
    this.setState( update( this.state, {
      resource: { [attribute]: { $set: value }},
    }))
  }

  _updateSelection = (model, value) => {
    this.setState( update( this.state, {
      selections: { [model]: { $set: value }},
    }))
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const FormClass = this._getFormClass()

    return (
      <Formsy.Form className="react-form form-horizontal"
        mapping={this._mapInputs}
        onValid={this._enableSubmit}
        onInvalid={this._disableSubmit}
        onValidSubmit={this._onSubmit}
        >

        <FormClass {...this.state}
          update_resource={this._updateResource}
          update_selection={this._updateSelection}
          />

        <h4 className="label label-danger">{this.state.global_errors}</h4>

    </Formsy.Form>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
