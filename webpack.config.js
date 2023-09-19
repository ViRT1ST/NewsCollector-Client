const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = (env) => {

  const { mode } = env; // 'development' or 'production';

  /* ====================================================== */
  /*   Project Settings                                     */
  /* ====================================================== */

  const distBundleFilename = 'bundle.js';
  const distBundlePath = `/${distBundleFilename}`;

  const distRootFolder = './dist';
  const distCssFolder = 'css';
  const distImgFolder = 'img';
  const distFontsFolder = 'fonts';

  const projectTitle = 'News Collector';
  const projectMainHtml = './public/index.html';
  const projectMainJS = './src/index.js';
  const metaDateModified = new Date().toISOString();

  const filesToCopy = [
    { from: './public/img', to: './img' },
    { from: './public/favicon.ico', to: './favicon.ico' },
  ];

  const filesToRemove = mode === 'development'
    ? []
    : ['bundle.js.LICENSE.txt'];

  const browserList = [
    '>0.5%',
    'not dead',
    'not op_mini all'
  ];

  /* ====================================================== */
  /*   Selected Mode Settings                               */
  /* ====================================================== */

  const config = {
    development: {
      mode: 'development',
      devtool: 'source-map',
      cssTopLoader: 'style-loader',
      cssPlugin: [],
    },
    production: {
      mode: 'production',
      devtool: false,
      cssTopLoader: MiniCssExtractPlugin.loader,
      cssPlugin: [new MiniCssExtractPlugin({
        filename: `${distCssFolder}/styles-[hash:8].css`
      })]
    }
  };

  /* ====================================================== */
  /*   Final Settings                                       */
  /* ====================================================== */

  return {
    mode: config[mode].mode,
    entry: projectMainJS,

    output: {
      filename: distBundleFilename,
      publicPath: '/'
    },

    devtool: config[mode].devtool,

    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    module: {
      rules: [

        // Babel

        {
          test: /\.(js|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env', {
                    corejs: 3,
                    useBuiltIns: 'usage',
                    debug: true,
                    modules: false,
                    targets: browserList
                  }
                ],
                '@babel/react'
              ]
            }
          }
        },

        // Loading CSS

        {
          test: /\.css$/,
          use: [
            config[mode].cssTopLoader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
          ]
        },

        // Loading SASS

        {
          test: /\.(scss|sass)$/,
          use: [
            config[mode].cssTopLoader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'expanded'
                }
              }
            }
          ]
        },

        // Loading images

        {
          test: /\.(png|jpeg|jpe|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: distImgFolder,
                name: '[name].[ext]',
              }
            }
          ]
        },

        // Loading fonts

        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: distFontsFolder,
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },

    plugins: [
      ...config[mode].cssPlugin,

      new CopyPlugin({
        patterns: filesToCopy
      }),

      new HtmlWebpackPlugin({
        template: projectMainHtml,
        injectTitle: projectTitle,
        injectDateNow: metaDateModified,
        injectBundlePath: distBundlePath,
        minify: false,
        inject: false
      }),

      new RemovePlugin({
        after: {
          root: distRootFolder,
          include: filesToRemove
        }
      })
    ],

    devServer: {
      historyApiFallback: true,
      open: true,
    }
  };
};

