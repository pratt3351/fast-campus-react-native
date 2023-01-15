import {useSelector} from 'react-redux'
import { FeedInfo } from '../@types/FeedInfo'
import { UserInfo } from '../@types/UserInfo'
import { RootReducer } from '../store'

export const useMyInfo = ()=> useSelector<RootReducer, UserInfo | null> ((state)=>{
    return state.userInfo.userInfo
})

export const useMyFeedList = ()=> useSelector<RootReducer, FeedInfo[]> ((state)=>{
    return state.userInfo.myFeedList
})