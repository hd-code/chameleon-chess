const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'web', 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false } },
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { configFile: 'tsconfig.web.json' }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules','src'],
  },
  output: {
    filename: 'web.js',
    path: path.resolve(__dirname, 'build'),
  },
};