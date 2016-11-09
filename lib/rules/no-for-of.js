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
       *
       *
       */
      'ForOfStatement': function(node) {
        var prop = node.left.name
        var declarations = node.left.declarations[0].id.name
        var obj = node.right.name
        var bodyNode = node.body
        var bodyTxt = sourceCode.getText(bodyNode)
        var body = bodyTxt.replace(obj, prop + '[i]')

        context.report({
          node: node,
          message: 'no for of loop',
          fix: function(fixer) {
            var code = ''
            var variableName = declarations + 'Keys'
            var varLengthName = variableName + 'Len'
            var cacheLengthInLoop = ''

            cacheLengthInLoop = ', ' + varLengthName + ' = ' + variableName + '.length'
            code += 'let ' + variableName + ' = ' + obj + ';\n'
            code += 'for (let i = 0' + cacheLengthInLoop + '; i < ' + varLengthName + '; i++) ' + body

            var fixed = fixer.replaceTextRange([node.start, node.end], code)
            console.log(fixed.text)
            return fixed
          }
        }) // report

      }
    }
  }
}
