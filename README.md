# eslint-plugin-no-for-each
What it does? Fix `forEach`, `for in`, and `for of` loops,
- IS A [WIP]

Before:

![image](https://cloud.githubusercontent.com/assets/4022631/20047084/8ed348e0-a465-11e6-90f4-4715f5498699.png)

After:

`['error', 'cache-length']`
![image](https://cloud.githubusercontent.com/assets/4022631/20047228/fa5ed9fc-a466-11e6-87b6-f490be782748.png)

`['error']`

![image](https://cloud.githubusercontent.com/assets/4022631/20047232/ffab29a6-a466-11e6-8dcf-436c40d97757.png)

# Perf 
![image](https://cloud.githubusercontent.com/assets/4022631/20155307/1dbdd842-a680-11e6-8173-0ffe995f1cae.png)

# Resources
- https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/
- https://github.com/airbnb/javascript/issues/851
- https://insideops.wordpress.com/2015/12/08/creating-custom-rules-for-eslint/
- https://medium.com/tumblbug-engineering/creating-an-eslint-plugin-87f1cb42767f#.z5t30ge87
- http://stackoverflow.com/questions/34130718/how-to-create-customized-eslint-rules/34186003
- http://stackoverflow.com/questions/38278273/eslint-code-vs-whitespace-values-for-fixable
- https://github.com/eslint/eslint/commit/a9a4652b2ce92858d90243e7bb8693f458a14783
- https://github.com/facebookincubator/create-react-app/issues/272
- https://github.com/facebookincubator/create-react-app/issues/274
- https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-equals-spacing.js#L18
- https://github.com/jfmengels/eslint-rule-documentation/blob/master/contributing.md
- https://github.com/Gillespie59/eslint-plugin-angular
- http://eslint.org/docs/developer-guide/working-with-rules
- http://eslint.org/blog/2016/07/eslint-new-rule-format
- http://eslint.org/docs/developer-guide/working-with-rules-new
- https://github.com/buildo/eslint-plugin-no-loops (had no fixing, was no loops in general)
- https://github.com/airbnb/javascript#iterators--nope
- https://www.paypal-engineering.com/2014/12/12/maintaining-javascript-code-quality-with-eslint/
- https://jsperf.com/foreach-vs-reduce-vs-for-loop

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-for-each`:

```
$ npm install eslint-plugin-no-for-each --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-for-each` globally.

## Usage

Add `no-for-each` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-for-each"
    ]
}
```


Then configure the rules you want to use under the rules section.

- default: `2` or `['error']`
- cache-length: `['error', 'cache-length']`

```json
{
    "rules": {
        "no-for-each/no-for-each": 2
    }
}
```


# @NOTES:
---
could keep option `cache-length`
but since we are using an object,
seems silly to call object.keys 2x
---
we do not use body.body because
- 1) not always there
- 2) we want to keep curly braces (or lack of from the source
----

# @TODO:
- [ ] add config option for `cache-length-inside-loop` (var i = 0, len = varName.length; ...)
- [ ] recommend let => const rule
- [ ] add large js files to test failed fixing & safety
- [ ] fix eslint parsing `of`
- [ ] clean up, publish, link to issues related to this in #resources
- [ ] isDev | isTest helper funcs
- [ ] ^ add args in tests for `devtest`
