var rule = require('../../../lib/rules/cache-for-length')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()
eslintTester.run('cache-for-length', rule, {
  valid: [
    'var eh = []; for (var i = 0, len = eh.length; i < len; i++) { console.log(eh[i]) } ',
  ],
  invalid: [
    {
      code: 'for (var i = 0; i < eh.length; i++) { console.log(eh[i]) }',
      errors: [{message: 'cache length in for loop'}],
      parser: 'babel-eslint',
    },
    {
      code: 'for (var i = 0; i < Object.keys(eh).length; i++) { console.log(Object.keys(eh[i])) }',
      errors: [{message: 'cache length in for loop'}],
      parser: 'babel-eslint',
    },
  ],
})
