import { ADD_COUNT, DELETE_COUNT } from "../actions/counter"

export const initialState = {
    count:0,
}

export const countReducer = (state=initialState, action)=>{
    switch(action.type){
        case ADD_COUNT:
            return {
                ...state,
                count : state.count + 1
            }
        case DELETE_COUNT:
            return {
                ...state,
                count: state.count -1
            }
    }
    return {
        ...state
    }
}