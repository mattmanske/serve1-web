//-----------  Imports  -----------//

import flat             from 'flat'
import request          from 'superagent'
import requestCSRF      from 'superagent-rails-csrf'

import React            from 'react'
import Formsy           from 'formsy-react'

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
    canSubmit        : false,
    validationErrors : {}
  }

  //-----------  Helpers  -----------//

  _getFormClass(){
    switch (this.props.type){
      case 'registration':
        return RegistrationFrom
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

  _onSubmit = (model) => {
    this.setState({ validationErrors: {} })

    request.post(this.props.path).send(model).setCsrfToken().end( (error, response) => {
      const { body } = response
      return (error || !response.ok) ? this._onFailure(body, error) : this._onSuccess(body)
    })
  }

  //-----------  Response Events  -----------//

  _onSuccess = (response) => {
    if (response.redirect){ return window.location.href = response.redirect }
  }

  _onFailure = (response, error) => {
    const errors = flat.flatten(response, { safe : true })
    this.setState({ validationErrors: errors })
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
        validationErrors={this.state.validationErrors}
      >
        <FormClass {...this.props} />

        <button className="btn btn-lg btn-default pull-right"
          type="submit"
          disabled={!this.state.canSubmit}
        >
          Create Account
        </button>
      </Formsy.Form>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
