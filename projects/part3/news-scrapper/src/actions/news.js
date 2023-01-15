import { getItem, setItem } from "../utils/AsyncStorageUtils"

export const GET_NEWS_LIST_REQUEST = 'GET_NEWS_LIST_REQUEST'
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS'
export const GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE'

export const CLIP_NEWS_ITEM = 'CLIP_NEWS_ITEM'
export const CLIPPED_TAB_FOCUS = 'CLIPPED_TAB_FOCUS'

export const CLIP_ITEM_RESET = 'CLIP_ITEM_RESET'

export const STORAGE_KEY = '@MAIN/NEWS_LIST/FAVORITE'

export const getNewsList = (query)=> (dispatch)=>{
    dispatch({type:GET_NEWS_LIST_REQUEST});

    // client id : FN50aFFI6RpB_wYvcDri
    // client secret : XYjs47B3qo

    // setTimeout(() => {
    //     dispatch({type:GET_NEWS_LIST_SUCCESS})
    // }, 2000);

    fetch(`https://openapi.naver.com/v1/search/news.json?query=${decodeURIComponent(query)}`,
    {
        headers:{
            'X-Naver-Client-Id':'FN50aFFI6RpB_wYvcDri',
            'X-Naver-Client-Secret':'XYjs47B3qo'
        }
    })
    .then((result)=>{
        return result.json();
    })
    .then((result)=>{
        dispatch({type:GET_NEWS_LIST_SUCCESS, result})
    })
    .catch((ex)=>{
        dispatch({type:GET_NEWS_LIST_FAILURE, ex})
    })
}


export const clipNewsItem = (newsItem)=>(dispatch, getState)=>{
    dispatch({
        type:CLIP_NEWS_ITEM,
        newsItem
    })

    const lastFavoriteList = getState().news.favoriteNews;

    console.log(lastFavoriteList);

    setItem(STORAGE_KEY, JSON.stringify(lastFavoriteList));
}

export const clippedTabFocus = ()=> async (dispatch, getState)=>{
    const isInitOnce = getState().news.isInitFocusTabOnce;

    dispatch({
        type:CLIPPED_TAB_FOCUS
    })

    if(isInitOnce){
        return;
    }

    const savedItems = JSON.parse(await getItem(STORAGE_KEY));

    dispatch({
        type:CLIP_ITEM_RESET,
        savedItems,
    })
}