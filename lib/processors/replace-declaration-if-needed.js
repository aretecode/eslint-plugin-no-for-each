/**
 * @TODO:
 * - [ ] only with config
 * - [ ] or comment above
 * - [ ] if using loop-variable-in-block, don't replace
 *
 * @param  {String} bodyTxt
 * @param  {String} declaration
 * @param  {String} iteratee
 * @param  {?String} [variableName] if it is an object
 * @return {String}
 */
module.exports = function(bodyTxt, declaration, iteratee, variableName = null) {
  // if it is a one liner, don't add it
  if (!bodyTxt.includes('{')) {
    var replaceWith = iteratee + '[i]'
    if (variableName) {
      replaceWith = iteratee + '[' + variableName + '[i]' + ']'
    }

    return bodyTxt.replace(declaration, replaceWith)
  }

  return bodyTxt
}
