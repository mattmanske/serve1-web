//-----------  Imports  -----------//

import React     from 'react'
import { Input } from 'formsy-react-components'

import Select    from '../inputs/formsy-select'

//-----------  Class Setup  -----------//

class AffidavitForm extends React.Component {

  displayName: 'AffidavitForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    can_submit : React.PropTypes.bool.isRequired
  }

  //-----------  Helpers  -----------//

  _getVal(ref){
    return this.refs[ref] && this.refs[ref].getValue()
  }

  //-----------  Selection Update Events  -----------//

  _updateCountySelections = (value) => {
    this.refs.notary_county_id.resetValue()
    this.props.refresh_selection('counties', { state: value })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { states, counties } = this.props.selections
    const resource = this.props.resource

    const has_state_id   = !this._getVal('notary_state_id')

    const title = `${resource.id ? 'Edit' : 'Create'} Affidavit`

    return (
      <div className="child-form contact-form">
        <h1>{title}</h1>

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
            />
        </fieldset>

        <button className="btn btn-default pull-right"
          type="submit"
          disabled={!this.props.can_submit}
        >
          Generate Affidavit
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default AffidavitForm
