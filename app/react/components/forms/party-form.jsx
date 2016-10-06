//-----------  Imports  -----------//

import React              from 'react'
import { Input }          from 'formsy-react-components'

import Select             from '../inputs/formsy-select'
import { getVal, getUrl } from '../../helpers/helpers'

//-----------  Definitions  -----------//

const COUNTY_SELECTION_URL       = '/states/${state_id}/counties.json'
const MUNICIPALITY_SELECTION_URL = '/counties/${county_id}/municipalities.json'

//-----------  Class Setup  -----------//

class PartyForm extends React.Component {

  displayName: 'PartyForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired
  }

  state = {
    countiesLoading       : false,
    municipalitiesLoading : false
  }

  //-----------  Selection Update Events  -----------//

  _updateCountySelections = (value) => {
    const select_url = getUrl(COUNTY_SELECTION_URL, { state_id: value })
    const callback = () => this.setState({ countiesLoading: false })

    this.refs.county_id.resetValue()
    this.setState({ countiesLoading: true })
    this.props.refreshSelection(select_url, 'counties', callback)
  }

  _updateMunicipalitySelections = (value) => {
    const select_url = getUrl(MUNICIPALITY_SELECTION_URL, { county_id: value })
    const callback = () => this.setState({ municipalitiesLoading: false })

    this.refs.municipality_id.resetValue()
    this.setState({ municipalitiesLoading: true })
    this.props.refreshSelection(select_url, 'municipalities', callback)
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties, municipalities } = this.props.selections
    const resource = this.props.resource

    const has_state_id  = !getVal('state_id', this.refs)
    const has_county_id = !getVal('county_id', this.refs)

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Party`
    const button_text = `${resource.id ? 'Update' : 'Save'} Party`

    return (
      <div className="child-form party-form">
        <h1>{title_text}</h1>

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
            isLoading={this.state.countiesLoading}
            />

          {/* Party Municipality */}
          <Select required disabled={has_county_id} ref="municipality_id"
            label="Municipality"
            name="party.municipality_id"
            value={resource.municipality_id}
            options={municipalities}
            isLoading={this.state.municipalitiesLoading}
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
          disabled={!this.props.canSubmit}
        >
          {button_text}
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default PartyForm
