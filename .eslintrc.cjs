/*
 * @Author: Carlos
 * @Date: 2022-12-31 14:09:48
 * @LastEditTime: 2022-12-31 14:34:17
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
        'no-explicit-any': 0,
        'react/prop-types': 0,
        "react/react-in-jsx-scope": "off",
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-unused-vars': 0,
        "@typescript-eslint/no-explicit-any": 0
    }
}
