import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const;
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const;
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const;

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST' as const;
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS' as const;
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE' as const;


export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const;
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const;
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const;

export const getFeedListRequest = ()=>{
    return {
        type:GET_FEED_LIST_REQUEST,
    }
}
export const getFeedListSuccess = (list:FeedInfo[])=>{

    return {
        type:GET_FEED_LIST_SUCCESS,
        list
    }
}

export const getFeedListFailure = ()=>{
    return {
        type:GET_FEED_LIST_FAILURE
    }
}

export const createFeedRequest = ()=>{
    return {
        type: CREATE_FEED_REQUEST,
    }
}

export const createFeedSuccess = (item:FeedInfo)=>{
    return {
        type:CREATE_FEED_SUCCESS,
        item:item
    }
}

export const createFeedFailure = ()=>{
    return {
        type: CREATE_FEED_FAILURE
    }
}

export const favoriteFeedRequest = ()=>{
    return {
        type:FAVORITE_FEED_REQUEST
    }
}
export const favoriteFeedSuccess = (feedId:FeedInfo['id'])=>{
    return {
        type:FAVORITE_FEED_SUCCESS,
        feedId,
    }
}

export const favoriteFeedFailure = ()=>{
    return {
        type:FAVORITE_FEED_FAILURE
    }
}

export const getFeedList = ():FeedListThunkAction=> async (dispatch)=>{
    dispatch(getFeedListRequest());

    await sleep(2000)

    dispatch(
        getFeedListSuccess([{
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

export const createFeed = (item:Omit<FeedInfo, 'id'|'writer'|'likeCount'>):FeedListThunkAction => async (dispatch, getState)=>{
    dispatch(createFeedRequest());

    await sleep(2000);
    dispatch(createFeedSuccess({
        id:'ID_001',
        content:item.content,
        writer:getState().userInfo.userInfo?.name ||'Unkown Wirter',
        imageUrl:item.imageUrl,
        likeCount:0,
    }));
}

export const favoriteFeed = (item:FeedInfo):FeedListThunkAction => async (dispatch)=>{
    dispatch(favoriteFeedRequest());

    await sleep(2000);

    dispatch(favoriteFeedSuccess(item.id))
}


export type FeedListThunkAction = ThunkAction<void, RootReducer, undefined, FeedListActions>;
export type TypeFeedListDispatch = ThunkDispatch<RootReducer, undefined, FeedListActions>;
export type FeedListActions = 
    | ReturnType<typeof getFeedListSuccess> 
    | ReturnType<typeof getFeedListRequest>
    | ReturnType<typeof getFeedListFailure>
    | ReturnType<typeof createFeedRequest>
    | ReturnType<typeof createFeedSuccess>
    | ReturnType<typeof createFeedFailure>
    | ReturnType<typeof favoriteFeedRequest>
    | ReturnType<typeof favoriteFeedSuccess>
    | ReturnType<typeof favoriteFeedFailure>
