/**
 * @fileoverview no for each
 * @author aretecode
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// https://medium.com/tumblbug-engineering/creating-an-eslint-plugin-87f1cb42767f#.z5t30ge87
// http://stackoverflow.com/questions/34130718/how-to-create-customized-eslint-rules/34186003
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
    var sourceCode = context.getSourceCode()

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // without fix, this is all we need
      // 'Identifier': function(node) {
      //   if (node.name == 'forEach') {
      //     context.report({
      //       node: node,
      //       message: 'NO FOR EACH'
      //     })
      //   }
      // },

      /**
       * if it is a .forEach
       * take the parameter name
       * use body inside of a `for` loop
       * replace all instances of it inside of the body.body
       *
       * @TODO: figure out how to replace chaining as well
       * @TODO: replace `args` with `params`
       *
       * @example:
       *
       * #1 eh.
       * #2 forEach(
       * #3   function(
       * #4     parameterName
       * #3    )
       * #5    {
       *  #6      console.log(parameterName);
       *  #6      console.log('second part of the body')
       *  #6      const something = 'eh'
       * #5    }
       * #2   )
       *
       *
       * @TODO:
       * this will not work for
       * `var canada = eh.forEach(` ...
       *
       *
       * CallExpression
       * just using MemberExpression to replace all
       * this could be easier to replace
       *
       */
      'ExpressionStatement': function(node) {

        // CallExpression
        var expr = node.expression
        if (!expr) {
          console.log(expr);
          return
        }

        // MemberExpression
        var callee = expr.callee
        if (!callee) {
          return
        }

        // @NOTE: console.*log* will be looped as well in this call expression
        // in the tests
        //
        // #2
        // should be `{name: forEach, ...}`
        var prop = callee.property
        if (!prop) {
          // console.log('callee had no .property', callee)
          return
        }
        var propName = prop.name
        if (propName !== 'forEach') {
          // console.log('propname was not forEach', propName, callee)
          return
        }

        // we will just fix for Identifier now
        // .object could be ArrayExpression | Identifier
        // #1
        var variablesBeingLooped = callee.object
        // if it is Identifier
        // #1
        var variableBeingLooped = variablesBeingLooped
        // @example
        // ***['val']***.forEach
        // has no name
        if (variablesBeingLooped.name) {
          variableBeingLooped = variablesBeingLooped.name
        }


        // the loop func
        // ----------------------------

        // ArrowFunctionExpression | FunctionExpression
        // #3
        var func = expr.arguments
        if (!func || !func[0]) {
          // console.log('no func | func[0] - func (was looking for func.arguments)', func)
          return
        }
        func = func[0]

        // names of the params : array
        // #4
        var funcArgs = func.params
        if (!funcArgs) {
          // console.log('no func (.params)', func)
          return
        }
        var firstFuncArg = funcArgs[0]

        // might have no args
        var firstFuncArgName = null
        if (firstFuncArg) {
          firstFuncArgName = firstFuncArg.name
        }

        // BlockStatement
        // #5
        var blockWithBraces = func.body
        if (!blockWithBraces) {
          // console.log('no func (.body)', func)
          return
        }

        // @NOTE: body doesn't have body if on one line and one expression
        //
        // #6
        // stuff inside of the { } : array
        //
        // var blockBody = blockWithBraces.body

        context.report({
          node: node,
          message: 'NO FOR EACH',
          fix: function(fixer) {

            // @TODO: and use variable names that don't overlap, eventually
            var code = null
            function makeCode(body) {
              code = 'for (let i = 0; i < ' + variableBeingLooped + '.length; i++) ' + body
              return code
            }

            var txt = sourceCode.getText(blockWithBraces)

            // @TODO: assign to a variable first
            // if it is like ['array']
            if (typeof(variableBeingLooped) === 'object') {
              variableBeingLooped = sourceCode.getText(variableBeingLooped)
            }

            // @TODO: could also use `const = variableBeingLooped[i]`
            var replaced = txt.replace(firstFuncArgName, variableBeingLooped + '[i]')

            makeCode(replaced)

            var fixed = fixer.replaceTextRange([node.start, node.end], code);
            console.log(fixed.text)
            return fixed
          }
        }) // report

      }, // ExpressionStatement
    }
  } // create
}
