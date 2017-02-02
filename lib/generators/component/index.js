//-----------  Includes  -----------//

const alreadyExists = require('../utilities/alreadyExists')

//-----------  Prompts  -----------//

const prompts = [{
  type    : 'list',
  name    : 'type',
  message : 'Select the type of component',
  default : 'Stateless Function',
  choices : () => ['Stateless Function', 'ES6 Class'],
},{
  type     : 'input',
  name     : 'name',
  message  : 'What should it be called?',
  default  : 'Button',
  validate : (value) => {
    if ((/.+/).test(value))
      return alreadyExists(value) ? 'A component or container with this name already exists' : true
    return 'The name is required'
  }
}]

//-----------  Actions  -----------//

const actions = ({ type, name }) => {
  const testTemplate      = './templates/test.js.hbs'
  const indexTemplate     = './templates/component.js.hbs'
  const styleTemplate     = './templates/styles.sass.hbs'
  const componentTemplate = ('Stateless Function' == type)
    ? './templates/function.js.hbs'
    : './templates/class.js.hbs'

  return [{
    // Index File
    type         : 'add',
    path         : '../../app/react/components/{{properCase name}}/index.js',
    templateFile : indexTemplate,
    abortOnFail  : true,
  },{
    // Component File
    type         : 'add',
    path         : '../../app/react/components/{{properCase name}}/{{properCase name}}.js',
    templateFile : componentTemplate,
    abortOnFail  : true,
  },{
    // Component Styles
    type         : 'add',
    path         : '../../app/react/components/{{properCase name}}/tests/index.js',
    templateFile : testTemplate,
    abortOnFail  : true,
  },{
    // Component Tests
    type         : 'add',
    path         : '../../app/react/components/{{properCase name}}/styles/index.sass',
    templateFile : styleTemplate,
    abortOnFail  : true,
  },{
    // Import New Component
    type        : 'modify',
    path        : '../../app/react/index.js',
    pattern     : /\/\/\*\*\* component import insert/g,
    template    : "import {{properCase name}} from './containers/{{properCase name}}'\r//*** component import insert",
    abortOnFail : true,
  },{
    // Register New Component
    type        : 'modify',
    path        : '../../app/react/index.js',
    pattern     : /\/\/\*\*\* component registration insert/g,
    template    : "RWR.registerComponent('{{properCase name}}', {{properCase name}});\r//*** component registration insert",
    abortOnFail : true,
  }]
}

//-----------  Exports  -----------//

module.exports = {
  prompts,
  actions,
  description: 'Generate a new component.'
}
