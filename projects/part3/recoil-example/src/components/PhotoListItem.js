import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useWindowDimensions, View, Animated } from 'react-native';
import { Button } from './Button'
import {RemoteImage} from './RemoteImage';

export const PhotoListItem = (props)=>{
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    const [animValue] = useState(new Animated.Value(0));


    const onPressItem = useCallback(()=>{
        navigation.navigate('ImageDetail', {url:props.url})
    }, [])

    const onPressIn = useCallback(()=>{
        console.log('onPressIN')
        Animated.timing(animValue,{
            duration:200,
            toValue:1
        }).start();

    }, [])

    const onPressOut = useCallback(()=>{
        console.log('onPressOut');
        Animated.timing(animValue,{
            duration:200,
            toValue:0
        }).start();

    }, [])

    const scale = animValue.interpolate({
        inputRange:[0, 1],
        outputRange:[1.0, 0.95]
    })


    return (
        <Button 
            onPress={onPressItem} 
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            paddingHorizontal={20} 
            paddingVertical={10} >
            <Animated.View style={{transform:[{scale:scale}]}}>
                <RemoteImage
                    url={props.url}
                    width={(width-40)} 
                    height={width * 1.2} />
            </Animated.View>
        </Button>
    )
}