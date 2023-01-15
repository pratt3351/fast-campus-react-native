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
      <Header.Title title={text('Header Title', 'TITLE')} />
    </Header>
  ))
  .add('with icon', () => (
    <Header>
      <Header.Title title={text('Header Title', 'TITLE')} />
      <Header.Icon onPress={() => {}} iconName="close" />
    </Header>
  ))
  .add('with back icon', () => (
    <Header>
      <Header.Group>
        <Header.Icon onPress={() => {}} iconName="arrow-back" />

        <Header.Title title={text('Header Title', 'TITLE')} />
      </Header.Group>
    </Header>
  ));
