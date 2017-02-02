//-----------  Includes  -----------//

const alreadyExists = require('../utilities/alreadyExists')

//-----------  Prompts  -----------//

const prompts = [{
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
  const indexTemplate     = './templates/container.js.hbs'
  const styleTemplate     = './templates/styles.sass.hbs'
  const componentTemplate = './templates/class.js.hbs'

  return [{
    // Index File
    type         : 'add',
    path         : '../../app/react/containers/{{properCase name}}/index.js',
    templateFile : indexTemplate,
    abortOnFail  : true,
  },{
    // Component File
    type         : 'add',
    path         : '../../app/react/containers/{{properCase name}}/{{properCase name}}.js',
    templateFile : componentTemplate,
    abortOnFail  : true,
  },{
    // Container Styles
    type         : 'add',
    path         : '../../app/react/containers/{{properCase name}}/tests/index.js',
    templateFile : testTemplate,
    abortOnFail  : true,
  },{
    // Container Tests
    type         : 'add',
    path         : '../../app/react/containers/{{properCase name}}/styles/index.sass',
    templateFile : styleTemplate,
    abortOnFail  : true,
  },{
    // Import New Container
    type        : 'modify',
    path        : '../../app/react/index.js',
    pattern     : /\/\/\*\*\* container import insert/g,
    template    : "import {{properCase name}} from './containers/{{properCase name}}'\r//*** container import insert",
    abortOnFail : true,
  },{
    // Register New Container
    type        : 'modify',
    path        : '../../app/react/index.js',
    pattern     : /\/\/\*\*\* container registration insert/g,
    template    : "RWR.registerComponent('{{properCase name}}', {{properCase name}});\r//*** container registration insert",
    abortOnFail : true,
  }]
}

//-----------  Exports  -----------//

module.exports = {
  prompts,
  actions,
  description: 'Generate a new container.'
}
