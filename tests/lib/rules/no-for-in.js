var rule = require('../../../lib/rules/no-for-in')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('no-for-in', rule, {
  valid: [
    'var example = null; \n var canada = "moose"; \n var eh = "igloo"; \n\n'
  ],
  invalid: [
    {
      code: 'for (eh in canada) { }',
      errors: [{message: 'no for in loop'}]
    },
  ],
})
