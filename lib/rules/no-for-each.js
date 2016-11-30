module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'no for each, autofix to normal loop',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        enum: ['always', 'never', 'cache-length'],
      },
    ],
  },

  create: function(context) {
    var sourceCode = context.getSourceCode()
    var configuration = context.options[0]
    var isLog = (process.argv.includes('log') || process.argv.includes('logs'))
    var isTest = (process.argv.includes('test') || process.argv.includes('tests'))
    var loopVariableDefinedInBlock = require('../processors/loop-variable-in-block')
    var leftDeclaration = require('../processors/left-declaration')
    var replaceDeclarationIfNeeded = require('../processors/replace-declaration-if-needed')

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
       * #4     parameterName,
       * #4.1   ?index
       * #3    )
       * #5    {
       *  #6      console.log(parameterName);
       *  #6      console.log('second part of the body')
       *  #6      const something = 'eh'
       * #5    }
       * #2   )
       *
       * ---
       *
       * CallExpression
       * just using MemberExpression to replace all
       * this could be easier to replace
       *
       * ---
       *
       * @TODO:
       * this will not work for
       * `var canada = eh.forEach(` ...
       *
       * @TODO:
       * - [x] support schema for preoptimized length
       * - [ ] support es6 or es5 with var or let
       * - [ ] clean up fix fn
       *
       * @TODO:
       * - [x] support
       * Object.keys(typos).forEach(type => delete typos[type])
       *
       * - [ ] support (*types* leaves an s at the end...)
       * Object.keys(types).forEach(type => delete types[type])
       *
       * @TODO:
       * - [ ] add regex to match `secondFnParamName` safely...
       * - [ ] !!! SUPPORT FOR `const firstFnParamName = iteratee[i]`
       */
      'ExpressionStatement': function(node) {

        // CallExpression
        var expr = node.expression
        if (!expr) {
          if (isLog) console.log(expr)
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
          if (isLog) console.log('callee had no .property', callee)
          return
        }
        var propName = prop.name
        if (propName !== 'forEach') {
          if (isLog) console.log('propname was not forEach', propName, callee)
          return
        }

        // we will just fix for Identifier now
        // .object could be ArrayExpression | Identifier | CallExpression
        // #1
        var variablesBeingLooped = callee.object
        // if it is Identifier
        // #1
        var variableBeingLooped = variablesBeingLooped
        // @TODO: && !isArgExpr
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
          if (isLog) console.log('no func | func[0] - func (was looking for func.arguments)', func)
          return
        }
        var isArgExpr = func.expression
        func = func[0]

        // names of the params : array
        // #4
        var funcParams = func.params
        if (!funcParams) {
          if (isLog) console.log('no func (.params)', func)
          return
        }
        var firstFnParam = funcParams[0]
        var secondFnParam = funcParams[1]

        // might have no args
        var firstFnParamName = null
        var secondFnParamName = 'i'
        if (firstFnParam) {
          firstFnParamName = firstFnParam.name
        }
        if (secondFnParam && typeof secondFnParam.name === 'string') {
          secondFnParamName = secondFnParam.name
        }

        // BlockStatement
        // #5
        var blockWithBraces = func.body
        if (!blockWithBraces) {
          if (isLog) console.log('no func (.body)', func)
          return
        }

        context.report({
          node: node,
          message: 'no for each loop',
          fix: function(fixer) {
            // @TODO: and use variable names that don't overlap, eventually
            // @TODO: variableBeingLooped === declaration/arg?
            var code = ''
            var varLengthName = ''
            var varLength = ''
            var variableName = 'canada'
            var cacheLengthInLoop = ''
            var bodyTxt = sourceCode.getText(blockWithBraces)
            var assignmentValue = ''
            var bodySplit

            if (typeof(variableBeingLooped) === 'object') {
              assignmentValue = sourceCode.getText(variableBeingLooped)

              // @TODO: do deeper analysis of variableBeingLooped
              // var variableName = 'canada'

              code += 'let ' + variableName + ' = ' + assignmentValue + ';\n'
              variableBeingLooped = variableName
            } else {
              variableName = variableBeingLooped
            }

            configuration = 'cache-length'
            if (configuration === 'cache-length') {
              varLengthName = 'len' // variableName + 'Len'
              varLength = varLengthName
              cacheLengthInLoop = ', ' + varLengthName + ' = ' + variableName + '.length'

              // @TODO: as another config option?
              // code += 'let ' + varLengthName + ' = ' + variableName + '.length; \n'

            } else {
              varLength = variableBeingLooped + '.length'
            }

            // var body = txt.replace(new RegExp(firstFnParamName, 'g'), variableBeingLooped + '[i]')
            var body = replaceDeclarationIfNeeded(bodyTxt, firstFnParamName, variableBeingLooped, null, secondFnParamName)
            bodySplit = loopVariableDefinedInBlock(variableBeingLooped, firstFnParamName, null, body, false, secondFnParamName)

            code += 'for (let '
            code += secondFnParamName
            code += '= 0'
            code += cacheLengthInLoop + '; '
            code += secondFnParamName + ' < '
            code += varLength + '; '
            code += secondFnParamName + '++) '
            code += bodySplit

            var fixed = fixer.replaceTextRange([node.start, node.end], code)
            if (isTest) console.log(fixed.text)
            return fixed
          },
        }) // report

      }, // ExpressionStatement
    }
  }, // create
}
