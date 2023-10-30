import React from "react";
import UserProvider from "./UserContext";

const AppContextProvider = ({ children }) => {
	const providers = [UserProvider];

	return providers.reduce(
		(children, Provider) => <Provider>{children}</Provider>,
		children
	);
};

export default AppContextProvider;
