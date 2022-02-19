import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { useRoutes } from "./routes";
import { repositories } from "./repositories";
import { useErrors } from "./errors";

async function initEnvironment() {
	await repositories.init();
}

(async function () {
	await initEnvironment();

	const app = express();
	const port = 3000;

	app.use(express.static(path.join(__dirname, "../client")));
	app.use(bodyParser.json());

	useRoutes(app);
	useErrors(app);

	app.listen(port, () => {
		console.log(`Application listening at http://localhost:${port}`);
	});
})();
