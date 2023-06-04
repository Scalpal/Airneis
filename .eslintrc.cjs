module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "prettier",
    "next",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  plugins: ["react", "react-hooks"],
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off",
    quotes: ["error", "double"],
    semi: [1, "always"],
    camelcase: "error",
    indent: ["error", 2, {"SwitchCase": 1}],
    "no-unused-vars" : ["error", {"destructuredArrayIgnorePattern": "^_"}]
  },
  settings: { react: { version: "detect" } },
};

