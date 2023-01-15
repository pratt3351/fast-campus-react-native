import { useCallback } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateDiaryList } from "../states/stateDiaryList";
import { stateUserInfo } from "../states/stateUserInfo";
import database from '@react-native-firebase/database';

export const useGetDiaryList = ()=>{
    const setDiaryList = useSetRecoilState(stateDiaryList);

    return useCallback(async (userInfo)=>{
        const userDiaryDB = database().ref(`diary/${userInfo.uid}`)
        const diaryListResult = await userDiaryDB.once('value').then((snapshot)=>{
            console.log(snapshot)
            return snapshot.val();
        })

        console.log('diaryListResult', diaryListResult);

        const list = Object.keys(diaryListResult).map((key)=>{
            const diaryItem = diaryListResult[key];

            return diaryItem;
        });

        setDiaryList(list);
        
    }, [])
}