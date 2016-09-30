//-----------  Imports  -----------//

import React     from 'react'
import { Input } from 'formsy-react-components'

import Select    from '../inputs/formsy-select'

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

        <button className="btn btn-lg btn-default pull-right"
          type="submit"
          disabled={!this.props.can_submit}
        >
          Save
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default ContactForm
