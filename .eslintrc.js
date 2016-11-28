module.exports = {
  'parser': 'babel-eslint',
  'extends': 'eslint:recommended',
  'globals': {
    'G': false,
    'beforeEach': true,
    'before': true,
    'after': true,
    'afterEach': true,
    'describe': true,
    'it': true,
    'context': true,
    'debug': true,
    'require': true,
    'console': true,
    'process': true,
    'module': true,
  },
  'rules': {
    // syntax prefs ---

    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'keyword-spacing': [
      2,
      {
        'before': true,
        'after': true,
      },
    ],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    'no-underscore-dangle': 0,
    'curly': 0,
    'no-multi-spaces': 0,
    'semi': ['error', 'never'],

    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'never',
    ],
    'space-infix-ops': ['error', {'int32Hint': false}],
    'camelcase': 0,
    'new-cap': 0,
    'no-spaced-func': 2,
    'semi-spacing': 2,
    'key-spacing': [2],
    'indent': ['error', 2],

    // const & spread ---

    // suggest using the spread operator instead of .apply()
    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': true,
    }],

    // nananenano/tsk-tsk ---

    'strict': 1,
    'no-mixed-requires': 0,
    'no-process-exit': 0,
    'no-warning-comments': 0,
    'no-alert': 0,
    'no-debugger': 1,
    'no-empty': 2,
    'no-invalid-regexp': 1,
    'no-unused-expressions': 1,
    'no-native-reassign': 1,
    'no-fallthrough': 1,
    'handle-callback-err': 1,
    'no-undef': 2,
    'no-dupe-keys': 2,
    'no-empty-character-class': 2,
    'no-self-compare': 2,
    'valid-typeof': 2,
    'no-unused-vars': 2,
    'handle-callback-err': 2,
    'no-shadow-restricted-names': 2,
    'no-new-require': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-console': 0,
  }
}
