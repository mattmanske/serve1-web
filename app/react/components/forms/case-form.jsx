//-----------  Imports  -----------//

import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'

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
      this.props.refresh_selection('contacts', 'client_contact_id', { client: nextProps.resource.client_id })
    }
  }

  //-----------  Helpers  -----------//

  _getVal(ref){
    return this.refs[ref] && this.refs[ref].getValue()
  }

  //-----------  Modal Load Events  -----------//

  _newClientModal = () => {
    this.props.load_modal('clients', 'client_id',)
  }

  _editClientModal = () => {
    const client_id = this._getVal('client_id')
    this.props.load_modal('clients', 'client_id', { id: client_id })
  }

  _newContactModal = () => {
    const client_id = this._getVal('client_id')
    this.props.load_modal('contacts', 'client_contact_id', { client: client_id })
  }

  _editContactModal = () => {
    const client_id  = this._getVal('client_id')
    const contact_id = this._getVal('client_contact_id')
    this.props.load_modal('contacts', 'client_contact_id', { id: contact_id, client: client_id })
  }

  //-----------  Selection Update Events  -----------//

  _updateContactSelections = (value) => {
    this.refs.client_contact_id.resetValue()
    this.props.refresh_selection('contacts', 'client_contact_id', { client: value })
  }

  _updateCountySelections = (value) => {
    this.refs.county_id.resetValue()
    this.props.refresh_selection('counties', 'client_contact_id', { state: value })
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { clients, contacts, states, counties, court_types } = this.props.selections
    const resource = this.props.resource

    const has_client_id  = !this._getVal('client_id')
    const has_contact_id = !this._getVal('client_contact_id')
    const has_state_id   = !this._getVal('state_id')

    const title = `${resource.id ? 'Edit' : 'Create'} Case`

    return (
      <div className="child-form case-form">
        <h1>{title}</h1>

        <fieldset>
          {/* Client */}
          <Select required ref="client_id"
            autoFocus={true}
            label="Client"
            name="case.client_id"
            value={resource.client_id}
            options={clients}
            onChange={this._updateContactSelections}
            />

          <a className="btn btn-sm btn-default" onClick={this._newClientModal}>
            <i className="fa fa-plus fa-fw" />
            Add New Client
          </a>

          {!has_client_id && <small onClick={this._editClientModal}><a>Edit</a></small>}

          {/* Contact */}
          <Select required disabled={has_client_id} ref="client_contact_id"
            label="Contact"
            name="case.client_contact_id"
            value={resource.client_contact_id}
            options={contacts}
            />

          <a className="btn btn-sm btn-default" onClick={this._newContactModal} disabled={has_client_id}>
            <i className="fa fa-plus fa-fw" />
            Add New Contact
          </a>

          {!has_contact_id && <small onClick={this._editContactModal}><a>Edit</a></small>}
        </fieldset>

        <fieldset>
          <legend>Case Details</legend>

          {/* Case ID */}
          <Input required ref="key"
            type="text"
            label="Internal ID"
            name="case.key"
            value={resource.key}
            validations="isExisty"
            validationError="Must enter a case ID."
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

        <button className="btn btn-lg btn-default pull-right"
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

export default CaseForm
