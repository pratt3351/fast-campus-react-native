import AsyncStorage from '@react-native-async-storage/async-storage'
export const getItem = (key)=>{
    return AsyncStorage.getItem(key);
}

export const setItem = (key, value)=>{
    return AsyncStorage.setItem(key, value);
}