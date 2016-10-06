//-----------  Imports  -----------//

import React               from 'react'
import { Input, Textarea } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'
import DateInput           from '../inputs/formsy-date'
import { getVal, getUrl }  from '../../helpers/helpers'

//-----------  Definitions  -----------//

const NEW_PARTY_MODAL  = '/parties/new.json'
const EDIT_PARTY_MODAL = '/parties/${party_id}/edit.json'

//-----------  Class Setup  -----------//

class ServiceForm extends React.Component {

  displayName: 'ServiceForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired,
    loadModal  : React.PropTypes.func.isRequired
  }

  //-----------  Modal Load Events  -----------//

  _newPartyModal = () => {
    const modal_url = NEW_PARTY_MODAL
    this.props.loadModal(modal_url, 'party_id')
  }

  _editPartyModal = () => {
    const party_id  = getVal('party_id', this.refs)
    const modal_url = getUrl(EDIT_PARTY_MODAL, { party_id: party_id })
    this.props.loadModal(modal_url, 'party_id')
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { jobs, parties, status, types } = this.props.selections
    const resource = this.props.resource

    const is_served    = ('served' == getVal('status', this.refs))
    const service_type = is_served ? resource.service_type : undefined
    const has_party_id = !getVal('party_id', this.refs)

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Service`
    const button_text = `${resource.id ? 'Update' : 'Save'} Service`

    return (
      <div className="child-form service-form">
        <h1>{title_text}</h1>

        <fieldset>
          {/* Job */}
          <Select required ref="job_id"
            label="Job"
            name="service.job_id"
            value={resource.job_id}
            options={jobs}
            validations="isExisty"
            validationError="Must have an associated service."
            />

          {/* Status */}
          <Select required ref="status"
            label="Status"
            name="service.status"
            value={resource.status}
            options={status}
            validations="isExisty"
            validationError="Must set a status."
            />

          {/* Party */}
          <Select required ref="party_id"
            label="Party"
            name="service.party_id"
            value={resource.party_id}
            options={parties}
            />

          <a className="btn btn-sm btn-default" onClick={this._newPartyModal}>
            <i className="fa fa-plus fa-fw" />
            Add New Party
          </a>

          {!has_party_id && <small onClick={this._editPartyModal}><a>Edit</a></small>}
        </fieldset>

        <fieldset>
          <legend>Service Detials</legend>

          {/* Service Date */}
          <DateInput disabled={!is_served} ref="service_date"
            label="Service Date"
            name="service.service_date"
            value={resource.service_date}
            />

          {/* Service Type */}
          <Select disabled={!is_served} ref="service_type"
            label="Service Type"
            name="service.service_type"
            value={service_type}
            options={types}
            />

          {/* Attempts */}
          <Input disabled={!is_served} ref="attempts"
            type="number"
            label="Attempts"
            name="service.attempts"
            value={resource.attempts}
            />
        </fieldset>

        <fieldset>
          <legend>Service Person</legend>

          {/* Person Name */}
          <Input disabled={!is_served} ref="person_name"
            type="text"
            label="Name"
            name="service.person_name"
            value={resource.person_name}
            />

          {/* Person Capacity */}
          <Input disabled={!is_served} ref="person_capacity"
            type="text"
            label="Capacity"
            name="service.person_capacity"
            value={resource.person_capacity}
            />

          {/* Person Title */}
          <Input disabled={!is_served} ref="person_title"
            type="text"
            label="Title"
            name="service.person_title"
            value={resource.person_title}
            />

          {/* Person Description */}
          <Textarea disabled={!is_served} ref="person_description"
            rows={3}
            type="text"
            label="Description"
            name="service.person_description"
            value={resource.person_description}
            />
        </fieldset>

        <fieldset>
          <legend>Service Notes</legend>

          {/* Milage */}
          <Input disabled={!is_served} ref="mileage"
            type="number"
            label="Milage"
            name="service.mileage"
            value={resource.mileage}
            min={0}
            />

          {/* Payment */}
          <Input disabled={!is_served} ref="payment_cents"
            type="number"
            label="Payment"
            name="service.payment_cents"
            value={resource.payment_cents}
            min={0}
            />

          {/* Notes */}
          <Textarea disabled={!is_served} ref="notes"
            rows={3}
            type="number"
            label="Notes"
            name="service.notes"
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

export default ServiceForm
