import {useSelector} from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { RootReducer } from '../store';

export const useTotalFeedList = ()=> 
    useSelector<RootReducer, FeedInfo[]>((state)=> state.feedList.list)