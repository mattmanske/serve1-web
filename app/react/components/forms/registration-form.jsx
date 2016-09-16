//-----------  Imports  -----------//

import React          from 'react'
import { FormsyText } from 'formsy-material-ui'

//-----------  Class Setup  -----------//

class RegistrationFrom extends React.Component {

  displayName: 'RegistrationFrom'

  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  //-----------  HTML Element Render  -----------//

  render(){
    console.log(this.props.user);

    return (
      <div className="child-form registration-form">

        {/* Email Field */}
        <FormsyText required
          type="email"
          name="email"
          floatingLabelText="Email"
          value={this.props.user.email}
          validations="isEmail"
          validationError="Must enter a valid email address."
        />

        {/* Name Field */}
        <FormsyText required
          type="text"
          name="name"
          floatingLabelText="Full Name"
          value={this.props.user.name}
          validations="isExisty"
          validationError="Must enter a name."
        />

        {/* Password Field */}
        <FormsyText required
          type="password"
          name="password"
          floatingLabelText="Password"
          value={this.props.user.password}
          autoComplete="off"
          validations="minLength:6"
          validationError="Passowrds must be at least 6 character."
        />

        {/* Password Confirmation */}
        <FormsyText required
          type="password"
          name="password_confirmation"
          floatingLabelText="Confirm Password"
          value={this.props.user.password_confirmation}
          autoComplete="off"
          validations="equalsField:password"
          validationError="Passowrds don't match."
        />
      </div>
    )
  }
}

//-----------  Export  -----------//

export default RegistrationFrom
