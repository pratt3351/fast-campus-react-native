import { FeedInfo } from "../@types/FeedInfo"
import { UserInfo } from "../@types/UserInfo"
import { GET_MY_FEED_SUCCESS, SET_USER_INFO, TypeUserInfoActions } from "../actions/user"

export type TypeUserInfoReducer = {
    userInfo:UserInfo | null,
    myFeedList:FeedInfo[]   
}
const defaultUserInfoReducer:TypeUserInfoReducer = {
    // list:[]
    userInfo:null,
    myFeedList:[],
}

export const userInfoReducer = (state:TypeUserInfoReducer=defaultUserInfoReducer, action:TypeUserInfoActions)=>{
    switch(action.type){
        case SET_USER_INFO:{
            return {
                ...state,
                userInfo:action.user
            }
        }

        case GET_MY_FEED_SUCCESS:{
            return {
                ...state,
                myFeedList:action.list
            }
        }

    }
    return {
        ...state
    }
}