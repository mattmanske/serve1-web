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

    return (
      <div className="child-form contact-form">
        <h1>Create Client Contact</h1>

        <fieldset>
          <legend>Contact Details</legend>

          {/* Client */}
          <Select required
            autoFocus={true}
            label="Client"
            name="client_contact.client_id"
            options={clients}
            />

          {/* Name */}
          <Input required
            type="text"
            label="Name"
            name="client_contact.name"
            validations="isExisty"
            validationError="Must have a name."
            />

          {/* Email */}
          <Input required
            type="email"
            label="Email"
            name="client_contact.email"
            validations="isEmail"
            validationError="Must enter a valid email address."
            />

          {/* Address */}
          <Input
            type="text"
            label="Address"
            name="client_contact.address"
            />

          {/* Phone */}
          <Input
            type="text"
            label="Phone"
            name="client_contact.phone"
            />
        </fieldset>

        <button type="submit" className="btn btn-lg btn-default pull-right">
          Save
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default ContactForm
