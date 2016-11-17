module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  //extends: 'airbnb-base',
  extends: 'vue',
  // required to lint *.vue files
  plugins: [
    'html','pug'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // Customize
    'comma-dangle': ["error", "always-multiline"],
    'semi': ["error","always"],
    'space-before-function-paren': ["error", "never"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
