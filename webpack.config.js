const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";
const hotReload = process.env.HOT_RELOAD === "true";

module.exports = {
  entry: {
    gameday2: "./src/frontend/gameday2/gameday2.js",
    apidocs: "./src/frontend/apidocs/apidocs.js",
    eventwizard: "./src/frontend/eventwizard/eventwizard.tsx",
    liveevent: "./src/frontend/liveevent/liveevent.js",
    zebramotionworks: "./src/frontend/zebramotionworks/zebramotionworks.js",
  },
  output: {
    path: path.resolve(__dirname, "./src/build/javascript"),
    filename: "[name].min.js",
    sourceMapFilename: "[name].min.js.map",
  },
  devServer: {
    static: "./dist",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: hotReload,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: dev ? "eval-cheap-module-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [hotReload && require.resolve("react-refresh/babel")].filter(
            Boolean
          ),
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      React: "react",
    }),
    hotReload && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
