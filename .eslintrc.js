module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
