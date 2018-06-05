const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/client') + '/main.jsx',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
        publicPath: '/public'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test:/\.(s*)css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader', 
                    'sass-loader'
                ]
             }
        ]
    }
};