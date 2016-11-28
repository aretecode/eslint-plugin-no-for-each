module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'use length in for loop',
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

    return {
      /**
       * @example: valid:
       * #1 for
       * #2 (
       * #3   let i = 0,
       * #3.1 len = eh.length;
       * #4 i
       * #5 <
       * #6 len;
       * #7 i++
       * #2 )
       * #8 {
       * #9 console.log(eh[i])
       * #8 }
       *
       *
       * @key
       * #3 is   `init`   VariableDeclaration
       * #4-6 is `test`   BinaryExpression
       * #7 is   'update' UpdateExpression
       *
       * @example: fixable:
       * #1 for
       * #2 (
       * #3 let i = 0;
       * #4 i
       * #5 <
       * #6.0 eh
       * #6.1 .length;
       * #7 i++
       * #2 )
       * #8 {
       * #9 console.log(eh[i])
       * #8 }
       *
       *
       */
      'ForStatement': function(node) {
        // #3
        var variableDeclaration = node.init

        // if two variables are defined on the left
        // if (variableDeclaration.declarations.length > 1) return

        // #4-6
        var test = node.test
        // safety
        if (!test) return

        // #6
        var testRight = node.test.right
        // safety
        if (!testRight) return
        // #6 has to have .length for it to be invalid
        if (testRight.type !== 'MemberExpression') return

        var property = testRight.property
        // safety
        if (!property) return
        // #6.1 has to have .length for it to be invalid
        if (property.name !== 'length') return

        // #6.0
        var obj = testRight.object
        // safety
        if (!obj) return

        // give error report and fix
        context.report({
          node: node,
          message: 'cache length in for loop',
          fix: function(fixer) {
            var nodeText = sourceCode.getText(node)
            var declarationText = sourceCode.getText(variableDeclaration)
            var rightText = sourceCode.getText(testRight)
            var objText = sourceCode.getText(obj)

            var code = declarationText + ', len = ' + objText
            var fixedDeclaration = fixer.replaceTextRange([variableDeclaration.start, variableDeclaration.end], code)
            var fixedRight = rightText.replace(rightText, 'len')

            var replaced = nodeText
              .replace(declarationText, fixedDeclaration.text)
              .replace(rightText, fixedRight)

            var fixedFull = fixer.replaceTextRange([node.start, node.end], replaced)
            console.log(fixedFull.text)
            return fixedFull
          },
        })
      },

    }
  },
}
