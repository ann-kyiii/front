module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["tsconfig.json"]
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "@typescript-eslint/prefer-interface": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    "react/prop-types": "off",
    "spaced-comment": ["error", "always", { markers: ["/ <reference"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-named-as-default": "off",
    "react/function-component-definition": "off",
    "no-restricted-exports": "off",
    // React 17からReactのimportが必要なくなったため
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // defaultPropsがReact 18から非推奨になるためデフォルト引数の形を受け入れる
    "react/require-default-props": ["error", { functions: "defaultArguments" }],
    // トグルボタンでlabelタグの中にinputタグを入れないことを許容する
    "jsx-a11y/label-has-associated-control": "off"
  },
};
