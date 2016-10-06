//-----------  Imports  -----------//

import React              from 'react'
import { Input }          from 'formsy-react-components'

import Select             from '../inputs/formsy-select'
import { getVal, getUrl } from '../../helpers/helpers'

//-----------  Definitions  -----------//

const COUNTY_SELECTION_URL = '/states/${state_id}/counties.json'

//-----------  Class Setup  -----------//

class AffidavitForm extends React.Component {

  displayName: 'AffidavitForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired
  }

  state = {
    countiesLoading: false
  }

  //-----------  Selection Update Events  -----------//

  _updateCountySelections = (value) => {
    const select_url = getUrl(COUNTY_SELECTION_URL, { state_id: value })
    const callback = () => this.setState({ countiesLoading: false })

    this.refs.notary_county_id.resetValue()
    this.setState({ countiesLoading: true })
    this.props.refreshSelection(select_url, 'counties', callback)
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties } = this.props.selections
    const resource = this.props.resource

    const has_state_id = !getVal('notary_state_id', this.refs)

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Affidavit`
    const button_text = `${resource.id ? 'Update' : 'Generate'} Affidavit`

    return (
      <div className="child-form contact-form">
        <h1>{title_text}</h1>

        <fieldset>
          {/* Service ID */}
          <Input required ref="service_id"
            type="hidden"
            name="affidavit.service_id"
            value={resource.service_id}
            />

          {/* Notary State */}
          <Select required ref="notary_state_id"
            label="Notary State"
            name="affidavit.notary_state_id"
            value={resource.notary_state_id}
            options={states}
            onChange={this._updateCountySelections}
            />

          {/* Notary County */}
          <Select required disabled={has_state_id} ref="notary_county_id"
            label="Notary County"
            name="affidavit.notary_county_id"
            value={resource.notary_county_id}
            options={counties}
            isLoading={this.state.countiesLoading}
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

export default AffidavitForm
