//-----------  Imports  -----------//

import React     from 'react'
import { Input } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class ClientForm extends React.Component {

  displayName: 'ClientForm'

  static propTypes = {
    resource  : React.PropTypes.object.isRequired,
    canSubmit : React.PropTypes.bool.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const resource = this.props.resource

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Client`
    const button_text = `${resource.id ? 'Update' : 'Save'} Client`

    return (
      <div className="child-form client-form">
        <h1>{title_text}</h1>

        <fieldset>
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

        <button className="btn btn-default pull-right"
          type="submit"
          disabled={!this.props.canSubmit}
        >
          {button_text}
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default ClientForm
