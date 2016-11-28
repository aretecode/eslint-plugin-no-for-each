var rule = require('../../../lib/rules/no-excessive-blank-lines')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('no-excessive-blank-lines', rule, {
  valid: [
    'var example = null; \n var canada = "moose"; \n var eh = "igloo"; \n\n',
  ],
  invalid: [
    {
      code: '\n\n var example = null; \n\n var canada = "moose"; \n\n var eh = "igloo"; \n\n',
      errors: [{message: 'no excessive blank lines'}],
    },
  ],
})
