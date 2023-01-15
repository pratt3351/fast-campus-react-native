const defaultFeedListState = {
    list:[]
}

export const feedListReducer = (state = defaultFeedListState, action:any)=>{

    return {
        ...state,
    }
}