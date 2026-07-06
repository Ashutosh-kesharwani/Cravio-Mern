import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  // Files/Folders ESLint should ignore
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "uploads/**",
      "tmp/**",
      ".env",
      "package-lock.json",
    ],
  },

  // Recommended ESLint rules
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Warn for unused variables
      "no-unused-vars": "warn",

      // Error for undefined variables
      "no-undef": "error",

      // Allow console.log in backend
      "no-console": "off",

      // Prefer const over let when possible
      "prefer-const": "warn",

      // Warn for extra semicolons
      "no-extra-semi": "warn",

      // Enforce === instead of ==
      eqeqeq: ["error", "always"],

      // Prevent duplicate imports
      "no-duplicate-imports": "error",
    },
  },

  // Disable ESLint rules that conflict with Prettier
  eslintConfigPrettier,
];
