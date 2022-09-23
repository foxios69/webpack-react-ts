import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv';
import { DefinePlugin } from 'webpack';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  // The mode field tells Webpack whether the app needs to be bundled for production or development
  mode: 'development',
  // The output.public field tells Webpack what the root path is in the app
  output: {
    publicPath: '/',
  },
  // The entry field tells Webpack where to start looking for modules to bundle
  entry: './src/index.tsx',
  // The module field tells Webpack how different modules will be treated
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(scss|css)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // The resolve.extensions field tells Webpack what file types to look for in which order during module resolution
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    // creates the HTML file
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    //  allow modules to be updated while an application is running, without a full reload
    new HotModuleReplacementPlugin(),
    // enable the Webpack process to type check the code
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // allow use next extensions
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx'],
    }),
    // allow use css, scss
    new MiniCssExtractPlugin(),
    // allow use .env variables
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
  // allows to debug the original code before transpilation
  devtool: 'inline-source-map',
  devServer: {
    //  the root of the webserver is the build folder
    static: path.join(__dirname, 'build'),
    //  necessary for deep links to work in multi-page apps
    historyApiFallback: true,
    // serve files on port
    port: 4000,
    open: true,
    hot: true,
  },
};

export default config;
