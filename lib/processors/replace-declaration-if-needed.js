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
module.exports = function(bodyTxt, declaration, iteratee, variableName = null, index = 'i') {
  // if it is a one liner, don't add it
  if (!bodyTxt.includes('{')) {
    var replaceWith = iteratee + '[' + index + ']'
    if (variableName) {
      replaceWith = iteratee + '[' + variableName + '[' + index + ']' + ']'
    }

    return bodyTxt.replace(new RegExp(declaration, 'g'), replaceWith)
  }

  return bodyTxt
}
