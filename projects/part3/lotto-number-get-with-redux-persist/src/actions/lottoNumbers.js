export const CREATE_NEW_NUMBERS = 'CREATE_NEW_NUMBERS'
import { getRandomSixNumber } from "../utils/Utils";
export const createNewNumbers = ()=>{
    const numbers = getRandomSixNumber();

    return {
        type:CREATE_NEW_NUMBERS,
        numbers,
    }
}