const defaultNewsReducer = {
    favoriteNews:[],
    newsList:[]
}

export const newsReducer = (state=defaultNewsReducer, action)=>{
    return {
        ...state,
    }
}