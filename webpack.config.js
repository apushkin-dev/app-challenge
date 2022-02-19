const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.traceDeprecation = true;

module.exports = () => {
	return {
		entry: [path.join(__dirname, "frontend/index.tsx"), path.join(__dirname, "frontend/styles/index.scss")],
		devServer: {
			contentBase: path.join(__dirname, "dist/client"),
			proxy: {
				"/api": {
					target: process.env.API_SERVER || "http://localhost:3000",
					changeOrigin: true,
				},
			},
			historyApiFallback: true,
			port: 3001,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					exclude: /node_modules/,
					options: {
						logInfoToStdOut: false,
						logLevel: "info",
					}
				},
				{
					test: /\.js$/,
					loader: "source-map-loader",
					enforce: "pre",
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{ loader: "css-loader" },
						{ loader: "sass-loader" },
					],
				},
			],
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			alias: {
				"react/jsx-runtime": require.resolve("react/jsx-runtime"),
				// "process": require.resolve("process/browser"),
			}
		},
		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "dist/client"),
		},
		devtool: "cheap-module-source-map",
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "frontend/index.html"),
				favicon: path.join(__dirname, "frontend/assets/favicon.png"),
			}),
			new MiniCssExtractPlugin({
				filename: "[name].[chunkhash].css",
				chunkFilename: "[id].[chunkhash].css",
			}),
			new DefinePlugin({
				"process.env.TEST": JSON.stringify(process.env.TEST) // support packages that use process.env.TEST
			}),
		],
	}
};