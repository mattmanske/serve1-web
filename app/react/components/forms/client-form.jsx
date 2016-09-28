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
    const resource = this.props.resource

    return (
      <div className="child-form client-form">
        <h1>Create Client</h1>

        <fieldset>
          <legend>Client Details</legend>

          {/* Client ID */}
          <Input required ref="key"
            autoFocus={true}
            type="text"
            label="Internal ID"
            name="client.key"
            value={resource.key}
            validations="isExisty"
            validationError="Must enter a client ID."
            />

          {/* Name */}
          <Input required ref="name"
            type="text"
            label="Name"
            name="client.name"
            value={resource.name}
            validations="isExisty"
            validationError="Must have a name."
            />

          {/* Email */}
          <Input required ref="email"
            type="email"
            label="Email"
            name="client.email"
            value={resource.email}
            validations="isEmail"
            validationError="Must enter a valid email address."
            />

          {/* Address */}
          <Input ref="address"
            type="text"
            label="Address"
            name="client.address"
            value={resource.address}
            />

          {/* Phone */}
          <Input ref="phone"
            type="text"
            label="Phone"
            name="client.phone"
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

export default ClientForm
