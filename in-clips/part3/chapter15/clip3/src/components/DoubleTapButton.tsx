import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
``
export const DoubleTapButton:React.FC<{
    onPressDoubleTap:()=>void;
    children:ReactElement
}> = (props)=>{
    return (
        <TapGestureHandler
            numberOfTaps={2}
            onHandlerStateChange={({nativeEvent})=>{
                console.log(nativeEvent);
                if(nativeEvent.state === State.ACTIVE){
                    props.onPressDoubleTap();   
                }
            }}
        >
            <View>
                {props.children}
            </View>
        </TapGestureHandler>
    )
}