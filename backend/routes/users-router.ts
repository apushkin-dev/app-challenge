import { Router } from "express";
import { services } from "../services";
import { ParametersError } from "../errors";
import { parseNumber } from "./helpers/parse-number";

const usersRouter = Router();

usersRouter.post("/create", async function (req, res, next) {
	try {
		const { username, password, role } = req.body;

		if (!username || !password) {
			throw new ParametersError("Username and password are mandatory.");
		}

		const user = await services.users.create(username, password, role ? parseNumber(role) : undefined);

		res.send(user);
	} catch(err) {
		next(err)
	}
});

export { usersRouter };