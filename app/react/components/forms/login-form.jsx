//-----------  Imports  -----------//

import React               from 'react'
import { Input, Checkbox } from 'formsy-react-components'

//-----------  Class Setup  -----------//

class LoginForm extends React.Component {

  displayName: 'LoginForm'

  static propTypes = {
    resource: React.PropTypes.object.isRequired,
  }

  //-----------  HTML Element Render  -----------//

  render(){
    const resource = this.props.resource

    return (
      <div className="child-form login-form">
        <h1>Log In</h1>

        <fieldset>
          {/* User Email */}
          <Input required ref="email"
            autoFocus={true}
            type="email"
            label="Email"
            name="user.email"
            value={resource.email}
            validations="isEmail"
            validationError="Must enter a valid email address."
          />

          {/* Password */}
          <Input required ref="password"
            autoComplete="off"
            type="password"
            label="Password"
            name="user.password"
            value={resource.password}
            validations="minLength:6"
            validationError="Passowrds must be at least 6 character."
          />

          {/* Remember Me */}
          <Checkbox ref="remember_me"
            value={false}
            name="user.remember_me"
            rowLabel="Remember me"
            value={resource.remember_me}
          />
        </fieldset>

        <button type="submit" className="btn btn-default pull-right">
          Log In
        </button>
      </div>
    )
  }
}

//-----------  Export  -----------//

export default LoginForm
