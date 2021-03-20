module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: ["error", 2, { SwitchCase: 1, offsetTernaryExpressions: true }],
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
  },
};
