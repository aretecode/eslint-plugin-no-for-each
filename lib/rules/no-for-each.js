/**
 * @fileoverview no for each
 * @author aretecode
 * @TODO: add better detection when fixing
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-equals-spacing.js#L18
// https://github.com/jfmengels/eslint-rule-documentation/blob/master/contributing.md
// http://eslint.org/docs/developer-guide/working-with-rules
// http://eslint.org/blog/2016/07/eslint-new-rule-format
// https://github.com/Gillespie59/eslint-plugin-angular
module.exports = {
  meta: {
    docs: {
      description: 'no for each, autofix to normal loop',
      category: 'optimization',
      recommended: false
    },
    fixable: 'code',
    schema: [
      // fill in your schema
      // {
      //   enum: ['always', 'never']
      // }
    ]
  },

  // the rule creator function
  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'Identifier': function(node) {
        if (node.name == 'forEach') {
          console.log('IDENTIFIER')
          context.report({
            node: node,
            message: 'NO FOR EACH',
            fix: function(fixer) {
              return fixer.insertTextAfter(node, "`(console.log('test fixable'))`")
            }
          })
        }
      },
    }
  }
}
