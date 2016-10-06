//-----------  Imports  -----------//


import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'
import { getVal, getUrl }  from '../../helpers/helpers'

//-----------  Definitions  -----------//

const NEW_CLIENT_URL                = '/clients/new.json'
const EDIT_CLIENT_URL               = '/clients/${client_id}/edit.json'
const NEW_CLIENT_CONTACT_URL        = '/clients/${client_id}/client_contacts/new.json'
const EDIT_CLIENT_CONTACT_URL       = '/client_contacts/${contact_id}/edit.json'

const CLIENT_CONTACT_SELECTIONS_URL = '/clients/${client_id}/client_contacts.json'
const COUNTY_SELECTION_URL          = '/states/${state_id}/counties.json'

//-----------  Class Setup  -----------//

class CaseForm extends React.Component {

  displayName: 'CaseForm'

  static propTypes = {
    resource         : React.PropTypes.object.isRequired,
    selections       : React.PropTypes.object.isRequired,
    canSubmit       : React.PropTypes.bool.isRequired,
    loadModal        : React.PropTypes.func.isRequired,
    refreshSelection : React.PropTypes.func.isRequired
  }

  state = {
    contactsLoading: false,
    countiesLoading: false
  }

  //-----------  Modal Load Events  -----------//

  _newClientModal = () => {
    const modal_url = NEW_CLIENT_URL
    this.props.loadModal(modal_url, 'client_id')
  }

  _editClientModal = () => {
    const client_id = getVal('client_id', this.refs)
    const modal_url = getUrl(EDIT_CLIENT_URL, { client_id: client_id })
    this.props.loadModal(modal_url, 'client_id')
  }

  _newContactModal = () => {
    const client_id = getVal('client_id', this.refs)
    const modal_url = getUrl(NEW_CLIENT_CONTACT_URL, { client_id: client_id })
    this.props.loadModal(modal_url, 'client_contact_id')
  }

  _editContactModal = () => {
    const contact_id = getVal('client_contact_id', this.refs)
    const modal_url  = getUrl(EDIT_CLIENT_CONTACT_URL, { contact_id: contact_id})
    this.props.loadModal(modal_url, 'client_contact_id')
  }

  //-----------  Selection Update Events  -----------//

  _updateContactSelections = (value) => {
    const select_url = getUrl(CLIENT_CONTACT_SELECTIONS_URL, { client_id: value })
    const callback = () => this.setState({ contactsLoading: false })

    this.refs.client_contact_id.resetValue()
    this.setState({ contactsLoading: true })
    this.props.refreshSelection(select_url, 'contacts', callback)
  }

  _updateCountySelections = (value) => {
    const select_url = getUrl(COUNTY_SELECTION_URL, { state_id: value })
    const callback = () => this.setState({ countiesLoading: false })

    this.refs.county_id.resetValue()
    this.setState({ countiesLoading: true })
    this.props.refreshSelection(select_url, 'counties', callback)
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { clients, contacts, states, counties, court_types } = this.props.selections
    const resource = this.props.resource

    const has_client_id  = !getVal('client_id', this.refs)
    const has_contact_id = !getVal('client_contact_id', this.refs)
    const has_state_id   = !getVal('state_id', this.refs)

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Case`
    const button_text = `${resource.id ? 'Update' : 'Save'} Case`

    return (
      <div className="child-form case-form">
        <h1>{title_text}</h1>

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

          {/* Client Contact */}
          <Select required disabled={has_client_id} ref="client_contact_id"
            label="Client Contact"
            name="case.client_contact_id"
            value={resource.client_contact_id}
            options={contacts}
            isLoading={this.state.contactsLoading}
            />

          <a className="btn btn-sm btn-default" onClick={this._newContactModal} disabled={has_client_id}>
            <i className="fa fa-plus fa-fw" />
            Add New Client Contact
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
