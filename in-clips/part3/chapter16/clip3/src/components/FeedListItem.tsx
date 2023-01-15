import React, { useCallback, useRef } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import { Button } from './Button';
import { DoubleTapButton } from './DoubleTapButton';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

export const FeedListItem:React.FC<{
    image:string, 
    likeCount:number, 
    isLiked:boolean;
    writer:string, 
    comment:string, 
    onPressFeed:()=>void; 
    onPressFavorite:()=>void}> = (props)=>{
    const scaleValue = useRef(new Animated.Value(0)).current;
    const alphaValue = useRef(new Animated.Value(0)).current;

    const {width} = useWindowDimensions();

    const onPressDoubleTap = useCallback(()=>{
        props.onPressFavorite();
        
        
        if(props.isLiked) return;
        scaleValue.setValue(0);
        alphaValue.setValue(1);
        Animated.timing(scaleValue, {
            toValue:2,
            duration:500,
            useNativeDriver:false,
        }).start(()=>{
            setTimeout(() => {
                alphaValue.setValue(0);
                
            }, 1000);
        });
        
    }, [scaleValue, alphaValue, props.isLiked])

    return (
        <View>
            <DoubleTapButton onPressDoubleTap={onPressDoubleTap}>
                <View style={{width:width, height:width}}>
                    <RemoteImage url={props.image} width={width} height={width}/>

                    <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems:'center', justifyContent:'center'}}>
                        <Animated.View style={{transform:[{scale:scaleValue}], opacity:alphaValue}}>
                            <Icon name={'heart'} size={64} color={'white'}/>

                        </Animated.View>
                    </View>
                </View>
            </DoubleTapButton>

            <View style={{paddingHorizontal:12,paddingVertical:12,}}>
                <Button onPress={props.onPressFavorite}>
                        <View style={{flexDirection:'row', alignItems:'center',}}>
                            <Icon name={props.isLiked ? 'heart':'heart-outline'} size={20} color={props.isLiked ? 'red':'black'}/>
                            <Spacer space={4} horizontal/>
                        </View>
                </Button>
            </View>
            <View style={{paddingHorizontal:12 }}>
                <Typography fontSize={16} color='black'>좋아요 {props.likeCount}개</Typography>
                <Spacer space={4}/>
                <View style={{flexDirection:'row', alignItems:'center',}}>
                    <Typography fontSize={12}>{props.writer}</Typography>
                    <Spacer space={8} horizontal/>
                    <Typography fontSize={16}>{props.comment}</Typography>
                </View>
            </View>
        </View>
    )
}