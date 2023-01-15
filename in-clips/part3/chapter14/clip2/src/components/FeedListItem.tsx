import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button } from './Button';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

export const FeedListItem:React.FC<{image:string, likeCount:number, writer:string, comment:string, onPressFeed:()=>void}> = (props)=>{
    const {width} = useWindowDimensions();

    return (
        <Button onPress={props.onPressFeed}>
            <View>
                <RemoteImage url={props.image} width={width} height={width}/>

                <View style={{paddingHorizontal:12,paddingVertical:12,}}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Icon name='heart-outline' size={20} color='black'/>
                        <Spacer space={4} horizontal/>
                    </View>
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
        </Button>
    )
}