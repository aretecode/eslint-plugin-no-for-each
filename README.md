# eslint-plugin-no-for-each
- fix forEach loops
- IS A [WIP]
- [ ] add large js files to test failed fixing & missing safety

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

```json
{
    "rules": {
        "no-for-each/no-for-each": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
