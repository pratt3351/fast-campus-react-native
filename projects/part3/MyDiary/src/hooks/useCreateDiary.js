import { useCallback } from "react"
import database from '@react-native-firebase/database';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateUserInfo } from "../states/stateUserInfo";
import { stateDiaryList } from "../states/stateDiaryList";

export const useCreateDiary = ()=>{
    const userInfo = useRecoilValue(stateUserInfo);
    const setDiaryList = useSetRecoilState(stateDiaryList);


    return useCallback( async(photoUrl, date, title, content)=>{
        if(date === null) return;

        if(content ==='') return;

        if( title === '') return;

        const now  = new Date().toISOString().at
        const userDiaryDB = database().ref(`diary/${userInfo.uid}`).push();
        const saveItem ={
            photoUrl,
            title,
            content,
            date:date.toISOString(),
            createdAt:now,
            updatedAt:now
        }

        await userDiaryDB.set(saveItem);

        setDiaryList((prevList)=>{
            return prevList.concat([
                saveItem
            ])
        })
    }, [])
}