// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const path = require("path");

module.exports = {
  entry: "./lib/index.ts", // Entry file for your TypeScript code
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "react-elvis",
    libraryTarget: "umd",
    globalObject: "this",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/, // Handle JavaScript/JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"], // Resolve extensions for TypeScript and JavaScript files
  },
};
