import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {Header} from '../../../src/components/Header/Header';
import CenterView from '../CenterView';

storiesOf('Header', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('only title', () => (
    <Header>
      <Header.Title title={text('HeaderTitle', 'TITLE')}></Header.Title>
    </Header>
  ))
  .add('with right icon', () => (
    <Header>
      <Header.Title title={text('HeaderTitle', 'TITLE')}></Header.Title>
      <Header.Icon onPress={() => {}} iconName="close" />
    </Header>
  ));
