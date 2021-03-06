const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

exports.loadJavaScript =({ include, exclude } = {} ) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.loadImages = ({ include, exclude, options } = {} ) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,

          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              webp: {
                quality: 75
              },
            },
          }
        ]
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: "[name].css",
  });
  return {
    module: {
      rules : [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: "style-loader",
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    port,
    open: true,
    overlay: true,
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
