module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'no for in, autofix to normal for loop',
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
       * @TODO:
       * - [ ] use getOwnPropertyNames() if commented?
       *
       * @tutorial
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
       *
       *
       * @example:
       *  var triangle = {a:1, b:2, c:3};
       *
       *  function ColoredTriangle() {
       *    this.color = "red";
       *  }
       *
       *  ColoredTriangle.prototype = triangle;
       *
       *  var obj = new ColoredTriangle();
       *
       * #1 for (
       *     var
       * #2   prop
       *     in
       * #3   obj
       *     )
       * #4 {
       *  #5   if (obj.hasOwnProperty(prop)) {
       *  #5     console.log("obj." + prop + " = " + obj[prop]);
       *  #5   }
       * #4 }
       *
       * #1 = node
       * #2 = node.left
       * #3 = node.right
       * #4 = node.body
       * #5 = node.body.body
       *
       * @TODO:
       * - [ ] use getOwnPropertyNames() if commented?
       * - [ ] comment a line above like /* eslint-all-props * /
       * -> or /* eslint-own-props * /
       */
      'ForInStatement': function(node) {

        // eg for (eh in canada)
        var prop = node.left.name

        // eg for (var eh in canada)
        if (!prop) {
          prop = node.left.declarations
          if (prop && prop[0]) {
            prop = prop[0].id.name
          }
        }

        var obj = node.right.name
        var bodyNode = node.body
        var bodyTxt = sourceCode.getText(bodyNode)
        var body = bodyTxt.replace(obj, prop + '[i]')

        context.report({
          node: node,
          message: 'no for in loop',
          fix: function(fixer) {
            var code = ''
            var variableName = prop + 'Keys'
            var varLengthName = variableName + 'Len'
            var cacheLengthInLoop = ''

            cacheLengthInLoop = ', ' + varLengthName + ' = ' + variableName + '.length'
            code += 'let ' + variableName + ' = Object.keys(' + obj + ');\n'
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
