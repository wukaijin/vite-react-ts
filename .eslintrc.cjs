/*
 * @Author: Carlos
 * @Date: 2022-12-31 14:09:48
 * @LastEditTime: 2023-01-05 21:30:23
 * @FilePath: /vite-react-swc/.eslintrc.cjs
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    semi: 0,
    'comma-dangle': 0,
    'no-undef': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'no-continue': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'no-console': 0,
    'no-explicit-any': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'no-trailing-spaces': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'object-curly-newline': 0,
    'no-return-assign': 0,
    'no-unused-expressions': 0,
    'no-empty-pattern': 0,
    'no-confusing-arrow': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 0,
    'react/function-component-definition': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'react/no-unused-class-component-methods': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0
  }
}
