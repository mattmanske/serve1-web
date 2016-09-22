//-----------  Imports  -----------//

import flat             from 'flat'
import request          from 'superagent'
import requestCSRF      from 'superagent-rails-csrf'

import React            from 'react'
import Formsy           from 'formsy-react'

import LoginForm        from '../components/forms/login-form'
import RegistrationFrom from '../components/forms/registration-form'

//-----------  Init  -----------//

requestCSRF(request)

//-----------  Class Setup  -----------//

class FormWrapper extends React.Component {

  static propTypes = {
    type       : React.PropTypes.string.isRequired,
    path       : React.PropTypes.string.isRequired,
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object,
    errors     : React.PropTypes.object
  }

  state = {
    canSubmit    : false,
    globalErrors : ''
  }

  //-----------  Helpers  -----------//

  _getFormClass(){
    switch (this.props.type){
      case 'registration':
        return RegistrationFrom
      case 'login':
        return LoginForm
    }
  }

  //-----------  Validation Events  -----------//

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  }

  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  }

  //-----------  Submit Events  -----------//

  _mapInputs = (inputs) => {
    return flat.unflatten(inputs)
  }

  _onSubmit = (model, reset, invalidate) => {
    this.setState({ globalErrors: '' })

    request.post(this.props.path).send(model).setCsrfToken().end( (error, response) => {
      const { body } = response
      return (error || !response.ok) ? this._onFailure(body, error, invalidate) : this._onSuccess(body)
    })
  }

  //-----------  Response Events  -----------//

  _onSuccess = (response) => {
    if (response.redirect){ return window.location.href = response.redirect }
  }

  _onFailure = (response, error, invalidate) => {
    const errors = flat.flatten(response, { safe : true })
    const globalErrors = errors.global || 'Something went wrong. Try again.'
    delete errors.global

    invalidate(errors)
    this.setState({ globalErrors: globalErrors })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const FormClass = this._getFormClass()

    return (
      <Formsy.Form className="react-form"
        mapping={this._mapInputs}
        onValid={this._enableSubmit}
        onInvalid={this._disableSubmit}
        onValidSubmit={this._onSubmit}
      >
        <FormClass {...this.props} canSubmit={this.state.canSubmit} />
        <h4 className="label label-danger">{this.state.globalErrors}</h4>
      </Formsy.Form>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
