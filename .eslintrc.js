const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    '@typescript-eslint/no-empty-interface': [
      'off'
    ],
    '@typescript-eslint/no-non-null-assertion': [
      'warn'
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {'ts-ignore': 'allow-with-description'}
    ],
    '@typescript-eslint/array-type': [
      'warn', {default: 'generic'}
    ],
    'object-curly-spacing': OFF,
    'space-before-function-paren': OFF,
    'no-use-before-define': ERROR,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    'padded-blocks': OFF,
    'vue/multi-word-component-names': OFF,
    'vue/html-closing-bracket-spacing': OFF,
    'vue/html-self-closing': OFF,
    'vue/multiline-html-element-content-newline': OFF,
    'vue/attribute-hyphenation': OFF,
    '@typescript-eslint/no-unused-vars': WARN,
    camelcase: WARN
  }

};
