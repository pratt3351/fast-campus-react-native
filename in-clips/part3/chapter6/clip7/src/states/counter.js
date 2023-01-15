import {atom} from 'recoil';

export const counterState = atom({
    key:'MAIN/COUNTER',
    default:0,
})