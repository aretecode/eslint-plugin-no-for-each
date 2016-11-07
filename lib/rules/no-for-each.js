/**
 * @fileoverview no for each
 * @author aretecode
 * @TODO: add better detection when fixing
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


// http://stackoverflow.com/questions/38278273/eslint-code-vs-whitespace-values-for-fixable
// https://github.com/eslint/eslint/commit/a9a4652b2ce92858d90243e7bb8693f458a14783
// https://github.com/facebookincubator/create-react-app/issues/272
// https://github.com/facebookincubator/create-react-app/issues/274
// https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-equals-spacing.js#L18
// https://github.com/jfmengels/eslint-rule-documentation/blob/master/contributing.md
// https://github.com/Gillespie59/eslint-plugin-angular
// http://eslint.org/docs/developer-guide/working-with-rules
// http://eslint.org/blog/2016/07/eslint-new-rule-format
// http://eslint.org/docs/developer-guide/working-with-rules-new
module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'no for each, autofix to normal loop',
      category: 'Best Practices',
      recommended: false
    },
    schema: [
      {
        enum: ['always', 'never']
      }
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
