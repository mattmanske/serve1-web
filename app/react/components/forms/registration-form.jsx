//-----------  Imports  -----------//

import _         from 'lodash'

import React     from 'react'
import { Input } from 'formsy-react-components'

import Select    from '../formsy-select'

//-----------  Class Setup  -----------//

class RegistrationFrom extends React.Component {

  displayName: 'RegistrationFrom'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    can_submit : React.PropTypes.bool.isRequired
  }

  state = {
    subdomain: ''
  }

  //-----------  Event Handlers  -----------//

  _updateSubdomain = (name, value) => {
    this.setState({ subdomain: _.kebabCase(value) })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties } = this.props.selections

    return (
      <div className="child-form registration-form">
        <h1>Sign Up</h1>

        <fieldset>
          <legend>Account Information</legend>

          {/* User Email */}
          <Input required
            autoFocus={true}
            type="email"
            label="Email"
            name="user.email"
            validations="isEmail"
            validationError="Must enter a valid email address."
          />

          {/* User Name */}
          <Input required
            type="text"
            label="Full Name"
            name="user.name"
            validations="isExisty"
            validationError="Must enter a name."
          />

          {/* Password */}
          <Input required
            autoComplete="off"
            type="password"
            label="Password"
            name="user.password"
            validations="minLength:6"
            validationError="Passowrds must be at least 6 character."
          />

          {/* Password Confirmation */}
          <Input required
            autoComplete="off"
            type="password"
            label="Confirm Password"
            name="user.password_confirmation"
            validations="equalsField:user.password"
            validationError="Passowrds don't match."
          />
        </fieldset>

        <fieldset>
          <legend>Organization Information</legend>

          {/* Organization Name */}
          <Input required
            type="text"
            label="Organization Name"
            name="organization.name"
            validations="isExisty"
            validationError="Must enter a name."
            onChange={this._updateSubdomain}
          />

          {/* Organization Subdomain */}
          <Input required disabled
            type="text"
            label="Organization Subdomain"
            name="organization.subdomain"
            validations="isExisty"
            validationError="Must be a valid url string."
            value={this.state.subdomain}
            addonBefore={'https://'}
            addonAfter={'.serve1.com'}
          />

          {/* Organization State */}
          <Select required disabled
            label="Organization State"
            name="organization.state_id"
            value={60}
            options={states}
          />

          {/* Organization County */}
          <Select required
            label="Organization County"
            name="organization.county_id"
            value={counties[0].value.toString()}
            options={counties}
          />
        </fieldset>

        <button className="btn btn-lg btn-default pull-right"
          type="submit"
          disabled={!this.props.can_submit}
        >
          Create Account
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default RegistrationFrom
