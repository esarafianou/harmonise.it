const pathModule = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = process.env.PORT || 8080

module.exports = {
  entry: './src/frontend/js/app.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
	  {
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	  },
	  {
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
	    loader: 'url-loader?limit=100000'
	  }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ hash: true, title: 'Harmonise.it' }),
  ],
  devServer: {
    historyApiFallback: true,
	port: 3000,
    proxy: {
	  '/api': `http://localhost:${PORT}`
	},
    stats: {
	  colors: true
	}
  },
  output: {
    publicPath: '/',
    path: pathModule.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
}
