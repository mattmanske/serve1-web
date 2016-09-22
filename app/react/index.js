//-----------  Imports  -----------//

import RWR                  from 'react-webpack-rails'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FormWrapper          from './containers/form-wrapper'

//-----------  Initialization  -----------//

RWR.run();
injectTapEventPlugin();

//-----------  Component Registration  -----------//

RWR.registerComponent('FormWrapper', FormWrapper);
