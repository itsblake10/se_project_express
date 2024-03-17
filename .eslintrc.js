module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
