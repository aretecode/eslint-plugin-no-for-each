/**
 * @fileoverview no for each
 * @author aretecode
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-for-each')
var RuleTester = require('eslint').RuleTester


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester()
eslintTester.run('no-for-each', rule, {
  valid: [
    'var eh = []; for (var i = 0; i < eh.length; i++) { } '
  ],
  invalid: [
    {code: 'variable.forEach(function() {})', errors: [{message: 'NO FOR EACH'}]},
    {
      code: 'variable.forEach(function () {})',
      errors: [{
        message: 'NO FOR EACH',
      }]
    },
    {
      code: 'var eh = ["test-array"].forEach(function(){});',
      errors: [{
        message: 'NO FOR EACH',
      }]
    },
  ],
})
