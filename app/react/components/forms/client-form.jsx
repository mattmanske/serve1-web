//-----------  Imports  -----------//

import React     from 'react'
import { Input } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class ClientForm extends React.Component {

  displayName: 'ClientForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    can_submit : React.PropTypes.bool.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    return (
      <div className="child-form client-form">
        <h1>Create Client</h1>

        <fieldset>
          <legend>Client Details</legend>

          {/* Client ID */}
          <Input required
            autoFocus={true}
            type="text"
            label="Internal ID"
            name="client.key"
            validations="isExisty"
            validationError="Must enter a client ID."
            />

          {/* Name */}
          <Input required
            type="text"
            label="Name"
            name="client.name"
            validations="isExisty"
            validationError="Must have a name."
            />

          {/* Email */}
          <Input required
            type="email"
            label="Email"
            name="client.email"
            validations="isEmail"
            validationError="Must enter a valid email address."
            />

          {/* Address */}
          <Input
            type="text"
            label="Address"
            name="client.address"
            />

          {/* Phone */}
          <Input
            type="text"
            label="Phone"
            name="client.phone"
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

export default ClientForm
