import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { GET_MY_FEED_LIST_SUCCESS, SET_USER_INFO, UserInfoActions } from "../actions/user"

export type typeUserInfoReducer = {
    userInfo:UserInfo | null;
    myFeedList:FeedInfo[]
}
const defaultUserInfoState:typeUserInfoReducer = {
    userInfo: null,
    myFeedList:[]
}
//{uid:string, name:string, profileImage:string}
export const userInfoReducer = (state:typeUserInfoReducer = defaultUserInfoState, action: UserInfoActions)=>{
    switch(action.type){
        case SET_USER_INFO:{
            return {
                ...state,
                userInfo: action.userInfo
            }
        }

        case GET_MY_FEED_LIST_SUCCESS:{
            return {
                ...state,
                myFeedList: action.list
            }
        }
    }
    return {
        ...state,
    }
}