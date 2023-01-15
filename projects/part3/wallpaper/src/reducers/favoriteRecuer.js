import { ACTION_CLICKED_FAVORITE } from "../actions/favorite"

export const initialState = {
    favoriteList:[]
}

export const favoriteListReducer = (state = initialState, action)=>{
    if( action.type === ACTION_CLICKED_FAVORITE){
        const hasItem = state.favoriteList.filter((item)=> item === action.clicked).length > 0

        if(hasItem){
            return {
                ...state,
                favoriteList:state.favoriteList.filter((item)=> item !== action.clicked)
            }
        }

        return {
            ...state,
            favoriteList: state.favoriteList.concat([action.clicked])
        }
    }
    return {
        ...state
    }
}