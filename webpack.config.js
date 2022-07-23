const pathModule = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    mode:"production",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js",
        path:pathModule.resolve(__dirname,"build"),
        assetModuleFilename: 'images/[name][ext]'
    },
    module:{
        rules: [
            // loader for css files
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            //loader for images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
              {
                //loader for sass
                test: /\.s[ac]ss$/i,
                use: [
                  
                  MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
                ],
              },
          ],
    },
    plugins:[new HtmlWebpackPlugin(),new MiniCssExtractPlugin(),
      new CssMinimizerPlugin()
    ],
          optimization: {
            minimizer: [
              
              "...",
              new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                  
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      [ "mozjpeg",{ quality: 60}],
                      ["optipng", { optimizationLevel: 5 }],
                      // Svgo configuration here https://github.com/svg/svgo#configuration
                      [
                        "svgo",
                        {
                              name: 'preset-default',
                              params: {
                                overrides: {
                                
                                  convertShapeToPath: {
                                    convertArcs: true
                                  },
                                  
                                  convertPathData: false
                                }
                              }
                        }
                      ],
                    ],
                  },
                },
              }),
            ],
          }
       
}