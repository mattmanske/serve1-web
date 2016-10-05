//-----------  Imports  -----------//

import RWR                  from 'react-webpack-rails'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FormWrapper          from './containers/form-wrapper'
import ModalWrapper         from './containers/modal-wrapper'
import TableWrapper         from './containers/table-wrapper'

//-----------  Initialization  -----------//

RWR.run();
injectTapEventPlugin()

//-----------  Component Registration  -----------//

RWR.registerComponent('FormWrapper', FormWrapper);
RWR.registerComponent('ModalWrapper', ModalWrapper);
RWR.registerComponent('TableWrapper', TableWrapper);
