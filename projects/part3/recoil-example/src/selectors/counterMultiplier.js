import { selector } from "recoil";
import { counterState } from "../states/counter";

export const counterMultiplier = selector({
    key:'MAIN/CounterMultiplier',
    get:({get})=>{
        const result = get(counterState);

        return result * 5;
    }
})