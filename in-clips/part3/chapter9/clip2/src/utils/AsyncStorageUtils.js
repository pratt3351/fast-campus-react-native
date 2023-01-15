import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async(key)=>{

    return await AsyncStorage.getItem(key) 
}

export const setItem = async(key, value) => {
    return await AsyncStorage.setItem(key, value);
}

export const remoteItem = async(key)=>{
    return await AsyncStorage.remoteItem(key);
}