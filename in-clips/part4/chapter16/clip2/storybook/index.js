// if you use expo remove this line
import {AppRegistry, Platform} from 'react-native';

import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import {loadStories} from './storyLoader';
import './rn-addons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  // require('./stories');
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('@react-native-community/async-storage').default,
  host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
});

const StorybookUI = () => {
  return (
    <SafeAreaProvider>
      <StorybookUIRoot />
    </SafeAreaProvider>
  );
};

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('LoveDog', () => StorybookUI);

export default StorybookUI;
