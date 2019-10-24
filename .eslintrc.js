module.exports = {
  extends: [
    "alloy",
    "alloy/typescript",
    "plugin:mocha/recommended"
  ],
  env: {
    node: true,
    mocha: true
  },
  plugins: [
    "mocha"
  ],
  rules: {
    "mocha/no-mocha-arrows": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "mocha/no-hooks-for-single-case": "off"
  }
};