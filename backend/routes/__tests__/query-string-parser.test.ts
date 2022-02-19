import { parseQueryStringToQueryParameters } from "../helpers/parse-query-string-to-parameters";

test("empty parameters transform", () => {
	expect(parseQueryStringToQueryParameters({})).toStrictEqual({
		pagination: {
			offset: 0,
			limit: 100,
		}
	});
});

test("full parameters transform", () => {
	expect(parseQueryStringToQueryParameters({
		offset: "50",
		limit: "100",
		sort: "+firstName",
		country: "Australia",
	})).toStrictEqual({
		pagination: {
			offset: 50,
			limit: 100,
		},
		sort: [{
			column: "firstName",
			direction: "asc",
		}],
		filters: [{
			column: "country",
			value: "Australia",
		}]
	});
});

test("multiple sort options", () => {
	expect(parseQueryStringToQueryParameters({
		sort: ["+firstName", "-lastName"],
	})).toStrictEqual({
		pagination: {
			offset: 0,
			limit: 100,
		},
		sort: [{
			column: "firstName",
			direction: "asc",
		}, {
			column: "lastName",
			direction: "desc",
		}],
	});
});

test("multiple filters", () => {
	expect(parseQueryStringToQueryParameters({
		firstName: "John",
		lastName: "Snow",
	})).toStrictEqual({
		pagination: {
			offset: 0,
			limit: 100,
		},
		filters: [{
			column: "firstName",
			value: "John",
		}, {
			column: "lastName",
			value: "Snow",
		}],
	});
});



