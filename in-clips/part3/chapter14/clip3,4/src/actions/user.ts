import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_MY_FEED_LIST_REQUEST = 'GET_MY_FEED_LIST_REQUEST' as const;
export const GET_MY_FEED_LIST_SUCCESS = 'GET_MY_FEED_LIST_SUCCESS' as const;
export const GET_MY_FEED_LIST_FAILURE = 'GET_MY_FEED_LIST_FAILURE' as const;

export const setUserInfo = (userInfo:UserInfo)=>{

    return {
        type: SET_USER_INFO,
        userInfo
    }
}
 
export const getMyFeedListRequest = ()=>{
    return {
        type:GET_MY_FEED_LIST_REQUEST
    }
}

export const getMyFeedListSuccess = (list:FeedInfo[])=>{
    return {
        type:GET_MY_FEED_LIST_SUCCESS,
        list
    }
}

export const getMyFeedListFailure = ()=>{

    return {
        type: GET_MY_FEED_LIST_FAILURE
    }
}

export const signIn = ():UserThunkAction => async (dispatch)=>{
    await sleep(1000);

    dispatch(
        setUserInfo({
            uid:'TEST',
            name:'TEST_NAME',
            profileImage:'PROFILE'
        })
    )

}

export const getMyFeedList = ():UserThunkAction => async (dispatch)=>{
    dispatch(getMyFeedListRequest());

    await sleep(2000);
    dispatch(getMyFeedListSuccess([
        {
            id:'ID_01',
            content:'CONTENT_01',
            writer:'WRITER_01',
            likeCount:10,
            imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
        },{
            id:'ID_02',
            content:'CONTENT_02',
            writer:'WRITER_02',
            likeCount:10,
            imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
        },{
            id:'ID_03',
            content:'CONTENT_03',
            writer:'WRITER_03',
            likeCount:10,
            imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
        }]
    ))
}



export type UserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, UserInfoActions>;
export type TypeUserDispatch = ThunkDispatch<RootReducer, undefined, UserInfoActions>;
export type UserInfoActions =
    | ReturnType<typeof setUserInfo> 
    | ReturnType<typeof getMyFeedListRequest> 
    | ReturnType<typeof getMyFeedListSuccess>
    | ReturnType<typeof getMyFeedListFailure>;