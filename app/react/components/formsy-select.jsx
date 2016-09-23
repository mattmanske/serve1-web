//-----------  Imports  -----------//

import React       from 'react'
import ReactSelect from 'react-select'
import { HOC }     from 'formsy-react'

//-----------  Class Setup  -----------//

class Select extends React.Component {

  _changeValue = (value, selectedOptions) => {
    if (this.props.multiple){
      this.props.setValue(selectedOptions.map(option => option.value));
    } else {
      this.props.setValue(value);
    }
  }

  render(){
    return (
      <div className='form-group row'>
        <label className="control-label col-sm-3" data-required={this.props.required} htmlFor={this.props.name}>
          {this.props.label}
          {this.props.required && <span className="required-symbol"> *</span>}
        </label>
        <div className="col-sm-9">
          <ReactSelect {...this.props}
            resetValue={undefined}
            onChange={this._changeValue}
            value={this.props.getValue()}
            />
        </div>
      </div>
    );
  }
}

//-----------  Export  -----------//

export default HOC(Select)
