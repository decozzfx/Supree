module.exports = {
  env: {
    "jest/globals": true,
  },
  root: true,
  extends: [
    "@react-native",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "@react-native-community",
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:react-prefer-function-component/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["plugins/**/*", "metro.config.js"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: ".",
    project: ["./tsconfig.json"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
      typescript: {},
    },
    react: {
      version: "18.x",
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": [
      "error",
      { additionalHooks: "(useMemoOne)" },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "global-require": 0,
    "react-hooks/exhaustive-deps": "off",
    quotes: ["error", "single"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/require-default-props": ["error"],
    "react/default-props-match-prop-types": ["error"],
    "react/sort-prop-types": ["error"],
    "react/no-array-index-key": "off",
    "no-tabs": "off",
    "no-void": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/display-name": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        endOfLine: "lf",
        tabWidth: 2,
        indentStyle: "space",
        useTabs: true,
        arrowParens: "avoid",
        bracketSameLine: false,
        singleQuote: true,
        trailingComma: "all",
      },
    ],
  },
};
