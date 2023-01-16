module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx"],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: [
    "**/custom.d.ts",
    "**/amplify/*",
    "**/node_modules",
    "**/build",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow prop-spreading
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-console": "off",
    "no-alert": "off",
  },
};
