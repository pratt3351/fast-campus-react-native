import { GET_NEWS_LIST_SUCCESS } from "../actions/news"

const defaultNewsReducer = {
    favoriteNews:[],
    newsList:[]
}

export const newsReducer = (state=defaultNewsReducer, action)=>{
    switch(action.type){
        case GET_NEWS_LIST_SUCCESS:{

            return {
                ...state,
                newsList:action.result.items
            }
        }
    }
    return {
        ...state,
    }
}