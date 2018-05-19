const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    index: './index.js',
    load: './load.js',
    vendors: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-resource/angular-resource.js',
      './node_modules/angular-sanitize/angular-sanitize.min.js',
      './node_modules/angular-translate/dist/angular-translate.js'
    ],
    app: [
      './app.js',
      './services.js',
      './controllers/application.js'
    ] 
  },
  output: {
    path: path.resolve(__dirname, '.dist'),
    publicPath: '.dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: [{
          loader: "json-loader"
        }]
      },
      {
        test: /\.(css)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new CleanWebpackPlugin(['.dist']),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      {
        from: 'index.html',
        to: '../.dist'
      },
      {
        from: 'home.html',
        to: '../.dist'
      }
    ])
  ]
};

module.exports = config;
