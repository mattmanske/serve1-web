//-----------  Imports  -----------//

import React             from 'react'
import { Input, Select } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class ContactForm extends React.Component {

  displayName: 'ContactForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    can_submit : React.PropTypes.bool.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { clients } = this.props.selections
    const resource = this.props.resource

    const has_client_id = !!(resource.client_id)

    return (
      <div className="child-form contact-form">
        <h1>Create Client Contact</h1>

        <fieldset>
          <legend>Contact Details</legend>

          {/* Client */}
          <Select required disabled={has_client_id} ref="client_id"
            autoFocus={true}
            label="Client"
            name="client_contact.client_id"
            value={resource.client_id}
            options={clients}
            />

          {/* First Name */}
          <Input required ref="first_name"
            type="text"
            label="First Name"
            name="client_contact.first_name"
            value={resource.first_name}
            validations="isExisty"
            validationError="Must have a first name."
            />

          {/* Last Name */}
          <Input required ref="last_name"
            type="text"
            label="Last Name"
            name="client_contact.last_name"
            value={resource.last_name}
            validations="isExisty"
            validationError="Must have a last name."
            />

          {/* Email */}
          <Input required ref="email"
            type="email"
            label="Email"
            name="client_contact.email"
            value={resource.email}
            validations="isEmail"
            validationError="Must enter a valid email address."
            />

          {/* Address */}
          <Input ref="address"
            type="text"
            label="Address"
            name="client_contact.address"
            value={resource.address}
            />

          {/* Phone */}
          <Input ref="phone"
            type="text"
            label="Phone"
            name="client_contact.phone"
            value={resource.phone}
            />
        </fieldset>

        <button type="submit" className="btn btn-default pull-right">
          Save
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default ContactForm
