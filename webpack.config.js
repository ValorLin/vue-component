var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractor = ExtractTextPlugin.extract("css?sourceMap!postcss");
var lessExtractor = ExtractTextPlugin.extract("css?sourceMap!postcss!less?sourceMap");

module.exports = {
    devtool: '#eval',
    entry: {
        'index': path.join(__dirname, 'examples/index.js')
    },
    output: {
        path: path.join(__dirname, 'examples', 'dist'),
        publicPath: '/examples/dist/',
        filename: "[name]-bundle.js"
    },
    resolve: {
        modulesDirectories: ['.', 'node_modules']
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            loader: cssExtractor
        }, {
            test: /\.less$/,
            loader: lessExtractor
        }, {
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=images%2F[name].[ext]'
        }]
    },
    postcss: [autoprefixer({browsers: ['last 2 versions', 'Android 2.3']})],
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("examples/[name].css")
    ]
};
