//-----------  Imports  -----------//

import _                from 'lodash'
import flat             from 'flat'
import PubSub           from 'pubsub-js'
import request          from 'superagent'
import requestCSRF      from 'superagent-rails-csrf'
import update           from 'react-addons-update'

import React            from 'react'
import Formsy           from 'formsy-react'

import JobForm          from '../components/forms/job-form'
import CaseForm         from '../components/forms/case-form'
import LoginForm        from '../components/forms/login-form'
import PartyForm        from '../components/forms/party-form'
import ClientForm       from '../components/forms/client-form'
import ContactForm      from '../components/forms/contact-form'
import ServiceForm      from '../components/forms/service-form'
import AffidavitForm    from '../components/forms/affidavit-form'
import RegistrationFrom from '../components/forms/registration-form'
import OrganizationForm from '../components/forms/organization-form'

import { ajaxSuccess }  from '../helpers/helpers'

//-----------  Init  -----------//

requestCSRF(request)

//-----------  Class Setup  -----------//

class FormWrapper extends React.Component {

  state = {
    type         : this.props.type,                       // Subform model type
    action       : this.props.action,                     // Form submit action
    resource     : this._cleanNulls(this.props.resource), // Object being edited
    selections   : this.props.selections || {},           // Default selection arrays
    callback     : this.props.callback || null,           // Submit callback URL (overrides redirect)
    canSubmit    : false,
    globalErrors : null
  }

  static propTypes = {
    type       : React.PropTypes.string.isRequired,
    action     : React.PropTypes.string.isRequired,
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object,
    callback   : React.PropTypes.func
  }

  //-----------  Helpers  -----------//

  _getFormClass(){
    switch (this.state.type){
      case 'jobs'         : return JobForm
      case 'cases'        : return CaseForm
      case 'login'        : return LoginForm
      case 'parties'      : return PartyForm
      case 'clients'      : return ClientForm
      case 'contacts'     : return ContactForm
      case 'services'     : return ServiceForm
      case 'affidavits'   : return AffidavitForm
      case 'registration' : return RegistrationFrom
      case 'organization' : return OrganizationForm
    }
  }

  _cleanNulls(resource){
    return _.mapValues(resource, (val) => { return (null === val) ? undefined : val })
  }

  //-----------  Formsy Validation Handlers  -----------//

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  }

  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  }

  //-----------  Formsy Submission Handlers  -----------//

  _mapInputs = (inputs) => {
    return flat.unflatten(inputs)
  }

  _onSubmit = (model, reset, invalidate) => {
    this.setState({ globalErrors: null })

    const type = !!(this.state.resource.id) ? 'PATCH' : 'POST'
    request(type, this.state.action).send(model).setCsrfToken().end( (err, res) => {
      ajaxSuccess(err, res) ? this._onSubmitSuccess(res.body) : this._onSubmitFailure(res.body, err, invalidate)
    })
  }

  _onSubmitSuccess = (body) => {
    // If callback present, send new resource
    if (_.isFunction(this.state.callback))
      return this.state.callback(body)

    // If redirect present, push new browser location
    if (body.redirect)
      return window.location.href = body.redirect

    // Else, refresh resource object
    this.setState({ resource: body.resource })
  }

  _onSubmitFailure = (body, error, invalidate) => {
    const errors  = flat.flatten(body, { safe : true })
    const globals = errors.global || 'Something went wrong. Try again.'

    delete errors.global

    this.setState({ globalErrors: globals })
    invalidate(errors)
  }

  //-----------  Subform Modal Handlers  -----------//

  _loadModal = (url, attribute) => {
    request.get(url).end( (err, res) => {
      if (!ajaxSuccess(err, res)){ return false }
      const callback = this._updateResource.bind(this, attribute)
      PubSub.publish('modal.load', { props: res.body, callback: callback })
    })
  }

  _updateResource = (attribute, resource_id, selections) => {
    this.setState( update(this.state, {
      resource   : { [attribute]: { $set: resource_id }},
      selections : { $merge: selections }
    }))
  }

  //-----------  Selection Refresh Handlers  -----------//

  _refreshSelection = (url, selection, callback) => {
    request.get(url).end( (err, res) => {
      callback()
      if (!ajaxSuccess(err, res)){ return false }
      this._updateSelection(selection, res.body)
    })
  }

  _updateSelection = (selection, selections) => {
    this.setState( update(this.state, {
      selections: { [selection]: { $set: selections }}
    }))
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
          loadModal={this._loadModal}
          refreshSelection={this._refreshSelection}
          />

        <h4 className="label label-danger">{this.state.globalErrors}</h4>
    </Formsy.Form>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
