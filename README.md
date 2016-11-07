# eslint-plugin-no-for-each
- fix forEach loops
- IS A [WIP]
- [ ] add large js files to test failed fixing & missing safety

Before: 

![image](https://cloud.githubusercontent.com/assets/4022631/20047084/8ed348e0-a465-11e6-90f4-4715f5498699.png)

After: 

`['error', 'cache-length']` 
![image](https://cloud.githubusercontent.com/assets/4022631/20047228/fa5ed9fc-a466-11e6-87b6-f490be782748.png)

`['error']`

![image](https://cloud.githubusercontent.com/assets/4022631/20047232/ffab29a6-a466-11e6-8dcf-436c40d97757.png)



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
