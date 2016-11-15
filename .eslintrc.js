module.exports = {
  'parser': 'babel-eslint',
  'extends': 'eslint:recommended',
  'rules': {
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'keyword-spacing': [
      2,
      {
        'before': true,
        'after': true
      }
    ],
    'semi': ['error', 'never'],
    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'never',
    ],
    'prefer-const': ['error', {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': false
    }],
    'space-infix-ops': ['error', {'int32Hint': false}],

    'strict': 1,
    'no-underscore-dangle': 0,
    'no-mixed-requires': 0,
    'no-process-exit': 0,
    'no-warning-comments': 0,
    'curly': 0,
    'no-multi-spaces': 0,
    'no-alert': 0,

    'no-empty': 2,
    'no-invalid-regexp': 1,
    'no-unused-expressions': 1,
    'no-native-reassign': 1,
    'no-fallthrough': 1,
    'handle-callback-err': 1,
    'camelcase': 0,

    'no-dupe-keys': 2,
    'no-empty-character-class': 2,
    'no-self-compare': 2,
    'valid-typeof': 2,
    'no-unused-vars': 2,
    'handle-callback-err': 2,
    'no-shadow-restricted-names': 2,
    'no-new-require': 2,
    'no-mixed-spaces-and-tabs': 2,

    'new-cap': 0,
    'no-spaced-func': 2,
    'semi-spacing': 2,
    'key-spacing': [2],
    'indent': ['error', 2],
  }
}
