import React from "react";
import { render } from "react-dom";
import { ClientsPage } from "./pages/clients-page";

function App() {
	return <ClientsPage />
}

if (document.getElementById("app")) {
	render(<App />, document.getElementById("app"));
}
