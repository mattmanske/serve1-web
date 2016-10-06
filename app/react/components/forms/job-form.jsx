//-----------  Imports  -----------//

import React               from 'react'
import { Input, Textarea } from 'formsy-react-components'

import Select              from '../inputs/formsy-select'
import DateInput           from '../inputs/formsy-date'
import { getVal }          from '../../helpers/helpers'

//-----------  Class Setup  -----------//

class JobForm extends React.Component {

  displayName: 'JobForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object.isRequired,
    canSubmit  : React.PropTypes.bool.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const { cases, status } = this.props.selections
    const resource = this.props.resource

    const is_completed = ('completed' == getVal('status', this.refs))

    const title_text  = `${resource.id ? 'Edit' : 'Create'} Job`
    const button_text = `${resource.id ? 'Update' : 'Save'} Job`

    return (
      <div className="child-form job-form">
        <h1>{title_text}</h1>

        <fieldset>
          {/* Case */}
          <Select required ref="case_id"
            label="Case"
            name="job.case_id"
            value={resource.case_id}
            options={cases}
            validations="isExisty"
            validationError="Must have an associated case."
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

          {/* Date Recieved */}
          <DateInput required ref="date_received"
            label="Date Recieved"
            name="job.date_received"
            value={resource.date_received}
            validations="isExisty"
            validationError="Must set a date."
            />
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

          {/* Date Recieved */}
          <DateInput disabled={!is_completed} ref="date_sent"
            label="Date Sent"
            name="job.date_sent"
            value={resource.date_sent}
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
