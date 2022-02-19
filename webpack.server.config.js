const path = require("path");
const nodeExternals = require("webpack-node-externals");

process.traceDeprecation = true;

module.exports = () => {
	return {
		entry: "./backend/index.ts",
		target: "node",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		externals: [nodeExternals()],
		devtool: "source-map",
		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "dist/server"),
		},
	}
};