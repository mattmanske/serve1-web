//-----------  Imports  -----------//

import React               from 'react'
import { Input, Textarea } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'
import DateInput           from '../inputs/formsy-date'
import { getVal, getUrl }  from '../../helpers/helpers'

//-----------  Definitions  -----------//

const NEW_CLIENT_URL                = '/clients/new.json'
const EDIT_CLIENT_URL               = '/clients/${client_id}/edit.json'
const NEW_CLIENT_CONTACT_URL        = '/clients/${client_id}/client_contacts/new.json'
const EDIT_CLIENT_CONTACT_URL       = '/client_contacts/${contact_id}/edit.json'

const CLIENT_CONTACT_SELECTIONS_URL = '/clients/${client_id}/client_contacts.json'

//-----------  Class Setup  -----------//

class JobForm extends React.Component {

  displayName: 'JobForm'

  static propTypes = {
    resource         : React.PropTypes.object.isRequired,
    selections       : React.PropTypes.object.isRequired,
    canSubmit        : React.PropTypes.bool.isRequired,
    loadModal        : React.PropTypes.func.isRequired,
    refreshSelection : React.PropTypes.func.isRequired
  }

  state = {
    contactsLoading: false
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

  //-----------  HTML Element Render  -----------//

  render(){
    const { clients, contacts, cases, status } = this.props.selections
    const resource = this.props.resource

    const has_client_id  = !getVal('client_id', this.refs)
    const has_contact_id = !getVal('client_contact_id', this.refs)
    const is_completed = ('completed' == getVal('status', this.refs))

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Job`
    const button_text = `${resource.id ? 'Update' : 'Save'} Job`

    return (
      <div className="child-form job-form">
        <h1>{title_text}</h1>

        <fieldset>
          {/* Case */}
          <Select ref="case_id"
            label="Case"
            name="job.case_id"
            value={resource.case_id}
            options={cases}
            />

          {/* Job ID */}
          <Input required ref="key"
            autoFocus={true}
            type="text"
            label="Internal ID"
            name="job.key"
            value={resource.key}
            validations="isExisty"
            validationError="Must enter a case ID."
            />

          {/* Date received */}
          <DateInput required ref="received_at"
            label="Date received"
            name="job.received_at"
            value={resource.received_at}
            validations="isExisty"
            validationError="Must set a date."
            />
        </fieldset>

        <fieldset>
          <legend>Client Details</legend>

          {/* Client */}
          <Select required ref="client_id"
            autoFocus={true}
            label="Client"
            name="job.client_id"
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
            name="job.client_contact_id"
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
          <legend>Wrap-Up</legend>

          {/* Status */}
          <Select required ref="status"
            label="Job Status"
            name="job.status"
            value={resource.status}
            options={status}
            validations="isExisty"
            validationError="Must have a status."
            />

          {/* Date Sent */}
          <DateInput disabled={!is_completed} ref="sent_at"
            label="Date Sent"
            name="job.sent_at"
            value={resource.sent_at}
            showClearDates={true}
            />

          {/* Amount */}
          <Input disabled={!is_completed} ref="amount_cents"
            type="number"
            label="Amount"
            name="job.amount_cents"
            value={resource.amount_cents}
            min={0}
            />

          {/* Notes */}
          <Textarea disabled={!is_completed} ref="notes"
            rows={3}
            type="number"
            label="Notes"
            name="job.notes"
            value={resource.notes}
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

export default JobForm
