/**
 * Webpack main configuration file
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 
 */


/**
 * optimize (compress) all images using imagemin
 */
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


/**
 * copy from src to dist
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ESLintPlugin = require('eslint-webpack-plugin');


const toml = require('toml')
const json5 = require('json5')
const yaml = require('yamljs')

const environment = require('./config/environment');



module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'scripts', 'app.ts'),
  },
  output: {
    filename: 'index_bundle.js',
    path: environment.paths.output,
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,

        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        },
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { targets: "defaults" }]
                ]
            }
        }
      },
      
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        loader: 'file-loader',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },

  

  resolve: {

  },

  plugins: [new HtmlWebpackPlugin({
    hash: true,
    template: './src/index.html',
    file: './dist/index.html',
    title: "Title of App",
    scriptLoading: 'defer',
  }), new CopyWebpackPlugin({
      patterns: [
        { from: "src", to: "dist" },
      ],
  }), new ESLintPlugin()],

  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    modules: [__dirname, "src", 'node_modules']
    /*
    alias: {
      @components: path.resolve(__dirname, 'components/'),
      @partials: path.resolve(__dirname, 'partials/'),
    },
    */
  },
  
  target: 'web',
};