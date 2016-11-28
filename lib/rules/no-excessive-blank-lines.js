var configPercents = ['50%', '60%', '70%', '80%', '90%']

module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'no excessive blank lines',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        enum: ['always', 'never'].concat(configPercents),
      },
    ],
  },

  // the rule creator function
  create: function(context) {
    var report = false
    var sourceCode = context.getSourceCode()
    var configuration = context.options[0]
    var totalLines = sourceCode.lines.length
    var emptyLines = 0

    // go through total lines
    // if it is '', increment emptyLines
    for (var i = 0; i < totalLines; i++) {
      if (sourceCode.lines[i] === '') emptyLines++
    }

    // cannot divide by 0
    if (totalLines === 0) return

    var ratio = emptyLines / totalLines

    if (configPercents.includes(configuration)) {
      // remove the % sign
      // divide by 100 to get the ratio, e.g., 50% => 0.5
      var dec = configPercents.replace('%') / 100
      if (ratio > dec) report = true
    }
    else if (ratio > 0.6) report = true

    return {
      "Program": function(node) {
        if (report) {
          // replace all empty lines
          var txt = sourceCode.getText(node).replace(/^\s*[\r\n]/gm, '')

          context.report({
            node: node,
            message: 'no excessive blank lines',
            fix: function(fixer) {
              var fixed = fixer.replaceTextRange([node.start, node.end], txt)
              console.log(fixed.text)
              return fixed
            },
          })
        }
      },
    }
  },
}
