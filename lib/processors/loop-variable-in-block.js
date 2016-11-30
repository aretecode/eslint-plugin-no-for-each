/**
 * @TODO: use config for this
 *
 * @param  {String} variableName
 * @param  {?String} prop (name)
 * @param  {String} obj (value) (if this is null, is not an obj)
 * @param  {String} body
 * @return {String}
 */
module.exports = function(variableName, prop, obj, body, isObject = false, index = 'i') {
  // if it is a one liner, don't add it
  if (!body.includes('{')) {
    return body
  }

  var property = prop + '[' + index + ']'
  var val = '\n' + 'const ' + prop + ' = '
  // eg. const key = keys[keyKeys['+index+']]
  if (obj && isObject) {
    val += obj + '[' + variableName + '[' + index + ']' + ']'
  } else if (obj && !isObject) {
    val += variableName + '[' + index + ']'
  } else {
    val += variableName + '[' + index + ']'
  }
  if (isObject) {
    val = 'var ' + prop + ' = ' + variableName + '[' + index + ']' + '\n'
    val += 'var ' + 'value' + ' = ' + obj + '[' + variableName + '[' + index + ']' + ']'
  }

  // e.g. keys: [0] = `{`, val = `key = keys[keyKeys[i]]`, [0] = '...rest of body }'
  // e.g. `{` + `key = keys[keyKeys[i]]` + `\n console.log(key) \n}`

  // to add variable definition at beginning
  // since we know from at the beginning we have an opening bracket
  // .replace only replaces the first instance of it without a regex
  // so we just replace it and add it back in
  return '{\n' + val + '\n' + body.replace('{', '')
}
