import { types } from "../../types/types";

export const chatReducer = (state:any,action:any) => {
    switch(action.type){
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: action.payload
            }
        case types.activarChat:
            return {
                ...state,
                chatActivo: action.payload.id
            }    
        default: 
            return state;
    }
}