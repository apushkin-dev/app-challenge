import { Router } from "express";
import { services } from "../services";
import { parseQueryStringToQueryParameters } from "./helpers/parse-query-string-to-parameters";
import { parseNumber } from "./helpers/parse-number";
import {
	ClientAttributes,
	ClientCreationAttributes,
} from "../repositories/entities/client-entity";

const clientsRouter = Router();

clientsRouter.get("/", async function (req, res, next) {
	try {
		const clients = await services.clients.getList(parseQueryStringToQueryParameters<ClientAttributes>(req.query));

		res.send(clients);
	} catch(err) {
		next(err)
	}
});

clientsRouter.get("/:clientId", async function (req, res, next) {
	try {
		const clientId = parseNumber(req.params.clientId);
		const client = await services.clients.get(clientId);

		res.send({
			content: client,
		});
	} catch (err) {
		next(err);
	}
});

clientsRouter.post("/", async function (req, res, next) {
	try {
		const attrs: ClientCreationAttributes = req.body;
		const client = await services.clients.create(attrs);

		res.send({
			content: client,
		});
	} catch(err) {
		next(err);
	}
});

clientsRouter.put("/:clientId", async function (req, res, next) {
	try {
		const clientId = parseNumber(req.params.clientId);
		const attrs: Partial<ClientAttributes> = req.body;
		const client = await services.clients.update(clientId, attrs);

		res.send({
			content: client,
		});
	} catch (err) {
		next(err);
	}
});

clientsRouter.delete("/:clientId", async function (req, res, next) {
	try {
		const clientId = Number(req.params.clientId);
		await services.clients.delete(clientId);

		res.send({
			details: "success",
		});
	} catch (err) {
		next(err);
	}
});

clientsRouter.patch("/:clientId", async function (req, res, next) {
	try {
		const clientId = Number(req.params.clientId);
		const attrs: Partial<ClientAttributes> = req.body;
		const client = await services.clients.update(clientId, attrs);

		res.send({
			content: client,
		});
	} catch (err) {
		next(err);
	}
});

export { clientsRouter };
