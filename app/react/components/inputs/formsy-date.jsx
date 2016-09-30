//-----------  Imports  -----------//

import moment               from 'moment'

import React                from 'react'
import { HOC }              from 'formsy-react'

import { SingleDatePicker } from 'react-dates'

//-----------  Class Setup  -----------//

class DateInput extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      focused : false,
      date    : this.props.value && moment(this.props.value)
    };

    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    const date_comp     = (this.state.date) && (this.state.date._i != nextState.date._i)
    const focused_comp  = (this.state.focused != nextState.focused)
    const disabled_comp = (this.props.disabled != nextProps.disabled)
    return (date_comp || focused_comp || disabled_comp)
  }

  onDateChange(date){
    this.props.setValue(date.toISOString())
    this.setState({ date })
  }

  onFocusChange({ focused }){
    this.setState({ focused })
  }

  render(){
    const { focused, date } = this.state

    return (
      <div className='form-group select-group row'>
        <label className="control-label col-sm-3" data-required={this.props.required} htmlFor={this.props.name}>
          {this.props.label}
          {this.props.required && <span className="required-symbol"> *</span>}
        </label>

        <div className="col-sm-9">
          <SingleDatePicker
            id="date_input"
            date={date}
            disabled={this.props.disabled}
            focused={focused}
            numberOfMonths={1}
            placeholder="Select Date..."
            displayFormat={'MMM Do, YYYY'}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            />
        </div>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default HOC(DateInput)
