/*
 * @Author: Carlos
 * @Date: 2022-12-31 14:09:48
 * @LastEditTime: 2022-12-31 14:19:07
 * @FilePath: /vite-react-swc/.eslintrc.cjs
 * @Description: 
 */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    }
}
