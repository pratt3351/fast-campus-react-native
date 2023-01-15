import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { Provider } from 'react-redux';
import { store } from './src/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-gesture-handler';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

GoogleSignin.configure();

mobileAds().initialize().then((result)=>{
  console.log(result);

})


export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>

        <RootApp/>

        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER}/>

      </Provider>
    </SafeAreaProvider>
  );
}
