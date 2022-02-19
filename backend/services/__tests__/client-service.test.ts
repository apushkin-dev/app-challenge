import { mocked } from "ts-jest/utils";
import { repositories } from "../../repositories";
import { logger } from "../../logger";

import { ClientsService } from "../clients-service";
import { ClientCreationAttributes } from "../../repositories/entities/client-entity";

jest.mock("../../repositories");
jest.mock("../../logger");

const mockedRepositories = mocked(repositories, true);
const mockedLogger = mocked(logger, true);


beforeEach(() => {
	jest.clearAllMocks();
});

test("update invokes repository update method & logs action", async () => {
	const service = new ClientsService();

	await service.update(255, { lastName: "Doe" });

	expect(mockedRepositories.clients.update).toBeCalledWith(255, { lastName: "Doe" });
	expect(mockedLogger.write).toBeCalledWith("Client 255 was updated.");
});

test("create logs information", async () => {
	const service = new ClientsService();
	const clientData: ClientCreationAttributes = {
		firstName: "",
		lastName: "",
		city: "",
		country: "",
		email: "",
		isActive: true,
		phone: "",
		postalCode: "",
		street: "",
	};

	mockedRepositories.clients.create.mockImplementation(async () => ({
		id: 128,
		...clientData,
	}));

	await service.create(clientData);

	expect(mockedLogger.write).toBeCalledWith("Client 128 was created.");
});