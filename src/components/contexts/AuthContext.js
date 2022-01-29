import React, { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getJSONCookie, saveJSONCookie } from "../../helpers/storage-helper";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [auth, setAuth] = useState(() => {
		const auth = getJSONCookie("auth");

		return !!auth && Object.keys(auth).length > 1 ? auth : null;
	});

	useEffect(() => {
		if (!!auth && Object.keys(auth).length > 1) saveJSONCookie("auth", auth);
		else deleteCookie(auth);
	}, [auth]);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
