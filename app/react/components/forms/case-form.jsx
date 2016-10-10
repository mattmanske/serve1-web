//-----------  Imports  -----------//


import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'
import { getVal, getUrl }  from '../../helpers/helpers'

//-----------  Definitions  -----------//

const COUNTY_SELECTION_URL = '/states/${state_id}/counties.json'

//-----------  Class Setup  -----------//

class CaseForm extends React.Component {

  displayName: 'CaseForm'

  static propTypes = {
    resource         : React.PropTypes.object.isRequired,
    selections       : React.PropTypes.object.isRequired,
    canSubmit        : React.PropTypes.bool.isRequired,
    refreshSelection : React.PropTypes.func.isRequired
  }

  state = {
    countiesLoading: false
  }

  //-----------  Selection Update Events  -----------//

  _updateCountySelections = (value) => {
    const select_url = getUrl(COUNTY_SELECTION_URL, { state_id: value })
    const callback = () => this.setState({ countiesLoading: false })

    this.refs.county_id.resetValue()
    this.setState({ countiesLoading: true })
    this.props.refreshSelection(select_url, 'counties', callback)
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties, court_types } = this.props.selections
    const resource = this.props.resource

    const has_state_id = !getVal('state_id', this.refs)

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Case`
    const button_text = `${resource.id ? 'Update' : 'Save'} Case`

    return (
      <div className="child-form case-form">
        <h1>{title_text}</h1>

        <fieldset>
          {/* Case Number */}
          <Input ref="number"
            type="text"
            label="Case Number"
            name="case.number"
            value={resource.number}
            />

          {/* Case State */}
          <Select ref="state_id"
            label="State"
            name="case.state_id"
            value={resource.state_id}
            options={states}
            onChange={this._updateCountySelections}
            />

          {/* Case County */}
          <Select disabled={has_state_id} ref="county_id"
            label="County"
            name="case.county_id"
            value={resource.county_id}
            options={counties}
            isLoading={this.state.countiesLoading}
            />

          {/* Court Type */}
          <Select required ref="court_type"
            label="Courty Type"
            name="case.court_type"
            value={resource.court_type}
            options={court_types}
            />

          {/* Plantiff */}
          <Input required ref="plantiff"
            type="text"
            label="Plantiff"
            name="case.plantiff"
            value={resource.plantiff}
            validations="isExisty"
            validationError="Must have a plantiff."
            />
          <Checkbox ref="plantiff_et_al"
            name="case.plantiff_et_al"
            value={resource.plantiff_et_al}
            rowLabel="Plantiff Et Al?"
            />

          {/* Defendant */}
          <Input required ref="defendant"
            type="text"
            label="Defendant"
            name="case.defendant"
            value={resource.defendant}
            validations="isExisty"
            validationError="Must have a defendant."
            />
          <Checkbox ref="defendant_et_al"
            name="case.defendant_et_al"
            value={resource.defendant_et_al}
            rowLabel="Defendant Et Al?"
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

export default CaseForm
