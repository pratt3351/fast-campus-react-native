import { FeedInfo } from "../@types/FeedInfo"
import { CREATE_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, FeedListActions, GET_FEED_LIST_SUCCESS } from "../actions/feed"

export type TypeFeedListReducer ={
    list:FeedInfo[]
}
const defaultFeedListState:TypeFeedListReducer = {
    list:[]
}

export const feedListReducer = (state:TypeFeedListReducer = defaultFeedListState, action:FeedListActions)=>{

    switch(action.type){
        case GET_FEED_LIST_SUCCESS:{
            return {
                ...state,
                list:action.list,
            }
        }

        case CREATE_FEED_SUCCESS:{
            return {
                ...state,
                list: state.list.concat([action.item]).reverse()
            }
        }

        case FAVORITE_FEED_SUCCESS:{
            return {
                ...state,
                list:state.list.map((item)=>{
                    if(item.id === action.feedId){
                        return {
                            ...item,
                            likeCount:item.likeCount+1
                        }
                    }

                    return {
                        ...item
                    }
                })
            }
        }
    }

    return {
        ...state,
    }
}