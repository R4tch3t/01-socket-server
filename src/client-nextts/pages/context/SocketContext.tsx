import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from './chat/ChatContext';
import { types } from '../types/types';

export const SocketContext = createContext({});


export const SocketProvider = ({ children }:any) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:3000');
    const {auth}:any = useAppContext();
    const {dispatch}:any = useChatContext();

    useEffect(()=>{
        if(auth.logged){
            conectarSocket()
        }
    },[auth,conectarSocket]);

    useEffect(()=>{
        if(!auth.logged){
            desconectarSocket()
        }
    },[auth,desconectarSocket]);

    //Escuchar los cambios en los usuarios conectados

    useEffect(()=>{
        socket?.on("getUsuarios",(usuarios:any)=>{
            dispatch({
                type: types.cusuariosCargados,
                payload: usuarios
            })
        })
    },[socket,dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}