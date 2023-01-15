import axios from 'axios';
import {useCallback, useState} from 'react';
import {TypeListItem} from './TypeListItem';

const API_KEY = 'AIzaSyCSp6ipVaiXie97Mi__ej0VbVZkfZn9GQ0';

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export const useYotubeData = () => {
  const [data, setData] = useState<TypeListItem[]>([]);

  const loadData = useCallback(async () => {
    try {
      const videoResults = await axiosInstance.get<{
        kind: 'youtube#videoListResponse';
        etag: string;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
        items: {
          kind: 'youtube#video';
          etag: string;
          id: string;
          snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
              [key: string]: {
                url: string;
                width: number;
                height: number;
              };
            };
            channelTitle: string;
            tags: [string];
            categoryId: string;
          };
          contentDetails: {
            duration: string;
            dimension: string;
            definition: string;
            caption: string;
            licensedContent: boolean;
            regionRestriction: {
              allowed: [string];
              blocked: [string];
            };
            contentRating: {
              mpaaRating: string;
              tvpgRating: string;
              bbfcRating: string;
              chvrsRating: string;
              eirinRating: string;
              cbfcRating: string;
              fmocRating: string;
              icaaRating: string;
              acbRating: string;
              oflcRating: string;
              fskRating: string;
              kmrbRating: string;
              djctqRating: string;
              russiaRating: string;
              rtcRating: string;
              ytRating: string;
            };
          };
          statistics: {
            viewCount: number;
            likeCount: number;
            dislikeCount: number;
            favoriteCount: number;
            commentCount: number;
          };
        }[];
      }>('/videos', {
        params: {
          key: API_KEY,
          part: 'snippet,contentDetails, statistics',
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      });

      console.log(videoResults);

      const videoData = videoResults.data;

      setData(
        videoData.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          profile: '',
          publishedAt: item.snippet.publishedAt,
          viewCount: item.statistics.viewCount,
          channelTitle: item.snippet.channelTitle,
        })),
      );
    } catch (ex) {}
  }, []);

  return {data, loadData};
};
