//-----------  Imports  -----------//

import _           from 'lodash'

import React       from 'react'
import { HOC }     from 'formsy-react'

import ReactSelect from 'react-select'

//-----------  Class Setup  -----------//

class Select extends React.Component {

  static propTypes = {
    onChange  : React.PropTypes.func,
    isLoading : React.PropTypes.bool
  }

  _changeValue = (value, selectedOptions) => {
    const newValue = (this.props.multiple) ? selectedOptions.map(option => option.value) : value

    if (this.props.onChange) // Fire change event
      this.props.onChange(newValue)

    this.props.setValue(newValue)
  }

  render(){
    const { disabled, placeholder, isLoading, ...props } = this.props

    const isDisabled = disabled || isLoading
    const selectText = isLoading ? 'Loading...' : placeholder || 'Select one...'

    return (
      <div className='form-group select-group row'>
        <label className="control-label col-sm-3" data-required={this.props.required} htmlFor={this.props.name}>
          {this.props.label}
          {this.props.required && <span className="required-symbol"> *</span>}
        </label>

        <div className="col-sm-9">
          <ReactSelect {...props}
            isLoading={isLoading}
            disabled={isDisabled}
            placeholder={selectText}
            resetValue={undefined}
            onChange={this._changeValue}
            value={this.props.getValue()}
            simpleValue={true}
            clearable={this.props.clearable || false}
            />
        </div>
      </div>
    );
  }
}

//-----------  Export  -----------//

export default HOC(Select)
