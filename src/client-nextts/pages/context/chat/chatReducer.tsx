import { types } from "../../types/types";

export const chatReducer = (state:any,action:any) => {
    switch(action.type){
        case types.cusuariosCargados:
            return {
                ...state,
                usuarios: action.payload
            }
        default: 
            return state;
    }
}