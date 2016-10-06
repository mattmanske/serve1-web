//-----------  Imports  -----------//

import _         from 'lodash'

import React     from 'react'
import { Input } from 'formsy-react-components'

import Select    from '../inputs/formsy-select'

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
    const resource = this.props.resource

    return (
      <div className="child-form registration-form">
        <h1>Sign Up</h1>

        <fieldset>
          {/* User Email */}
          <Input required ref="email"
            autoFocus={true}
            type="email"
            label="Email"
            name="user.email"
            value={resource.email}
            validations="isEmail"
            validationError="Must enter a valid email address."
            />

          {/* First Name */}
          <Input required ref="first_name"
            type="text"
            label="First Name"
            name="user.first_name"
            value={resource.first_name}
            validations="isExisty"
            validationError="Must enter a first name."
            />

          {/* Last Name */}
          <Input required ref="last_name"
            type="text"
            label="Last Name"
            name="user.last_name"
            value={resource.last_name}
            validations="isExisty"
            validationError="Must enter a last name."
            />

          {/* Password */}
          <Input required ref="password"
            autoComplete="off"
            type="password"
            label="Password"
            name="user.password"
            value={resource.password}
            validations="minLength:6"
            validationError="Passowrds must be at least 6 character."
          />

          {/* Password Confirmation */}
          <Input required ref="password_confirmation"
            autoComplete="off"
            type="password"
            label="Confirm Password"
            name="user.password_confirmation"
            value={resource.password_confirmation}
            validations="equalsField:user.password"
            validationError="Passowrds don't match."
          />
        </fieldset>

        <fieldset>
          <legend>Organization Information</legend>

          {/* Organization Name */}
          <Input required ref="name"
            type="text"
            label="Organization Name"
            name="organization.name"
            value={resource.name}
            validations="isExisty"
            validationError="Must enter a name."
            onChange={this._updateSubdomain}
          />

          {/* Organization Subdomain */}
          <Input required disabled ref="subdomain"
            type="text"
            label="Organization Subdomain"
            name="organization.subdomain"
            value={this.state.subdomain}
            validations="isExisty"
            validationError="Must be a valid url string."
            addonBefore={'https://'}
            addonAfter={'.serve1.com'}
          />

          {/* Organization State */}
          <Select required disabled ref="state_id"
            label="Organization State"
            name="organization.state_id"
            value={resource.state_id}
            options={states}
          />

          {/* Organization County */}
          <Select required ref="county_id"
            label="Organization County"
            name="organization.county_id"
            value={resource.county_id}
            options={counties}
          />
        </fieldset>

        <button className="btn btn-default pull-right"
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
