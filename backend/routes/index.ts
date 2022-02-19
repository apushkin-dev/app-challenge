import { Express } from "express";
import basicAuth from "express-basic-auth";
import { clientsRouter } from "./clients-router";
import { usersRouter } from "./users-router";
import { services } from "../services";

export function useRoutes(app: Express) {
	app.use("/api/clients", clientsRouter);
	app.use(
		"/api/users",
		basicAuth({
			authorizer: (username, password, cb) => {
				services.users
					.authenticate(username, password)
					.then(() => cb(null, true))
					.catch(() => cb(null, false));
			},
			authorizeAsync: true,
			challenge: true,
		}),
		usersRouter,
	);
}
