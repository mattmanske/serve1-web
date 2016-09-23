//-----------  Imports  -----------//

import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

import Select              from '../formsy-select'

//-----------  Class Setup  -----------//

class CaseForm extends React.Component {

  displayName: 'CaseForm'

  static propTypes = {
    resource          : React.PropTypes.object.isRequired,
    selections        : React.PropTypes.object.isRequired,
    modal_urls        : React.PropTypes.object.isRequired,
    selection_urls    : React.PropTypes.object.isRequired,
    can_submit        : React.PropTypes.bool.isRequired,
    load_modal        : React.PropTypes.func.isRequired,
    refresh_selection : React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps){
    if (this.props.resource.client_id != nextProps.resource.client_id){
      this.props.refresh_selection('contacts', { client_id: nextProps.resource.client_id})
    }
  }

  //-----------  Modal Event Handlers  -----------//

  _loadClientModal = () => this.props.load_modal('clients', 'client_id')
  _loadContactModal = () => this.props.load_modal('contacts', 'client_contact_id')

  //-----------  HTML Element Render  -----------//

  render(){
    const { clients, contacts, states, counties, court_types } = this.props.selections
    const resource = this.props.resource

    console.log(this.refs);

    return (
      <div className="child-form case-form">
        <h1>Create Case</h1>

        <fieldset>
          <legend>Client Details</legend>

          {/* Client */}
          <Select required
            autoFocus={true}
            label="Client"
            name="case.client_id"
            value={resource.client_id}
            options={clients}
            />
          <a className="btn btn-sm btn-default" onClick={this._loadClientModal}>
            <i className="fa fa-plus fa-fw" />
            Add New Client
          </a>

          {/* Contact */}
          <Select required
            label="Primary Contact"
            name="case.client_contact_id"
            value={resource.client_contact_id}
            options={contacts}
            />
          <a className="btn btn-sm btn-default" onClick={this._loadContactModal}>
            <i className="fa fa-plus fa-fw" />
            Add New Contact
          </a>
        </fieldset>

        <fieldset>
          <legend>Case Details</legend>

          {/* Case ID */}
          <Input required
            type="text"
            label="Internal ID"
            name="case.key"
            value={resource.key}
            validations="isExisty"
            validationError="Must enter a case ID."
            />

          {/* Case State */}
          <Select required disabled
            label="State"
            name="case.state_id"
            value={60}
            options={states}
            />

          {/* Case County */}
          <Select required
            label="County"
            name="case.county_id"
            value={resource.county_id}
            options={counties}
            />

          {/* Court Type */}
          <Select required
            label="Courty Type"
            name="case.court_type"
            value={resource.court_type}
            options={court_types}
            />

          {/* Plantiff */}
          <Input required
            type="text"
            label="Plantiff"
            name="case.plantiff"
            value={resource.plantiff}
            validations="isExisty"
            validationError="Must have a plantiff."
            />
          <Checkbox
            value={false}
            name="case.plantiff_et_al"
            value={resource.plantiff_et_al}
            rowLabel="Plantiff Et Al?"
            />

          {/* Defendant */}
          <Input required
            type="text"
            label="Defendant"
            name="case.defendant"
            value={resource.defendant}
            validations="isExisty"
            validationError="Must have a defendant."
            />
          <Checkbox
            value={false}
            name="case.defendant_et_al"
            value={resource.defendant_et_al}
            rowLabel="Defendant Et Al?"
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

export default CaseForm
