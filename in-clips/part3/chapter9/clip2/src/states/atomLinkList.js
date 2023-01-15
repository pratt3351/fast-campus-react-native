import { atom } from "recoil";
import { getItem, setItem, removeItem } from "../utils/AsyncStorageUtils";


const asyncStorageEffect = key => async ({setSelf, onSet}) => {
    const savedValue = await getItem(key)
    console.log(savedValue);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
        console.log('onSet newValue', newValue, key)
      isReset
        ? removeItem(key)
        : setItem(key, JSON.stringify(newValue));
    });
  };

export const atomLinkList = atom({
    key:'MAIN/LINK_LIST',
    default:{
        list:[],
    },
    effects:[asyncStorageEffect('MAIN/LINK_LIST')]
})