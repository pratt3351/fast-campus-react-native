import { GET_NEWS_LIST_FAILURE, GET_NEWS_LIST_REQUEST, GET_NEWS_LIST_SUCCESS, CLIP_NEWS_ITEM, CLIPPED_TAB_FOCUS, CLIP_ITEM_RESET } from "../actions/news"

const defaultNewsReducer = {
    favoriteNews:[],
    newsList:[],
    loading: false,
    isInitFocusTabOnce:false,
}

export const newsReducer = (state = defaultNewsReducer, action)=>{
    switch(action.type){

        case GET_NEWS_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }

        case GET_NEWS_LIST_SUCCESS:{
            return {
                ...state,
                loading:false,
                newsList:action.result.items
            }
        }

        case GET_NEWS_LIST_FAILURE:{
            return {
                ...state,
                loading:false,
            }
        }
        case CLIP_NEWS_ITEM:{
            const hasFavoriteList = state.favoriteNews.filter((item)=> item.link === action.newsItem.link).length > 0;
            if(hasFavoriteList){

                return {
                    ...state,
                    favoriteNews:state.favoriteNews.filter((item)=> item.link !== action.newsItem.link)
                }
            }

            return {
                ...state,
                favoriteNews:[...state.favoriteNews, action.newsItem]
            }
        }

        case CLIPPED_TAB_FOCUS:{
            return {
                ...state,
                isInitFocusTabOnce: true,
            }
        }

        case CLIP_ITEM_RESET:{
            return {
                ...state,
                favoriteNews: action.savedItems
            }
        }

    }
    return {
        ...state
    }
}