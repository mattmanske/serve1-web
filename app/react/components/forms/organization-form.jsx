//-----------  Imports  -----------//

import React               from 'react'
import { Input, Textarea } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'

//-----------  Class Setup  -----------//

class OrganizationForm extends React.Component {

  displayName: 'OrganizationForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties } = this.props.selections
    const resource = this.props.resource

    return (
      <div className="child-form registration-form">
        <h1>Edit Organization</h1>

        <fieldset>
          {/* Name */}
          <Input required ref="name"
            type="text"
            label="Name"
            name="organization.name"
            value={resource.name}
            validations="isExisty"
            validationError="Must enter a name."
            onChange={this._updateSubdomain}
            />

          {/* Address */}
          <Textarea required ref="address"
            rows={3}
            label="Mailing Address"
            name="organization.address"
            value={resource.address}
            validations="isExisty"
            validationError="Must enter an address."
            placeholder={"123 Main St.\nSuite 4567\nNew York, NY, 12345"}
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

          {/* State */}
          <Select required disabled ref="state_id"
            label="State"
            name="organization.state_id"
            value={resource.state_id}
            options={states}
            />

          {/* County */}
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
          Save Changes
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default OrganizationForm
