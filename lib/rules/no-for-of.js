module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'no for of, autofix to normal for loop',
      category: 'Best Practices',
      recommended: false
    },
    schema: [
      {
        enum: ['always', 'never', 'cache-length']
      }
    ]
  },

  create: function(context) {
    var sourceCode = context.getSourceCode()
    var configuration = context.options[0]
    var loopVariableDefinedInBlock = require('../processors/loop-variable-in-block')
    var leftDeclaration = require('../processors/left-declaration')
    var replaceDeclarationIfNeeded = require('../processors/replace-declaration-if-needed')

    return {
      /**
       *
       * @tutorial
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
       * The for...of syntax is specific to collections,
       * rather than all objects.
       * It will iterate in this manner
       * over the elements
       * of any collection that has a
       * [Symbol.iterator] property.
       *
       * @example:
       *
       * @TODO:
       * - [ ] comment a line above like /* eslint-symbol-iterator * /
       * -> to disable linting and give easy documentation
       *
       * - [ ] comment a line above like /* eslint-symbol-iterator-fix * /
       * -> to fix automagically
       *
       * @LATER
       * most commonly used for arrays b/c easy to type
       * - [ ] should do deeper analysis into the previous code in the file
       * -> if it isn't included, not a huge priority though
       *
       * @NOTE:
       * was `body = bodyTxt.replace(obj, declaration + '[i]')`
       * now using len inline, but should as a config
       * variableName + 'Len'
       */
      'ForOfStatement': function(node) {
        var declaration = leftDeclaration(node)
        var obj = node.right.name

        var code = ''
        var variableName = declaration + 'Keys'
        var varLengthName = 'len'
        var cacheLengthInLoop = ', ' + varLengthName + ' = ' + variableName + '.length'

        var bodyTxt = sourceCode.getText(node.body)
        var body = replaceDeclarationIfNeeded(bodyTxt, obj, declaration)
        var bodySplit = loopVariableDefinedInBlock(variableName, declaration, obj, body, false)

        context.report({
          node: node,
          message: 'no for of loop',
          fix: function(fixer) {
            code += 'let ' + variableName + ' = ' + obj + ';\n'
            code += 'for (let i = 0' + cacheLengthInLoop + '; i < ' + varLengthName + '; i++) ' + bodySplit

            var fixed = fixer.replaceTextRange([node.start, node.end], code)
            console.log(fixed.text)
            return fixed
          }
        }) // report

      }
    }
  }
}
