import { CREATE_NEW_NUMBERS } from "../actions/lottoNumbers"

const defaultState = {
    currentNumber:[],
    history:[]
}


export const lottoNumberReducers = (state = defaultState, action)=>{
    if(action.type === CREATE_NEW_NUMBERS){

        return {
            ...state,
            currentNumber: action.numbers,
            history: state.history.concat([
                {
                    date:new Date(),
                    numbers:action.numbers
                }
            ])
        }
    }
    return {
        ...state,
    }
}