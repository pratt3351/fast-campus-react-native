import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import { Platform, SnapshotViewIOS } from "react-native";


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

    // await sleep(2000)

    // dispatch(
    //     getFeedListSuccess([{
    //         id:'ID_01',
    //         content:'CONTENT_01',
    //         writer:{uid:'A',name:''},
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         createdAt:new Date().getTime()
    //     },{
    //         id:'ID_02',
    //         content:'CONTENT_02',
    //         writer:{uid:'A',name:''},
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         createdAt:new Date().getTime()
    //     },{
    //         id:'ID_03',
    //         content:'CONTENT_03',
    //         writer:{uid:'A',name:''},
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         createdAt:new Date().getTime()
    //     }]
    // ))
    try{
        const lastFeedList = await  database().ref(`/feed`).once('value').then((snapshot)=> snapshot.val())
    
        console.log('al', lastFeedList)
        const result = Object.keys(lastFeedList).map((key)=>{
            return {
                ...lastFeedList[key],
                id:key,
            }
        })
        console.log(result);

        dispatch(getFeedListSuccess(result));

    }catch(ex){
        console.log(ex);

    }

}

export const createFeed = (item:Omit<FeedInfo, 'id'|'writer'|'likeCount'|'createdAt'>):FeedListThunkAction => async (dispatch, getState)=>{
    dispatch(createFeedRequest());

    const pickPhotoUrlList = item.imageUrl.split('/');
    const pickPhotoFileName = pickPhotoUrlList[pickPhotoUrlList.length-1];

    const putFileUrl = await storage().ref(pickPhotoFileName)
                            .putFile(Platform.OS ==='ios' ? item.imageUrl.replace('file://', '') : item.imageUrl)
                            .then((result)=> storage().ref(result.metadata.fullPath).getDownloadURL())

    const createdAt = new Date().getTime();

    const feedDB = database().ref(`/feed`);
    const saveItem:Omit<FeedInfo, 'id'> = {
        content:item.content,
        writer:{
            name:getState().userInfo.userInfo?.name ?? 'Unkown',
            uid:getState().userInfo.userInfo?.uid ?? 'Unknown',
        },
        imageUrl:putFileUrl,
        likeCount:0,
        createdAt
    }

    await feedDB.push().set({
        ...saveItem,
 
    });
    const lastFeedList = await feedDB.once('value').then((snapshot)=> snapshot.val())


    // let id = '';
    Object.keys(lastFeedList).forEach((key)=>{
        
        const item = lastFeedList[key];
        if(item.createdAt === createdAt && putFileUrl === item.imageUrl){
            // 생성된아이
            // id = key;
            dispatch(
                createFeedSuccess({
                    id:key,
                    content:item.content,
                    writer:item.writer,
                    imageUrl:item.imageUrl,
                    likeCount:item.likeCount,
                    createdAt
                })
            )
        }
    })
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
