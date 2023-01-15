import {OpenGraphParser} from 'react-native-opengraph-kit';

export const getOpenGraphData = async (url)=>{
    const result = await OpenGraphParser.extractMeta(url)

    return result[0] || null;
}