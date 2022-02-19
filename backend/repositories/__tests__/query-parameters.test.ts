import { convertQueryParameters } from "../helpers/query-parameters";
import { Op } from "sequelize";

test("empty parameters transform", () => {
	expect(convertQueryParameters({})).toStrictEqual({});
});

test("undefined parameters transform", () => {
	expect(convertQueryParameters()).toStrictEqual({});
});

test.each([
	[{ filters: [{ column: "name", value: "John" }] }, {
		where: {
			name: {
				[Op.eq]: "John",
			}
		}
	}],
	[{ filters: [{ column: "firstName", value: "John" }, { column: "lastName", value: "Snow" }] }, {
		where: {
			firstName: {
				[Op.eq]: "John",
			},
			lastName: {
				[Op.eq]: "Snow",
			}
		}
	}]
])("filter parameters transform", (input, expected) => {
	expect(convertQueryParameters(input)).toStrictEqual(expected);
});

test("pagination parameters transform", () => {
	expect(convertQueryParameters({
		pagination: {
			offset: 50,
			limit: 10,
		}
	})).toStrictEqual({
		offset: 50,
		limit: 10,
	});
});

test("sort parameters transform", () => {
	expect(convertQueryParameters({
		sort: [{ column: "firstName", direction: "asc" }, { column: "lastName", direction: "desc" }],
	})).toStrictEqual({
		order: [["firstName", "asc"], ["lastName", "desc"]],
	});
});