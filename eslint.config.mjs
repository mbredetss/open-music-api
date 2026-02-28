import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  { files: ['migrations/**/*.js'], rules: { camelcase: 'off' } },
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];