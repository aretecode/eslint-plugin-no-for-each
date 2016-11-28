var rule = require('../../../lib/rules/no-for-in')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('no-for-in', rule, {
  valid: [
    'var eh = []; for (var i = 0; i < eh.length; i++) { console.log(eh[i]) } ',
  ],
  invalid: [
    {
      code: 'for (eh in canada) { }',
      errors: [{message: 'no for in loop'}],
    },
    {
      code: 'for (eh in canada){}',
      errors: [{message: 'no for in loop'}],
    },
    {
      code: 'for (var eh in canada) { }',
      errors: [{message: 'no for in loop'}],
    },
    // making sure all instances are replaced
    {
      code: 'for (var value in canada) { \n console.log(value) \n console.log(value) \n }',
      parser: 'babel-eslint',
      errors: [{message: 'no for in loop'}],
    },
    {
      code: 'for (var eh in canada) { \n console.log(eh) \n }',
      errors: [{message: 'no for in loop'}],
    },
    {
      code: 'for (var moose in canada) console.log(moose)',
      errors: [{message: 'no for in loop'}],
    },
  ],
})
