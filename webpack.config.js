const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: {
		polyfill: 'babel-polyfill',
		app: './js/app.js',
	},
	context: path.resolve(__dirname, 'src'),
	devServer: {
		publicPath: '/',
		port: 9000,
		contentBase: path.join(process.cwd(), 'dist'),
		host: 'localhost',
		historyApiFallback: true,
		noInfo: false,
		stats: 'minimal',
		hot: true,
	},
	module: {
		rules: [{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
				test: /\.js$/,
			},
			{
				test: /\.css$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',

						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [precss, autoprefixer],
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				}, ],
			},
			// {
			// 	test: /\.html$/i,
			// 	use: [{
			// 		loader: "file-loader",
			// 		options: {
			// 			name: "[name].[ext]",
			// 		},
			// 	}, ],
			// },
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './style.css'
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new CleanWebpackPlugin(),
		// new CopyPlugin({
		// 	patterns: [{
		// 		context: path.resolve(__dirname, "dist"),
		// 		from: "./src/*.html",
		// 	}, ],
		// }),
	],

	// optimization: {
	// 	minimize: true,
	// 	minimizer: [new HtmlMinimizerPlugin(), ],
	// },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
	},
	mode: 'development',
};