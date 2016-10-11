//-----------  Imports  -----------//

import _                   from 'lodash'

import React               from 'react'
import { Input, Textarea } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'

//-----------  Class Setup  -----------//

class RegistrationFrom extends React.Component {

  displayName: 'RegistrationFrom'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired
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

    console.log(this.props);

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
            label="Company Name"
            name="organization.name"
            value={resource.name}
            validations="isExisty"
            validationError="Must enter a name."
            onChange={this._updateSubdomain}
          />

          {/* Organization Subdomain */}
          <Input required disabled ref="subdomain"
            type="text"
            label="Subdomain"
            name="organization.subdomain"
            value={this.state.subdomain}
            validations="isExisty"
            validationError="Must be a valid url string."
            addonBefore={'https://'}
            addonAfter={'.serve1.com'}
          />

          {/* Address */}
          <Textarea required ref="address"
            rows={3}
            label="Mailing Address"
            name="organization.address"
            value={resource.address}
            validations="isExisty"
            validationError="Must enter an address."
            placeholder={"123 Main St.\nSuite 4567\nCity, ST, 12345"}
            />

          {/* Phone */}
          <Input ref="phone"
            type="text"
            label="Phone"
            name="organization.phone"
            value={resource.phone}
            validations="isExisty"
            validationError="Must enter a phone number."
            placeholder={"(555) 555-5555"}
            />

          {/* Organization State */}
          <Select required disabled ref="state_id"
            label="State"
            name="organization.state_id"
            value={resource.state_id}
            options={states}
          />

          {/* Organization County */}
          <Select required ref="county_id"
            label="County"
            name="organization.county_id"
            value={resource.county_id}
            options={counties}
          />
        </fieldset>

        <button className="btn btn-default pull-right"
          type="submit"
          disabled={!this.props.canSubmit}
        >
          Create Account
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default RegistrationFrom
