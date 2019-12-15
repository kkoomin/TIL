// save package to a variable
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// config
module.exports = {
  // properties
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"), // why it doesn't work when I type "dist/js" just as followed the lecture?
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
    // specify the folder from which webpack should server our files(= where the final code located)
  },
  plugins: [
    // ^ receives an array of all the plugins we're using
    new HtmlWebpackPlugin({
      // ^ like a function constructor
      // ^ it passes options using an object({})
      filename: "index.html", // final html file
      template: "./src/index.html" // starting html file
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, //test all the js file
        exclude: /node_module/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

// webpack automatically inject js file into html file when it bundles everything together
// if I do `npm run dev`, it creates final 'bundle.js' file (which is what we config file name in webpack.config.js file) and 'index.html' file in 'dist' folder.
