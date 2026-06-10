const js = require("@eslint/js");
const globals = require("globals");
const parser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
    ...js.configs.recommended,
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules,
    },
  },
];
