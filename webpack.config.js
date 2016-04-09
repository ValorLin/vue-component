var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractor = ExtractTextPlugin.extract("css?sourceMap!postcss");
var lessExtractor = ExtractTextPlugin.extract("css?sourceMap!postcss!less?sourceMap");

module.exports = {
    devtool: '#eval-sourcemap',
    entry: {
        'vue-component': './index.js',
        'example': './examples/index.js',
        'vuex-example': './examples/vuex-index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ['.', 'node_modules']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/]},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"}
        ]
    },
    babel: {"presets": ["es2015"]},
    postcss: [autoprefixer({browsers: ['last 2 versions', 'Android 2.3']})],
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        //new ExtractTextPlugin("examples/[name].css")
    ]
};
