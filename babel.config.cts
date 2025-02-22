module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current", chrome: "58" } }],
    "@babel/preset-typescript",
  ],
};
