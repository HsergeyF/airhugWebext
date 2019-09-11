const path = require('path');

module.exports = {
  watch:true,
  entry: [
    './popup/src/scripts/index.js'
  ],

  output: {
    filename: 'popup.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  }
},
            {
                test: /\.css$/,

                loader: 'style-loader!css-loader'
            }
    ]
  }
};
