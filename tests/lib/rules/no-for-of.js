var rule = require('../../../lib/rules/no-for-of')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('no-for-of', rule, {
  valid: [
    'var example = null; \n var canada = "moose"; \n var eh = "igloo"; \n\n'
  ],
  invalid: [
    // {
    //  code: 'for (let [key, value] of iterable) {console.log(value);}',
    // }
    // {
    //   code: '\n for (var value of iterable) { \n console.log(value) \n }',
    //   errors: [{message: 'no for of loop'}]
    // },
    {
      code: '\n for (var value of iterable) { \n console.log(value) \n }',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}]
    },
  ],
})
