import js from '@eslint/js'
import globals from 'globals'
import typescriptParser from '@typescript-eslint/parser'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import eslintPrettierPlugin from 'eslint-plugin-prettier'
import eslintUnusedImportsPlugin from 'eslint-plugin-unused-imports'
import importPlugin from 'eslint-plugin-import'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', 'src/env.mjs'],
    ignores: ['dist/*'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
      globals: globals.node,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      prettier: eslintPrettierPlugin,
      'unused-imports': eslintUnusedImportsPlugin,
      import: importPlugin,
    },
    rules: {
      // general
      'no-trailing-spaces': 'error',
      'quote-props': ['error', 'as-needed'],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'eol-last': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-multi-spaces': 'error',
      'object-shorthand': 'error',

      // @typescript-eslint/recommended-type-checked rule set
      ...tsEslintPlugin.configs['recommended-type-checked'].rules,

      // prettier
      'prettier/prettier': 'error',

      // unused-imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',

      // consistent-type-imports
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
]
