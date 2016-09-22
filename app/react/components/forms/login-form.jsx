//-----------  Imports  -----------//

import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class LoginForm extends React.Component {

  displayName: 'LoginForm'

  static propTypes = {
    resource   : React.PropTypes.object.isRequired,
    selections : React.PropTypes.object,
    canSubmit  : React.PropTypes.bool
  }

  //-----------  HTML Element Render  -----------//

  render(){
    return (
      <div className="child-form login-form">
        <h1>Log In</h1>

        <fieldset>
          {/* User Email */}
          <Input required
            autoFocus={true}
            type="email"
            label="Email"
            name="user.email"
            validations="isEmail"
            validationError="Must enter a valid email address."
          />

          {/* Password */}
          <Input required
            autoComplete="off"
            type="password"
            label="Password"
            name="user.password"
            validations="minLength:6"
            validationError="Passowrds must be at least 6 character."
          />

          {/* Remember Me */}
          <Checkbox
            value={false}
            name="user.remember_me"
            rowLabel="Remember me"
          />
        </fieldset>

        <button type="submit" className="btn btn-lg btn-default pull-right">
          Log In
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default LoginForm
