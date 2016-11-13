module.exports = function(node) {
  if (!node.left) return null

  // eg for (eh in/of canada)
  var declaration = node.left.name

  // eg for (var eh in/of canada)
  if (!declaration) {
    if (node.left.declarations && node.left.declarations[0]) {
      declaration = node.left.declarations[0].id.name
    }
  }

  return declaration
}
