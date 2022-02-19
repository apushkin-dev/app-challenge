import { Request, Response } from "express-serve-static-core";
import { Express, NextFunction } from "express";
import { EntityNotExistsError } from "./entity-not-exists-error";
import { EntityPropertyNotExistsError } from "./entity-property-not-exists-error";
import { FormatError } from "./format-error";
import { ParametersError } from "./parameters-error";
import { logger } from "../logger";

export {
	EntityNotExistsError,
	EntityPropertyNotExistsError,
	FormatError,
	ParametersError,
}

function apiErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof EntityPropertyNotExistsError || err instanceof FormatError || err instanceof ParametersError) {
		res.status(400);
		res.send({
			details: err.message,
		});

		return;
	}

	if (err instanceof EntityNotExistsError) {
		res.status(404);
		res.send({
			details: err.message,
		});

		return;
	}

	next(err)
}

function defaultErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	logger.write(err);

	res.status(500);
	res.send("Server error");
}

export function useErrors(app: Express) {
	app.use(apiErrorHandler)
	app.use(defaultErrorHandler);
}