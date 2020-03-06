module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.css$/,
      //   loaders: ["style-loader", "css-loader"],
      // },
      {
        test: /\.(svg|gif|png)$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':custom-src']
          }
        }
      }
    ]
  }
};
