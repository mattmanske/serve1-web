//-----------  Imports  -----------//

import _                 from 'lodash'

import React             from 'react'
import { Input, Select } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class RegistrationFrom extends React.Component {

  displayName: 'RegistrationFrom'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
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
    const states = this.props.selections.states
    const counties = this.props.selections.counties

    return (
      <div className="child-form registration-form">
        <h1>Sign Up</h1>

        <fieldset>
          <legend>Account Information</legend>

          {/* User Email */}
          <Input required
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
            label="Name"
            name="organization.name"
            validations="isExisty"
            validationError="Must enter a name."
            onChange={this._updateSubdomain}
          />

          {/* Organization Subdomain */}
          <Input required disabled
            type="text"
            label="Subdomain"
            name="organization.subdomain"
            validations="isExisty"
            validationError="Must be a valid url string."
            value={this.state.subdomain}
            addonBefore={'https://'}
            addonAfter={'.serve1.com'}
          />

          {/* Organization State */}
          <Select required
            label="State"
            name="organization.state_id"
            value={states[0].value.toString()}
            options={states}
          />

          {/* Organization County */}
          <Select required
            label="County"
            name="organization.county_id"
            value={counties[0].value.toString()}
            options={counties}
          />
        </fieldset>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default RegistrationFrom
