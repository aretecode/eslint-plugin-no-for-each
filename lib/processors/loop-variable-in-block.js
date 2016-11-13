/**
 * @TODO: use config for this
 *
 * @param  {String} variableName
 * @param  {?String} prop
 * @param  {String} obj
 * @param  {String} body
 * @return {String}
 */
module.exports = function(variableName, prop, obj, body, isObject = true) {
  // if it is a one liner, don't add it
  if (!body.includes('{')) {
    return body
  }

  // eg. const key = keys[keyKeys[i]]
  var property = prop + '[i]'
  var val = '\n' + 'const ' + prop + ' = ' + obj
  if (isObject) {
    val + '[' + variableName + '[i]' + ']'
  } else {
    val + variableName + '[i]'
  }

  // to add variable definition at beginning
  var openBracket = body.substring(0, 1)

  // split at first open bracket
  var bodySplit = body.split(openBracket)

  // beginning of the body
  var bodyBegin = bodySplit[0]

  // this way we only split at first open bracket
  var bodyEnd = bodySplit.slice(1).join('')

  // if it has curly braces, and first split doesn't include curly brace, add it
  if (bodyEnd.includes('}') && !bodyBegin) {
    bodyBegin = openBracket
  }

  // e.g. keys: [0] = `{`, val = `key = keys[keyKeys[i]]`, [0] = '...rest of body }'
  // e.g. `{` + `key = keys[keyKeys[i]]` + `\n console.log(key) \n}`
  bodySplit = bodyBegin + val + bodySplit[1]

  return bodySplit
}
