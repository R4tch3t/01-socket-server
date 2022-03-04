import React, { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext({});

const initialState = {
    id: 0,
    uuid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}

 const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState(initialState)
    const login = (email:any, password:any) => {

    }

    const signup = (nombre:any, email:any, password:any) => {

    }

    const verificaToken = useCallback( ()=>{

    }, []);

    const logout = () => {

    }

    return (
            <AuthContext.Provider  value={{
                auth,
                login,
                signup,
                verificaToken,
                logout
            }} >
                { children }
            </AuthContext.Provider>
    )
}
export default AuthProvider
export function useAppContext() {
    return useContext(AuthContext);
}