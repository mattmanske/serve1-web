//-----------  Imports  -----------//

import React            from 'react'
import Formsy           from 'formsy-react'
import getMuiTheme      from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton     from 'material-ui/RaisedButton';

import RegistrationFrom from '../components/forms/registration-form'

//-----------  Class Setup  -----------//

class FormWrapper extends React.Component {

  static propTypes = {
    type     : React.PropTypes.string.isRequired,
    resource : React.PropTypes.object.isRequired,
    errors   : React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ])
  }

  //-----------  Events  -----------//

  _onSubmit = (evt) => {
    alert(JSON.stringify(data, null, 4))
  }

  //-----------  HTML Element Render  -----------//

  render(){
    let child_form
    switch (this.props.type){
      case 'registration':
        child_form = <RegistrationFrom user={this.props.resource} />
        break;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Formsy.Form onSubmit={this.submit} className="react-form">

          {child_form}

          <RaisedButton className="react-form-submit"
            type="submit"
            label="Submit"
            primary={true}
          />
        </Formsy.Form>
      </MuiThemeProvider>
    )
  }
}

//-----------  Export  -----------//

export default FormWrapper
