import { getStringAsync } from "expo-clipboard"

export const getClipboardString = ()=>{
    return getStringAsync();
}