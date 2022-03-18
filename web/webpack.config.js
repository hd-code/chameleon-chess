const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", "src"],
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.[jt]sx?$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
