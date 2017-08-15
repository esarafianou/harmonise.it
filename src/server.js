import path from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { schema } from './api/schema'

const APP_PORT = 3000;
const API_PORT = 8080;

const apiServer = express()
const graphqlHttpConfig = (schema) => ({ schema, pretty: true, graphiql: true })
apiServer.use('/api', graphQLHTTP(graphqlHttpConfig(schema)))
apiServer.listen(API_PORT, () =>
  console.log(`web server running on port ${API_PORT}`))

// Serve the Relay app
const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'frontend', 'js', 'app.js')],
  module: {
    loaders: [
      {   
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
				query: {
					passPerPreset: true,
					presets: [ 'react', 'es2015', 'stage-0'] 
				} 
      },  
    ],  
  },
  output: {filename: 'app.js', path: '/'},
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/api': `http://localhost:${API_PORT}`},
  publicPath: '/frontend/js/',
  stats: {colors: true},
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
})
