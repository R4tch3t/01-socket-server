import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchSinToken } from "../helpers/fetch";

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
    const login = async (email:any, password:any) => {
        const resp = await fetchSinToken("login",{email,password},"POST");
        console.log("loginAuthProv");
        console.log(resp)
        if(resp.ok){
            localStorage.setItem("token",resp.token);
            const {usuario} = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        }
        return resp.ok
    }

    const signup = async (nombre:any, email:any, password:any) => {
        const resp = await fetchSinToken("login/new",{nombre,email,password},"POST");
        console.log("registerProv");
        console.log(resp)
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