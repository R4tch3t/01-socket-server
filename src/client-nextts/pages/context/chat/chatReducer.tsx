import { types } from "../../types/types";

export const chatReducer = (state:any,action:any) => {
    switch(action.type){
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: action.payload
            }
        case types.activarChat:
            if(state.chatActivo.id===action.payload.id){
                return state
            }
            return {
                ...state,
                chatActivo: action.payload,
                mensajes:[]
            }
        case types.nuevoMensaje:
            if(state.chatActivo.id===action.payload.de||
               state.chatActivo.id===action.payload.para){
                return {
                    ...state,
                    mensajes: [...state.mensajes,action.payload]
                }
            }else{
                return state;
            }
        case types.cargarMensajes:
            return {
                ...state,
                mensajes: action.payload
            }            
        default: 
            return state;
    }
}