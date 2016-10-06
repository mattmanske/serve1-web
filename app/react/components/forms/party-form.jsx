//-----------  Imports  -----------//

import React     from 'react'
import { Input } from 'formsy-react-components'

import Select    from '../inputs/formsy-select'

//-----------  Class Setup  -----------//

class PartyForm extends React.Component {

  displayName: 'PartyForm'

  static propTypes = {
    resource       : React.PropTypes.object.isRequired,
    selections     : React.PropTypes.object.isRequired,
    selection_urls : React.PropTypes.object.isRequired,
    can_submit     : React.PropTypes.bool.isRequired
  }

  //-----------  Helpers  -----------//

  _getVal(ref){
    return this.refs[ref] && this.refs[ref].getValue()
  }

  //-----------  Selection Update Events  -----------//

  _updateCountySelections = (value) => {
    this.refs.county_id.resetValue()
    this.props.refresh_selection('counties', { state: value })
  }

  _updateMunicipalitySelections = (value) => {
    this.refs.municipality_id.resetValue()
    this.props.refresh_selection('municipalities', { county: value })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties, municipalities } = this.props.selections
    const resource = this.props.resource

    const has_state_id  = !this._getVal('state_id')
    const has_county_id = !this._getVal('county_id')

    const title = `${resource.id ? 'Edit' : 'Create'} Party`

    return (
      <div className="child-form party-form">
        <h1>{title}</h1>

        <fieldset>
          {/* Name */}
          <Input required ref="name"
            type="text"
            label="Full Name"
            name="party.name"
            value={resource.name}
            validations="isExisty"
            validationError="Must enter a name."
            />

          {/* Party State */}
          <Select required ref="state_id"
            label="State"
            name="party.state_id"
            value={resource.state_id}
            options={states}
            onChange={this._updateCountySelections}
            />

          {/* Party County */}
          <Select required disabled={has_state_id} ref="county_id"
            label="County"
            name="party.county_id"
            value={resource.county_id}
            options={counties}
            onChange={this._updateMunicipalitySelections}
            />

          {/* Party Municipality */}
          <Select required disabled={has_county_id} ref="municipality_id"
            label="Municipality"
            name="party.municipality_id"
            value={resource.municipality_id}
            options={municipalities}
            />

          {/* Address */}
          <Input ref="address"
            type="text"
            label="Street Address"
            name="party.address"
            value={resource.address}
            />
        </fieldset>

        <button className="btn btn-default pull-right"
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

export default PartyForm
