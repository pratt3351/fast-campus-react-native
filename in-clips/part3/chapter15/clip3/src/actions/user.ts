import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

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

export const signIn = (idToken:string):UserThunkAction => async (dispatch)=>{
    // await sleep(1000);

    // dispatch(
    //     setUserInfo({
    //         uid:'TEST',
    //         name:'TEST_NAME',
    //         profileImage:'PROFILE'
    //     })
    // )
    const googleSigninCredential = auth.GoogleAuthProvider.credential(idToken);
    const singinResult = await auth().signInWithCredential(googleSigninCredential);

    const userDB = await database().ref(`/users/${singinResult.user.uid}`);

    const user = await userDB.once('value').then((snapshot)=> snapshot.val())

    const now = new Date().toISOString();

    console.log(singinResult)
    if(user === null){
        await userDB.set({
            name:singinResult.user.displayName,
            profileImage:singinResult.user.photoURL,
            uid:singinResult.user.uid,
            createdAt:now,
            lastLoginAt:now
        })
    }else {
        await userDB.update({
            lastLoginAt:now,
        })
    }

    dispatch(
        setUserInfo({
            uid:singinResult.user.uid,
            name:singinResult.user.displayName ?? 'Unknown Name',
            profileImage:singinResult.user.photoURL ?? '',
        })
    )
}

export const getMyFeedList = ():UserThunkAction => async (dispatch, getState)=>{
    dispatch(getMyFeedListRequest());

    // await sleep(2000);
    // dispatch(getMyFeedListSuccess([{
    //     id:'ID_01',
    //     content:'CONTENT_01',
    //     writer:{uid:'A',name:''},
    //     likeCount:10,
    //     imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     createdAt:new Date().getTime()
    // },{
    //     id:'ID_02',
    //     content:'CONTENT_02',
    //     writer:{uid:'A',name:''},
    //     likeCount:10,
    //     imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     createdAt:new Date().getTime()
    // },{
    //     id:'ID_03',
    //     content:'CONTENT_03',
    //     writer:{uid:'A',name:''},
    //     likeCount:10,
    //     imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     createdAt:new Date().getTime()
    // }]
    // ))

    const lastFeedList = await  database().ref(`/feed`).once('value').then((snapshot)=> snapshot.val())
    
    const currentUserId = getState().userInfo.userInfo?.uid??''

    console.log(currentUserId);

    console.log('al', lastFeedList)
    const result = Object.keys(lastFeedList).map((key)=>{
        return {
            ...lastFeedList[key],
            id:key,
        }
    }).filter((item)=> item.writer.uid === currentUserId)
    console.log(result);

    dispatch(getMyFeedListSuccess(result));

}



export type UserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, UserInfoActions>;
export type TypeUserDispatch = ThunkDispatch<RootReducer, undefined, UserInfoActions>;
export type UserInfoActions =
    | ReturnType<typeof setUserInfo> 
    | ReturnType<typeof getMyFeedListRequest> 
    | ReturnType<typeof getMyFeedListSuccess>
    | ReturnType<typeof getMyFeedListFailure>;