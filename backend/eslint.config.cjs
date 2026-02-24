const tseslint = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')

module.exports = [
  {
    files: ['src/**/*.ts'],
    languageOptions: { parser },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
]
