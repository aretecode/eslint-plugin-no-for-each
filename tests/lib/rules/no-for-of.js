var rule = require('../../../lib/rules/no-for-of')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('no-for-of', rule, {
  valid: [
    'var eh = []; for (var i = 0; i < eh.length; i++) { console.log(eh[i]) } ',
  ],
  invalid: [
    {
      // @NOTE: does not get auto-fixed.
      code: 'for (let [key, value] of iterable) {console.log(value);}',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}],
    },
    {
      code: '\n for (var value of iterable) { \n console.log(value) \n }',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}],
    },
    {
      code: 'for (var value of canada) { \n console.log(value) \n }',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}],
    },

    // making sure all instances are replaced
    {
      code: 'for (var value of canada) { \n console.log(value) \n console.log(value) \n }',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}],
    },
    {
      code: 'for (var value of canada) console.log(value)',
      parser: 'babel-eslint',
      errors: [{message: 'no for of loop'}],
    },
  ],
})
