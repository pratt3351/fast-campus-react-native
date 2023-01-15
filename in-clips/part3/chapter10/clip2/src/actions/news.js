export const GET_NEWS_LIST_REQUEST = 'GET_NEWS_LIST_REQUEST'
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS'
export const GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE'

export const getNewsList = (query) => (dispatch)=>{
    // return dispatch
    dispatch({
        type:GET_NEWS_LIST_REQUEST
    })

    fetch(`https://openapi.naver.com/v1/search/news.json?query=${decodeURIComponent(query)}`, {
        headers:{
            'X-Naver-Client-Id':'axFGLpZlqtpPSgbCdLuS',
            'X-Naver-Client-Secret':'BlYNbyF__7'
        }
    }).then((result)=>{
        return result.json();
    }).then((result)=>{
        console.log(result);
        dispatch({type:GET_NEWS_LIST_SUCCESS, result})
    }).catch((ex)=>{
        dispatch({type:GET_NEWS_LIST_FAILURE})
    })
}